import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext'
import { Button, Drawer, IconButton } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
/* import { setGlobalUser, IAvailability, IUser, parseDaysToWeek } from "../utils/algorithm"; */
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Appointments, AppointmentTooltip, DayView, Scheduler, WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import Appointment from "../components/Appointment";

const taskExampleData = [{startDate: '2021-06-16T09:45', endDate: '2021-06-16T11:45', title: 'Holiwi we'}]

const Dashboard:FC = () => {

    const [ openMenu, setOpenMenu ] = useState<boolean>(false);
    const { currentUser } = useAuth()!;
    const [ name, setName ] = useState<string>('');
    const [ tasks, setTasks ] = useState();
    const { logout } = useAuth()!;
    const history = useHistory();
    const [ currentDate, setCurrentDate ] = useState(new Date());

    useEffect(() => {
        db.collection('users').doc(currentUser.uid).get()
        .then(data => {
            if(!(data.data()!.profile)) return history.push('/signup');
            /* const myUser:IUser = {
                name: data.data()!.name as string,
                lunch: data.data()!.lunch as number,
                uid: data.data()!.uid as string,
                email: data.data()!.email as string,
                workday: data.data()!.workday as Array<number>,
                profile: data.data()!.profile as number,
                satisfaction: data.data()!.satisfaction as number,
                nap: data.data()!.nap as number,
                tasks: data.data()!.tasks
            }

            parseDaysToWeek([data.data()!.day1, data.data()!.day2, data.data()!.day3, data.data()!.day4, data.data()!.day5, data.data()!.day6, data.data()!.day0] as Array<Array<IAvailability>>, myUser)
            setGlobalUser(myUser); */
            setName(data.data()!.name as string);
            setTasks(data.data()!.tasks);
        });
    }, [])
    

    function handleLogOut() {
        logout()
        .then(() => {
            history.push('/login');
        })
    }

    console.log('Se está renderizando');

    return (
    <React.Fragment>
        <header className="nav">
            <IconButton color="primary" style={{fontSize: "2.8rem"}} onClick={() => setOpenMenu(true)}>
                <MenuIcon color="primary" fontSize="inherit"/>
            </IconButton>
        </header>

        <main>
            <h1>Hola {name.split(' ')[0]}</h1>
            <Scheduler data={taskExampleData} firstDayOfWeek={1}>
                <ViewState currentDate={currentDate}/>
                <WeekView startDayHour={5} endDayHour={24} cellDuration={60}/>
                <Appointments appointmentComponent={Appointment}/>
                <AppointmentTooltip />
            </Scheduler>
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