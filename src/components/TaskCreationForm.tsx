import DateFnsUtils from "@date-io/date-fns";
import es from "date-fns/esm/locale/es";
import { Input, Dialog, DialogTitle, IconButton, DialogContent, DialogActions, Button, ButtonGroup, TextField, Checkbox, Snackbar } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EditIcon from '@material-ui/icons/Edit';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FC, useState } from "react";
import { uuid } from 'uuidv4';
import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/firebase";
import React from "react";

interface ITaskCreationForm {
    open: boolean,
    setOpen: (value:boolean) => void,
    tasks: any,
    setTasks: (value:any) => void,
    userData: any,
}

enum Difficulty {Easy, Medium, Hard};

const TaskCreationForm:FC<ITaskCreationForm> = ({open, setOpen, tasks, setTasks, userData }) => {

    const [ taskName, setTaskName ] = useState<string>('');
    const [ taskDifficulty, setTaskDifficulty ] = useState<number>(-1);
    const [ deadline, setDeadline ] = useState<Date>(new Date());
    const [ length, setLength ] = useState<number>(1);
    const [ error, setError ] = useState<string>('');
    const [ weekend, setWeekend ] = useState<boolean>(false);
    const [ manual, setManual ] = useState<boolean>(false);
    const [ assignation, setAssignation ] = useState<Date>(new Date());
    const { currentUser } = useAuth()!;

    function handleAddLength() {
        if(length === 6) {
            return ;
        }
        setLength(prev => prev + 1);
    }

    function handleSubstractLength() {
        if(length === 1) {
            return ;
        }
        setLength(prev => prev - 1);
    }

    function handleClose() {
        setManual(false);
        setOpen(false);
    }

    function handleDeadlineChange(value:any) {
        if(value <= new Date()) {
            return setError('Escoge una fecha próxima');
        } 

        setDeadline(value);
    } 

    function handleCloseError() {
        setError('');
    }

    function handleTaskCreation() {

        if(!checkValidity()) return;

        const id = uuid()
        const newTask = {
            id,
            name: taskName,
            difficulty: taskDifficulty,
            duration: length,
            assigned: 0,
            manual: false,
            deadline: {seconds: deadline.getTime()/1000},
            weekend: weekend,
            schedule: []
        }

        switch(taskDifficulty) {
            case Difficulty.Easy:
                newTask.difficulty = 1;
                break;

            case Difficulty.Medium:
                newTask.difficulty = 3;
                break;

            case Difficulty.Hard:
                newTask.difficulty = 5;;
                break;
        }
        
        db.collection('users').doc(currentUser.uid).collection('tasks').doc(id).set(newTask)
        .then(() => {
            resetValues();
            const copy = [...tasks, newTask];
            setTasks(copy);
            console.log("Tarea creada")
            setOpen(false);
        });
    }

    function handleManualAssignment() {
        if(!checkValidity()) return;

        setManual(true);
    }

    function toggleWeekend() {
        setWeekend(prev => !prev);
    }

    function checkValidity() {
        if(!taskName) {
            setError('Ponle un nombre para identificar a tu tarea');
            return false;
        }

        if(taskDifficulty === -1) {
            setError('Asignale un nivel de dificultad a tu tarea para continuar');
            return false;
        }

        if(deadline <= new Date()) {
            setError('Elige una fecha posterior para tu tarea');
            return false;
        }
        return true;
    }

    function handleAssignTime(value:any) {
        setAssignation(value);
    }

    function resetValues() {
        setTaskName('');
        setTaskDifficulty(-1);
        setDeadline(new Date());
        setLength(1);
        setWeekend(false);
        setError('');
        setAssignation(new Date());
        setManual(false);
    }

    function handleConfirmAssigments() {
        if(!checkValidity()) {
            return ;
        }

        if(assignation < new Date()){ 
            return setError('No puedes viajar al pasado... Escoge una fecha que no haya ocurrido :)');
        }

        const id = uuid()
        const newTask = {
            id,
            name: taskName,
            difficulty: taskDifficulty,
            duration: length,
            assigned: length,
            deadline: {seconds: deadline.getTime()/1000},
            weekend: weekend,
            manual: true,
            schedule: [{
                day: assignation.getTime(),
                start: assignation.getHours(),
                end: assignation.getHours() + length
            }]
        }

        console.log(newTask);
        switch(taskDifficulty) {
            case Difficulty.Easy:
                newTask.difficulty = 1;
                break;

            case Difficulty.Medium:
                newTask.difficulty = 3;
                break;

            case Difficulty.Hard:
                newTask.difficulty = 5;;
                break;
        }

        
        db.collection('users').doc(currentUser.uid).collection('tasks').doc(id).set(newTask)
        .then(() => {
            resetValues();
            const copy = [...tasks, newTask];
            setTasks(copy);
            console.log("Tarea creada")
            setOpen(false);
        });
    }

    return (
        <Dialog open={open} classes={{paper: 'taskCreation'}} scroll="paper">
            <DialogTitle disableTypography={true} classes={{root: 'taskCreation__banner'}}>
                <IconButton onClick={handleClose} className="taskCreation__close" aria-label="Cerrar">
                    <CloseIcon />
                </IconButton>

                <Input type="text" placeholder="Nombre de la tarea" disableUnderline={true} style={{width: '100%'}} endAdornment={<EditIcon style={{color: '#FFFFFF'}}/>}
                    classes={{input: "taskCreation__title"}} value={taskName} onChange={(e) => setTaskName(e.target.value)}
                />
            </DialogTitle>

            <DialogContent classes={{root: 'taskCreation__content'}}>

                {!manual && <React.Fragment>
                    <div className="flex-center" style={{alignItems: 'center'}}>
                        <SignalCellularAltIcon color="primary"/>
                        <h3 className="taskCreation__label">Nivel de dificultad</h3>
                    </div>

                    <ButtonGroup className="btn btn--group taskCreation__difficulty">
                        <Button className={(taskDifficulty === Difficulty.Easy) ? "btn__grouped btn__grouped--active" : "btn__grouped"} onClick={() => setTaskDifficulty(Difficulty.Easy)}>
                            Fácil
                        </Button>
                        <Button className={(taskDifficulty === Difficulty.Medium) ? "btn__grouped btn__grouped--active" : "btn__grouped"} onClick={() => setTaskDifficulty(Difficulty.Medium)}>
                            Medio
                        </Button>
                        <Button className={(taskDifficulty === Difficulty.Hard) ? "btn__grouped btn__grouped--active" : "btn__grouped"} onClick={() => setTaskDifficulty(Difficulty.Hard)}>
                            Difícil
                        </Button>
                    </ButtonGroup>

                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                        <p className="textfield__label">Fecha límite</p>
                        <KeyboardDatePicker keyboardIcon={<AccessTimeIcon/>} className="textfield textfield--time" value={deadline} onChange={handleDeadlineChange} format="dd/MM/yy"/>
                    </MuiPickersUtilsProvider>

                    <div className="textfield__wrapper">
                        <TextField InputLabelProps={{style: {fontWeight: 600}}} inputProps={{style: {paddingLeft: 'calc(50% - 2.5rem)'}, readOnly: true}} variant="outlined" type="text"  id="taskLength" label="Duración de tarea" className="textfield textfield--number" value={length === 1 ? `${length} hora` : `${length} horas`}/>
                        <IconButton onClick={handleSubstractLength} className="textfield__numberBtn textfield__less" aria-label="Menos">
                            <RemoveIcon />
                        </IconButton>

                        <IconButton onClick={handleAddLength} className="textfield__numberBtn textfield__more" aria-label="Más">
                            <AddIcon />
                        </IconButton>
                    </div>

                    <div className="flex-center" style={{justifyContent: 'space-between'}}>
                        <label style={{fontSize: '1.4rem'}} htmlFor="weekend" className="checkbox__label">¿Asignable a sábado?</label>
                        <Checkbox style={{padding: 0}} className="checkbox" id="weekend" onChange={toggleWeekend} value={weekend}/>
                    </div>
                </React.Fragment>}

                {manual && <React.Fragment>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                        <p style={{marginTop: 0}} className="textfield__label">Fecha asignada</p>
                        <KeyboardDatePicker keyboardIcon={<AccessTimeIcon/>} className="textfield textfield--time" value={assignation} onChange={handleAssignTime} format="dd/MM/yy"/>

                        <p style={{marginTop: 0}} className="textfield__label">Hora de asignación</p>
                        <KeyboardTimePicker keyboardIcon={<AccessTimeIcon/>} className="textfield textfield--time" value={assignation} onChange={handleAssignTime}/>
                    </MuiPickersUtilsProvider>
                </React.Fragment>}
                

                <Snackbar open={error ? true: false} autoHideDuration={5000} onClose={handleCloseError}>
                    <Alert onClose={handleCloseError} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </DialogContent>

            <DialogActions style={{justifyContent: 'center', flexWrap: 'wrap', gap: '1rem'}}>
                <Button className="btn btn--secondary" onClick={manual ? handleConfirmAssigments : handleTaskCreation}>
                    {manual ? 'Confirmar' : 'Crear tarea'}
                </Button>

                <Button className="btn btn--primary" onClick={manual ? () => setManual(false) : handleManualAssignment} style={{marginLeft: 0}}>
                    {manual ? 'Atrás' : 'Asignar manualmente'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TaskCreationForm;