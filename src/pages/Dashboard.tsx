import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext'
import { Button, Drawer, IconButton } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from '@material-ui/icons/Add';
/* import { setGlobalUser, IAvailability, IUser, parseDaysToWeek } from "../utils/algorithm"; */
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Appointments, AppointmentTooltip, DayView, Scheduler, WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import Appointment from "../components/Appointment";
import { AppointmentTooltipContent, AppointmentTooltipHeader } from "../components/AppointmentTooltip";
import TaskCreationForm from "../components/TaskCreationForm";

const Dashboard:FC = () => {

    const [ openMenu, setOpenMenu ] = useState<boolean>(false);
    const { currentUser } = useAuth()!;
    const [ name, setName ] = useState<string>('');
    const [ tasks, setTasks ] = useState<any[]>([]);
    const [ openTaskCreation, setOpenTaskCreation ] = useState<boolean>(false);
    const [ taskCreated, setTaskCreated ] = useState<boolean>(true);
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
            const manualTasks:any[] = [];
            db.collection('users').doc(currentUser.uid).collection('tasks').get()
            .then(query => {
                query.forEach(task => {
                    console.log(new Date(task.data().schedule[0].day))
                    if(task.data().manual) {
                        const taskData = task.data();
                        const formatedTask = {
                            title: taskData.name,
                            startDate: new Date(taskData.schedule[0].day).setHours(taskData.schedule[0].start),
                            endDate: new Date(taskData.schedule[0].day).setHours(taskData.schedule[0].end),
                            color: taskData.difficulty === 0 ? '#67C6DA' : taskData.difficulty === 1 ? '#9A6DAD' : '#F9805B',
                        }
                        console.log(formatedTask)
                        manualTasks.push(formatedTask);
                    }
                });

                setTasks(manualTasks);
            })
        });
    }, [taskCreated])
    

    function handleLogOut() {
        logout()
        .then(() => {
            history.push('/login');
        })
    }

    function handleOpenTaskCreation() {
        setOpenTaskCreation(true);
    }

    return (
    <React.Fragment>
        <header className="nav">
            <IconButton color="primary" style={{fontSize: "2.8rem"}} onClick={() => setOpenMenu(true)}>
                <MenuIcon color="primary" fontSize="inherit"/>
            </IconButton>

            <p>Hola {name.split(' ')[0]}</p>
        </header>

        <main>
            <Scheduler data={tasks} firstDayOfWeek={1} locale="es">
                <ViewState currentDate={currentDate}/>
                <DayView startDayHour={4} endDayHour={24} cellDuration={60}/>
                <Appointments appointmentComponent={Appointment}/>
                <AppointmentTooltip headerComponent={AppointmentTooltipHeader} contentComponent={AppointmentTooltipContent}/>
            </Scheduler>

            <Button variant="contained" color="primary" style={{fontSize: "2.8rem"}} className="btn btn--primary btn--rounded btn--addTask" 
                onClick={handleOpenTaskCreation}
            >
                <AddIcon style={{fontSize: '2.8rem', verticalAlign: 'middle', marginLeft: '-0.1rem'}}/>
            </Button>

            <TaskCreationForm open={openTaskCreation} setOpen={setOpenTaskCreation} taskCreated={taskCreated} setTaskCreated={setTaskCreated}/>
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