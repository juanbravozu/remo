import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { useRef } from "react";
import { FC } from "react";
import { useAuth } from "../contexts/AuthContext";
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
            <div className="tooltip__header">

            </div>
        </AppointmentTooltip.Header>
    )
}

const AppointmentTooltipContent:FC<any> = ({ children, style, appointmentData, ...restProps}) => {

    return (
        <AppointmentTooltip.Content
            {...restProps}
            appointmentData={appointmentData}
            style={{
                ...style,
            }}
        >
            <div className="tooltip__content">
                <h2>{appointmentData.title}</h2>
            </div>
        </AppointmentTooltip.Content>
    )
}

export { AppointmentTooltipHeader, AppointmentTooltipContent };