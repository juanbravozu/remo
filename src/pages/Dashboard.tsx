import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext'
import { Button, Drawer, IconButton } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from '@material-ui/icons/Add';
import TaskCreationForm from "../components/TaskCreationForm";
import { assignTime } from "../utils/algorithm";
import ScheduleView from "../components/ScheduleView";

const Dashboard:FC = () => {

    const [ openMenu, setOpenMenu ] = useState<boolean>(false);
    const { currentUser } = useAuth()!;
    const [ userData, setUserData ] = useState<any>({});
    const [ name, setName ] = useState<string>('');
    const [ tasks, setTasks ] = useState<any[]>([]);
    const [ displayTasks, setdisplayTasks ] = useState<any[]>([]);
    const [ openTaskCreation, setOpenTaskCreation ] = useState<boolean>(false);
    const { logout } = useAuth()!;
    const history = useHistory();

    useEffect(() => {
        db.collection('users').doc(currentUser.uid).get()
        .then(userData => {
            setUserData(userData.data());
            db.collection('users').doc(currentUser.uid).get()
            .then(data => {
                if(!(data.data()!.profile)) return history.push('/signup');
    
                setName(data.data()!.name as string);
                db.collection('users').doc(currentUser.uid).collection('tasks').get()
                .then(query => {
                    const tasksFromDb:any[] = []
                    query.forEach(task => {
                        tasksFromDb.push(task.data());
                    });
    
                    setTasks(tasksFromDb);
                })
            });
        });

        const now = new Date();
        const timeout = new Date();
        timeout.setHours(21, 44, 0, 0);
    
        console.log(timeout.getTime(), now.getTime(), timeout.getTime() - now.getTime())
        setTimeout(() => console.log('Son las 9:40'), timeout.getTime() - now.getTime());
    }, []);
    
    useEffect(() => {
        const formattedTasks:any[] = [];

        assignTime(tasks, userData.profile, userData);

        tasks.forEach(task => {
            if(task.schedule.length > 0) {
                db.collection('users').doc(currentUser.uid).collection('tasks').doc(task.id).set(task);

                task.schedule.forEach((assignation: any, index: number) => {
                    const formatedTask = {
                        title: task.name,
                        startDate: new Date(task.schedule[index].day).setHours(task.schedule[index].start),
                        endDate: new Date(task.schedule[index].day).setHours(task.schedule[index].end-1, 59, 0, 0),
                        color: task.difficulty === 1 ? '#67C6DA' : task.difficulty === 3 ? '#8D6BD7' : '#FF777B',
                        textColor: task.difficulty === 1 ? '#67C6DA' : task.difficulty === 3 ? '#8D6BD7' : '#FF777B',
                        bgColor: task.difficulty === 1 ? '#F6FDFE' : task.difficulty === 3 ? '#F9F7FD' : '#FFF5F5'
                    }
                    formattedTasks.push(formatedTask);
                });
                
            }
        });       

        setdisplayTasks(formattedTasks);

    }, [tasks]);

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
            <ScheduleView displayTasks={displayTasks} />

            <Button variant="contained" color="primary" style={{fontSize: "2.8rem"}} className="btn btn--primary btn--rounded btn--addTask" 
                onClick={handleOpenTaskCreation}
            >
                <AddIcon style={{fontSize: '2.8rem', verticalAlign: 'middle', marginLeft: '-0.1rem'}}/>
            </Button>

            <TaskCreationForm open={openTaskCreation} setOpen={setOpenTaskCreation} tasks={tasks} setTasks={setTasks}/>
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