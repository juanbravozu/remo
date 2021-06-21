import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { FC } from "react";
import { useAuth } from "../contexts/AuthContext";
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { db } from "../utils/firebase";


const AppointmentTooltipHeader:FC<any> = ({ children, style, appointmentData, ...restProps}) => {

    const {currentUser} = useAuth()!;
    function handleDelete(e:any) {
        const copy = [...appointmentData.tasks];
        const deleteIndex = copy.findIndex((task:any) => {
            if(appointmentData.taskid === task.id) console.log(task)
            return appointmentData.taskid === task.id
        });
        copy.splice(deleteIndex, 1);
        appointmentData.updateRecommendation(copy);
        db.collection('users').doc(currentUser.uid).collection('tasks').doc(appointmentData.taskid).delete();
    }

    return (
        <AppointmentTooltip.Header 
            {...restProps}
            appointmentData={appointmentData}
            style={{
                ...style,
            }}
            showCloseButton
            showDeleteButton
            onDeleteButtonClick={handleDelete}
        >
        </AppointmentTooltip.Header>
    )
}

const AppointmentTooltipContent:FC<any> = ({ children, style, appointmentData, ...restProps}) => {

    const [ displayDate, setDisplayDate ] = useState<string>('');
    const [ deadlineDate, setDeadlineDate ] = useState<string>('');

    useEffect(() => {
        const startingDate = new Date(appointmentData.startDate);
        const day = startingDate.getDay() === 1 ? "Lunes" : startingDate.getDay() === 2 ? "Martes" : startingDate.getDay() === 3 ? "Miercoles" : startingDate.getDay() === 4 ? "Jueves" : startingDate.getDay() === 5 ? "Viernes" : startingDate.getDay() === 6 ? "Sábado" : "Domingo";
        const date = startingDate.getDate();
        let month = "";
        const startHour = `${Math.floor(startingDate.getHours())}:${startingDate.getHours() - Math.floor(startingDate.getHours()) === 0 ? "00" : (startingDate.getHours() - Math.floor(startingDate.getHours())) * 60}`;
        const endHour = `${Math.floor(new Date(appointmentData.endDate).getHours())}:${new Date(appointmentData.endDate).getHours() - Math.floor(new Date(appointmentData.endDate).getHours()) === 0 ? "00" : (new Date(appointmentData.endDate).getHours() - Math.floor(new Date(appointmentData.endDate).getHours())) * 60}`;
    
        switch(startingDate.getMonth()) {
            case 0:
                month = "enero";
                break;
    
            case 1:
                month = "febrero";
                break;
    
            case 2:
                month = "marzo";
                break;
    
            case 3:
                month = "abril";
                break;
    
            case 4:
                month = "mayo";
                break;
    
            case 5:
                month = "junio";
                break;
    
            case 6:
                month = "julio";
                break;
    
            case 7:
                month = "agosto";
                break;
    
            case 8:
                month = "septiembre";
                break;
    
            case 9:
                month = "octubre";
                break;
    
            case 10:
                month = "noviembre";
                break;
    
            case 11:
                month = "diciembre";
                break;
        }

        const limitDate = new Date(appointmentData.deadline.seconds * 1000);
        const deadlineDay = limitDate.getDay() === 1 ? "Lunes" : limitDate.getDay() === 2 ? "Martes" : limitDate.getDay() === 3 ? "Miercoles" : limitDate.getDay() === 4 ? "Jueves" : limitDate.getDay() === 5 ? "Viernes" : limitDate.getDay() === 6 ? "Sábado" : "Domingo";
        let deadlineMonth = ""

        switch(limitDate.getMonth()) {
            case 0:
                deadlineMonth = "enero";
                break;
    
            case 1:
                deadlineMonth = "febrero";
                break;
    
            case 2:
                deadlineMonth = "marzo";
                break;
    
            case 3:
                deadlineMonth = "abril";
                break;
    
            case 4:
                deadlineMonth = "mayo";
                break;
    
            case 5:
                deadlineMonth = "junio";
                break;
    
            case 6:
                deadlineMonth = "julio";
                break;
    
            case 7:
                deadlineMonth = "agosto";
                break;
    
            case 8:
                deadlineMonth = "septiembre";
                break;
    
            case 9:
                deadlineMonth = "octubre";
                break;
    
            case 10:
                deadlineMonth = "noviembre";
                break;
    
            case 11:
                deadlineMonth = "diciembre";
                break;
        }

        setDisplayDate(`${day}, ${date} de ${month} · ${startHour} - ${endHour}`);
        setDeadlineDate(`${deadlineDay}, ${limitDate.getDate()} de ${deadlineMonth}`)
    }, []);
    
    return (
        <AppointmentTooltip.Content
            {...restProps}
            appointmentData={appointmentData}
            style={{
                ...style,
            }}
        >
            <div className="tooltip__content">
                <div className="flex-spbt tooltip__section" >
                    <div className="tooltip__square" style={{backgroundColor: appointmentData.color}}></div>
                    <div>
                        <h2 className="tooltip__title" style={{color: appointmentData.color}}>{appointmentData.title}</h2>
                        <p className="tooltip__date tooltip__text">{displayDate}</p>
                    </div>
                </div>

                <div className="flex-spbt tooltip__section">
                    <SignalCellularAltIcon />

                    <div>
                        <h3 className="tooltip__subtitle">Dificultad</h3>
                        <p className="tooltip__text">{appointmentData.difficulty === 1 ? "Fácil" : appointmentData.difficulty === 3 ? "Media" : "Difícil"}</p>
                    </div>
                </div>

                <div className="flex-spbt tooltip__section">
                    <CalendarTodayIcon />

                    <div>
                        <h3 className="tooltip__subtitle">Fecha de entrega</h3>
                        <p className="tooltip__text">{deadlineDate}</p>
                    </div>
                </div>
            </div>
        </AppointmentTooltip.Content>
    )
}

export { AppointmentTooltipHeader, AppointmentTooltipContent };