import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FC, useState } from "react";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { IRegisterInfo } from "../../pages/SignUp";

interface IWorkdayStep {
    setStage: (value:any) => void;
    setRegisterInfo: Function;
}


const WorkdayStep:FC<IWorkdayStep> = ({ setStage, setRegisterInfo }) => {

    const [ workStart, setWorkStart ] = useState<Date>(new Date());
    const [ workEnd, setWorkEnd ] = useState<Date>(new Date());

    function handleNextStage() {
        const workStartNumber:number = parseFloat(`${workStart.getHours()}.${100*(workStart.getMinutes()/60)}`);
        const workEndNumber:number = parseFloat(`${workEnd.getHours()}.${100*(workEnd.getMinutes()/60)}`);

         setRegisterInfo((prevState:IRegisterInfo) => ({
            ...prevState,
            workday: [workStartNumber, workEndNumber ]
        })); 
        setStage((prevStage:number) => {return prevStage + 1});
    }

    function handleworkStartChange(e:any) {
        setWorkStart(e);
    }

    function handleworkEndChange(e:any) {
        setWorkEnd(e);
    }

    return (
    <div className="formStep">
        <div className="formStep__wrapper">
            <header className="formStep__header">
                <p>Paso 1 de 5</p>
            </header>
            <h1 className="formStep__title">Jornada laboral</h1>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <p className="textfield__label">¿A qué hora comienza tu jornada laboral?</p>
                <KeyboardTimePicker minutesStep={5} keyboardIcon={<AccessTimeIcon/>} className="textfield textfield--time" value={workStart} onChange={handleworkStartChange}/>

                <p className="textfield__label">¿A qué hora termina tu jornada laboral?</p>
                <KeyboardTimePicker minutesStep={5} keyboardIcon={<AccessTimeIcon/>} className="textfield textfield--time" value={workEnd} onChange={handleworkEndChange}/>
            </MuiPickersUtilsProvider>            
            <Button className="btn btn--secondary" onClick={handleNextStage}>Continuar</Button>
        </div>            
    </div>
    )
}

export default WorkdayStep;