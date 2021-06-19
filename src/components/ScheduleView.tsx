import { FC, useState } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Appointments, AppointmentTooltip, DateNavigator, DayView, Scheduler, Toolbar, WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import Appointment from "../components/Appointment";
import { AppointmentTooltipContent, AppointmentTooltipHeader } from "../components/AppointmentTooltip";
import React from "react";
import { Button } from "@material-ui/core";

interface IScheduleView {
    displayTasks: Array<any>
}

const ScheduleView:FC<IScheduleView> = ({ displayTasks }) => {

    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [ viewName, setViewName ] = useState<string>("Day");

    return (

        <React.Fragment>
            <div className="flex-center" style={{gap: '1rem', padding: '1rem', backgroundColor: '#FFFFFF', borderRadius: '8px'}}>
                <Button 
                variant={viewName === 'Day' ? 'contained' : 'text'} 
                onClick={() => setViewName('Day')} 
                className={viewName === 'Day' ? 'btn btn--schedule btn--secondary' : 'btn btn--schedule btn--noBg btn--secondary'}>
                    Día
                </Button>
                <Button 
                variant={viewName === 'Week' ? 'contained' : 'text'} 
                onClick={() => setViewName('Week')}
                className={viewName === 'Week' ? 'btn btn--schedule btn--secondary' : 'btn btn--schedule btn--noBg btn--secondary'}>
                    Semana
                </Button>
            </div>

            <Scheduler data={displayTasks} firstDayOfWeek={1} locale="es">
                <ViewState currentDate={currentDate} currentViewName={viewName} onCurrentDateChange={date => setCurrentDate(date)}/>
                <WeekView startDayHour={4} endDayHour={24} cellDuration={60}/> 
                <DayView startDayHour={4} endDayHour={24} cellDuration={60}/>
                <Toolbar />
                <DateNavigator />
                <Appointments appointmentComponent={Appointment}/>
                <AppointmentTooltip headerComponent={AppointmentTooltipHeader} contentComponent={AppointmentTooltipContent}/>
            </Scheduler>
        </React.Fragment>
        
)
}

export default ScheduleView;