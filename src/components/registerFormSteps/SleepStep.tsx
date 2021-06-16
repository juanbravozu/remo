import { Button, IconButton } from "@material-ui/core";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FC, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { IRegisterInfo } from "../../pages/SignUp";
import { ArrowBack } from "@material-ui/icons";

interface ISleepStep {
    setStage: (value:any) => void;
    setRegisterInfo: Function;
}

const SleepStep:FC<ISleepStep> = ({ setStage, setRegisterInfo }) => {

    const [ sleepTime, setSleepTime ] = useState<Date>(new Date());
    const [ wakeTime, setWakeTime ] = useState<Date>(new Date());

    function handlePreviousStage() {
        setStage((prevStage:number) => {return prevStage - 1})
    }
    
    function handleNextStage() {
        const sleepTimeNumber:number = parseFloat(`${sleepTime.getHours()}.${100*(sleepTime.getMinutes()/60)}`);
        const wakeTimeNumber:number = parseFloat(`${wakeTime.getHours()}.${100*(wakeTime.getMinutes()/60)}`);

         setRegisterInfo((prevState:IRegisterInfo) => ({
            ...prevState,
            bedtime: sleepTimeNumber,
            wakeTime: wakeTimeNumber
        })); 
        setStage((prevStage:number) => {return prevStage + 1});
    }

    function handleSleepTimeChange(e:any) {
        setSleepTime(e);
    }

    function handleWakeTimeChange(e:any) {
        setWakeTime(e);
    }

    return (
    <div className="formStep">
        <div className="formStep__wrapper">
            <header className="formStep__header">
                <IconButton onClick={handlePreviousStage} className="formStep__back">
                    <ArrowBack />
                </IconButton>
                <p>Paso 2 de 5</p>
            </header>
            <h1 className="formStep__title">Hábitos de sueño</h1>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <p className="textfield__label">¿A qué hora sueles dormir?</p>
                <KeyboardTimePicker minutesStep={5} keyboardIcon={<AccessTimeIcon/>} className="textfield textfield--time" value={sleepTime} onChange={handleSleepTimeChange}/>

                <p className="textfield__label">¿A qué hora sueles despertar?</p>
                <KeyboardTimePicker minutesStep={5} keyboardIcon={<AccessTimeIcon/>} className="textfield textfield--time" value={wakeTime} onChange={handleWakeTimeChange}/>
            </MuiPickersUtilsProvider>            
            <Button className="btn btn--secondary" onClick={handleNextStage}>Continuar</Button>
        </div>            
    </div>
    )
}

export default SleepStep;