import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { FC } from "react";


const AppointmentTooltipHeader:FC<any> = ({ children, style, appointmentData, ...restProps}) => {
    
    return (
        <AppointmentTooltip.Header
            {...restProps}
            appointmentData={appointmentData}
            style={{
                ...style,
            }}
        >
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
            {children}
        </AppointmentTooltip.Content>
    )
}

export { AppointmentTooltipHeader, AppointmentTooltipContent };