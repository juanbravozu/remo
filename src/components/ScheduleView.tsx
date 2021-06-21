import { FC, useState } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Appointments, AppointmentTooltip, DateNavigator, DayView, Scheduler, Toolbar, WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import Appointment from "../components/Appointment";
import { AppointmentTooltipContent, AppointmentTooltipHeader } from "../components/AppointmentTooltip";
import React from "react";
import { Button } from "@material-ui/core";
import { useRef } from "react";

interface IScheduleView {
    displayTasks: Array<any>,
    viewName: string,
    currentDate: any,
    setCurrentDate: Function,
    startHour: number,
    endHour: number
}

const ScheduleView:FC<IScheduleView> = ({ displayTasks,viewName, currentDate, setCurrentDate, startHour, endHour }) => {

    return (

        <React.Fragment>
            <Scheduler data={displayTasks} firstDayOfWeek={1} locale="es">
                <ViewState currentDate={currentDate} currentViewName={viewName} onCurrentDateChange={date => setCurrentDate(date)}/>
                <WeekView startDayHour={startHour-2} endDayHour={endHour+2 > 22 ? endHour + 2 : 22} cellDuration={60}/> 
                <DayView startDayHour={startHour-2} endDayHour={endHour+2 > 22 ? endHour + 2 : 22} cellDuration={60}/>
                <Toolbar />
                <DateNavigator />
                <Appointments appointmentComponent={Appointment}/>
                <AppointmentTooltip headerComponent={AppointmentTooltipHeader} contentComponent={AppointmentTooltipContent}/>
            </Scheduler>
        </React.Fragment>
        
)
}

export default ScheduleView;