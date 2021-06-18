import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import React, { FC } from "react";

const Appointment:FC<any> = ({children, style, data, resources, ...props}) => {

    return (
        <Appointments.Appointment 
            {...props} 
            style={{
                ...style,
                backgroundColor: '#FFFFFF',
                borderLeft: `8px solid ${data.color}`,
                width: '96%',
                left: '2%',
                boxShadow: '2px 5px 15px -5px rgb(0 0 0 / 20%)',
                borderRadius: '1rem',
                paddingLeft: '0.5rem'
            }}
            draggable={true}
            data={data}
            resources={resources}
        >
            {children}
        </Appointments.Appointment>
    )
}

export default Appointment;