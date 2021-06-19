import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext'
import { Button, Drawer, IconButton } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from '@material-ui/icons/Add';
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Appointments, AppointmentTooltip, DayView, Scheduler, WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import Appointment from "../components/Appointment";
import { AppointmentTooltipContent, AppointmentTooltipHeader } from "../components/AppointmentTooltip";
import TaskCreationForm from "../components/TaskCreationForm";

const Dashboard:FC = () => {

    const [ openMenu, setOpenMenu ] = useState<boolean>(false);
    const { currentUser } = useAuth()!;
    const [ name, setName ] = useState<string>('');
    const [ tasks, setTasks ] = useState<any[]>([]);
    const [ displayTasks, setdisplayTasks ] = useState<any[]>([]);
    const [ openTaskCreation, setOpenTaskCreation ] = useState<boolean>(false);
    const { logout } = useAuth()!;
    const history = useHistory();
    const [ currentDate, setCurrentDate ] = useState(new Date());

    useEffect(() => {
        db.collection('users').doc(currentUser.uid).get()
        .then(data => {
            if(!(data.data()!.profile)) return history.push('/signup');

            setName(data.data()!.name as string);
            db.collection('users').doc(currentUser.uid).collection('tasks').get()
            .then(query => {
                const tasksFromDb:any[] = []
                query.forEach(task => {
                    tasksFromDb.push(task.data());
                });

                setTasks(tasksFromDb);
            })
        });
    }, []);
    
    useEffect(() => {
        const formattedTasks:any[] = [];

        tasks.forEach(task => {

            if(task.schedule.length > 0) {

                task.schedule.forEach((assignation: any, index: number) => {
                    const formatedTask = {
                        title: task.name,
                        startDate: new Date(task.schedule[index].day).setHours(task.schedule[index].start),
                        endDate: new Date(task.schedule[index].day).setHours(task.schedule[index].end-1, 59, 0, 0),
                        color: task.difficulty === 1 ? '#67C6DA' : task.difficulty === 3 ? '#9A6DAD' : '#F9805B',
                    }
                    formattedTasks.push(formatedTask);
                });
                
            }
            console.log(formattedTasks);
        });       

        setdisplayTasks(formattedTasks);

    }, [tasks]);

    function handleLogOut() {
        logout()
        .then(() => {
            history.push('/login');
        })
    }

    function handleOpenTaskCreation() {
        setOpenTaskCreation(true);
    }

    return (
    <React.Fragment>
        <header className="nav">
            <IconButton color="primary" style={{fontSize: "2.8rem"}} onClick={() => setOpenMenu(true)}>
                <MenuIcon color="primary" fontSize="inherit"/>
            </IconButton>

            <p>Hola {name.split(' ')[0]}</p>
        </header>

        <main>
            <Scheduler data={displayTasks} firstDayOfWeek={1} locale="es">
                <ViewState currentDate={currentDate}/>
                <DayView startDayHour={4} endDayHour={24} cellDuration={60}/>
                <Appointments appointmentComponent={Appointment}/>
                <AppointmentTooltip headerComponent={AppointmentTooltipHeader} contentComponent={AppointmentTooltipContent}/>
            </Scheduler>

            <Button variant="contained" color="primary" style={{fontSize: "2.8rem"}} className="btn btn--primary btn--rounded btn--addTask" 
                onClick={handleOpenTaskCreation}
            >
                <AddIcon style={{fontSize: '2.8rem', verticalAlign: 'middle', marginLeft: '-0.1rem'}}/>
            </Button>

            <TaskCreationForm open={openTaskCreation} setOpen={setOpenTaskCreation} tasks={tasks} setTasks={setTasks}/>
        </main>
        <Drawer PaperProps={{classes: {root: "menu"}}} anchor="left" open={openMenu} onClose={() => setOpenMenu(false)} style={openMenu ? {} : {transition: 'opacity 0.3s ease-out', opacity: 0, pointerEvents: 'none'}}>
            <div>
                <Button variant="text" onClick={handleLogOut} classes={{label: "color-error", root: "btn--iconText"}}>
                    <ExitToApp color="error" className="btn__icon"/>
                    Cerrar Sesión
                </Button>
            </div>
        </Drawer>

        

    </React.Fragment>)
}

export default Dashboard;