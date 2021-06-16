import { Button, IconButton } from "@material-ui/core";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FC, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { ArrowBack } from "@material-ui/icons";
import { IRegisterInfo } from "../../pages/SignUp";

interface ILunchstep {
    setStage: (value:any) => void;
    setRegisterInfo: Function;
}

const LunchStep:FC<ILunchstep> = ({ setStage, setRegisterInfo }) => {

    const [ lunchTime, setLunchTime ] = useState<Date>(new Date());
    const [ napTime, setNapTime ] = useState<Date>(new Date());

    function handlePreviousStage() {
        setStage((prevStage:number) => {return prevStage - 1})
    }

    function handleNextStage() {
        const lunchTimeNumber:number = parseFloat(`${lunchTime.getHours()}.${100*(lunchTime.getMinutes()/60)}`);
        const napTimeNumber:number = parseFloat(`${napTime.getHours()}.${100*(napTime.getMinutes()/60)}`);

         setRegisterInfo((prevState:IRegisterInfo) => ({
            ...prevState,
            lunchtime: lunchTimeNumber,
            naptime: napTimeNumber
        })); 
        setStage((prevStage:number) => {return prevStage + 1});
    }

    function handlelunchTimeChange(e:any) {
        setLunchTime(e);
    }

    function handlenapTimeChange(e:any) {
        setNapTime(e);
    }

    return (
    <div className="formStep">
        <div className="formStep__wrapper">
            <header className="formStep__header">
                <IconButton onClick={handlePreviousStage} className="formStep__back">
                    <ArrowBack />
                </IconButton>
                <p>Paso 3 de 5</p>
            </header>
            <h1 className="formStep__title">Almuerzo</h1>
            <p className="formStep__text">Puede ser difícil escoger una hora de almuerzo, pero intenta elegir aunque sea una aproximación.</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <p className="textfield__label">¿A qué hora sueles almorzar?</p>
                <KeyboardTimePicker minutesStep={5} keyboardIcon={<AccessTimeIcon/>} className="textfield textfield--time" value={lunchTime} onChange={handlelunchTimeChange}/>

                <p className="textfield__label">¿A qué hora retomas el trabajo?</p>
                <KeyboardTimePicker minutesStep={5} keyboardIcon={<AccessTimeIcon/>} className="textfield textfield--time" value={napTime} onChange={handlenapTimeChange}/>
            </MuiPickersUtilsProvider>            
            <Button className="btn btn--secondary" onClick={handleNextStage}>Continuar</Button>
        </div>            
    </div>
    )
}

export default LunchStep;