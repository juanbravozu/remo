import React, { FC, useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import es from "date-fns/esm/locale/es";
import { useHistory, Link } from "react-router-dom";
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext'
import { Button, Drawer, Hidden, IconButton, Paper, Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { ExitToApp } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TaskCreationForm from "../components/TaskCreationForm";
import { assignTime, unassignTasks } from "../utils/algorithm";
import ScheduleView from "../components/ScheduleView";
import profileIcon from '../assets/profile_icon.svg';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Chart, PieSeries } from "@devexpress/dx-react-chart-material-ui";
import PiePoint from "../components/PiePoint";

const Dashboard:FC = () => {

    const [ openMenu, setOpenMenu ] = useState<boolean>(false);
    const { currentUser } = useAuth()!;
    const [ userData, setUserData ] = useState<any>({});
    const [ tasks, setTasks ] = useState<any[]>([]);
    const [ displayTasks, setDisplayTasks ] = useState<any[]>([]);
    const [ displayStats, setDisplayStats ] = useState<any[]>([{difficulty: "easy", value: 0, color: "#67C6DA"}, {difficulty: "medium", value: 0, color: "#8D6BD7"}, {difficulty: "hard", value: 0, color: "#FF777B"}]);
    const [ openTaskCreation, setOpenTaskCreation ] = useState<boolean>(false);
    const [ success, setSuccess ] = useState<string>('');
    const [ viewName, setViewName ] = useState<string>("Day");
    const [ currentDate, setCurrentDate ] = useState(new Date());
    const { logout } = useAuth()!;
    const history = useHistory();

    useEffect(() => {
        db.collection('users').doc(currentUser.uid).get()
        .then(userData => {
            setUserData(userData.data());
            db.collection('users').doc(currentUser.uid).get()
            .then(data => {
                if(!(data.data()!.profile)) return history.push('/inicia-sesion');

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
    }, []);
    
    useEffect(() => { 

        setTasks(state => {
            console.log(state);
            const formattedTasks:any[] = [];
            const easyTasks = {difficulty: "easy", value: 0, color: "#67C6DA"};
            const mediumTasks = {difficulty: "medium", value: 0, color: "#8D6BD7"};
            const hardTasks = {difficulty: "hard", value: 0, color: "#FF777B"};
            const weekStart = new Date();
            weekStart.getDay() === 0 ? weekStart.setDate(weekStart.getDate() - 6) : weekStart.setDate(weekStart.getDate() - weekStart.getDay() - 1);

            state.forEach(task => {
                db.collection('users').doc(currentUser.uid).collection('tasks').doc(task.id).set(task);

                if(task.schedule.length > 0) {

                    task.schedule.forEach((assignation: any, index: number) => {
                        const assignationDate = new Date(assignation.day);

                        if(assignationDate.getDate() > weekStart.getDate() && assignationDate.getDate() < weekStart.getDate() + 7) {
                            switch(task.difficulty) {
                                case 1:
                                    easyTasks.value = easyTasks.value + assignation.end - assignation.start
                                    break;

                                case 3:
                                    mediumTasks.value = mediumTasks.value + assignation.end - assignation.start
                                    break;

                                case 5: 
                                    hardTasks.value = hardTasks.value + assignation.end - assignation.start
                                    break;
                            }
                        }

                        const formatedTask = {
                            title: task.name,
                            startDate: new Date(task.schedule[index].day).setHours(task.schedule[index].start),
                            endDate: new Date(task.schedule[index].day).setHours(task.schedule[index].end-1, 59, 0, 0),
                            deadline: task.deadline,
                            difficulty: task.difficulty,
                            color: task.difficulty === 1 ? '#67C6DA' : task.difficulty === 3 ? '#8D6BD7' : '#FF777B',
                            textColor: task.difficulty === 1 ? '#67C6DA' : task.difficulty === 3 ? '#8D6BD7' : '#FF777B',
                            bgColor: task.difficulty === 1 ? '#F6FDFE' : task.difficulty === 3 ? '#F9F7FD' : '#FFF5F5',
                            taskid: task.id,
                            tasks: tasks,
                            updateRecommendation: updateRecommendation
                        }
                        formattedTasks.push(formatedTask);
                    });
                    
                }
            });       
            setDisplayTasks(formattedTasks);
            setDisplayStats([easyTasks, mediumTasks, hardTasks]);
            return state;
        })
        
            
    }, [tasks]);

    function updateRecommendation(newTasks:any) {
        setTasks(assignTime(unassignTasks(newTasks), userData.profile, userData));
    }

    function handleLogOut() {
        logout()
        .then(() => {
            history.push('/inicia-sesion');
        })
    }

    function handleOpenTaskCreation() {
        setOpenTaskCreation(true);
    }

    function handleDateChange(date:any) {
        setCurrentDate(date);
    }

    return (
    <React.Fragment>
        <header className="nav">
            <IconButton color="primary" style={{fontSize: "2.8rem"}} onClick={() => setOpenMenu(true)}>
                <MenuIcon color="primary" fontSize="inherit"/>
            </IconButton>
        </header>

        <main className="dashboard">

            <div className="dashboard__mainSection">
                <div className="scheduleControls">
                    <div className="flex-center viewSelection">
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

                    <Button variant="contained" color="primary" style={{fontSize: "2.8rem"}} className="btn btn--primary btn--rounded btn--addTask" 
                    onClick={handleOpenTaskCreation}>
                        <AddIcon style={{fontSize: '2.8rem', verticalAlign: 'middle', marginLeft: '-0.1rem'}}/>
                        <p className="btn__text btn__text--addTask">Crear tarea</p>
                    </Button>
                </div>
                
                <ScheduleView displayTasks={displayTasks} viewName={viewName} currentDate={currentDate} setCurrentDate={setCurrentDate} startHour={userData.workday ? userData.workday[0] : 5} endHour={userData.workday ? userData.workday[1] : 21}/>

                <TaskCreationForm open={openTaskCreation} setOpen={setOpenTaskCreation} tasks={tasks} setTasks={updateRecommendation} userData={userData} setSuccess={setSuccess}/>
            </div>
            
            <div className="dashboard__asideSection">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                    <DatePicker
                    autoOk
                    variant="static"
                    openTo="date"
                    value={currentDate}
                    onChange={handleDateChange}
                    className="schedule__picker"
                    />
                </MuiPickersUtilsProvider>

                <Paper elevation={0} className="card">
                    <header className="flex-spbt card__header">
                        <h2 className="card__title">Esta semana</h2>
                    </header>

                    <p className="card__body">Tareas por dificultad</p>

                    <Chart data={displayStats}>
                        <PieSeries pointComponent={PiePoint} valueField="value" argumentField="difficulty" outerRadius={0.8} innerRadius={0.6}/>
                    </Chart>

                    <div className="card__body flex-center">
                        <p>{displayStats[0].value + displayStats[1].value + displayStats[2].value} horas totales</p>
                    </div>

                    <div className="card__body flex-spbt">
                        <p style={{fontWeight: 600, color: "#67C6DA"}}>Dificultad Baja</p>
                        <p>{displayStats[0].value} horas</p>
                    </div>

                    <div className="card__body flex-spbt">
                        <p style={{fontWeight: 600, color: "#8D6BD7"}}>Dificultad Media</p>
                        <p>{displayStats[1].value} horas</p>
                    </div>

                    <div className="card__body flex-spbt">
                        <p style={{fontWeight: 600, color: "#FF777B"}}>Dificultad Alta</p>
                        <p>{displayStats[2].value} horas</p>
                    </div>
                </Paper>
            </div>
        
            <Snackbar open={success ? true : false} autoHideDuration={5000} onClose={() => setSuccess('')}>
                <Alert onClose={() => setSuccess('')} severity="success">
                    {success}
                </Alert>
            </Snackbar>
        </main>

        <Hidden lgUp={true}>
            <Drawer PaperProps={{classes: {root: "menu"}}} anchor="left" open={openMenu} onClose={() => setOpenMenu(false)} style={openMenu ? {} : {transition: 'opacity 0.3s ease-out', opacity: 0, pointerEvents: 'none'}}>            
                <div>
                    <div className="menu__profile">
                        <img src={profileIcon} alt=""/>

                        <div>
                            <h2 className="menu__name">{userData.name}</h2>
                        </div>
                    </div>

                    <hr className="menu__divider"/>

                    <Link to="/" className="menu__link menu__link--active">
                        <DashboardIcon className="menu__itemIcon"/>
                        Mi espacio
                    </Link>

                    {/* <Link to="/estadisticas" className="menu__link">
                        <InsertChartIcon className="menu__itemIcon"/>
                        Estadísticas
                    </Link> */}
                </div>

                <div>
                    <Button variant="text" onClick={handleLogOut} classes={{label: "color-error", root: "btn--iconText"}}>
                        <ExitToApp color="error" className="btn__icon"/>
                        Cerrar Sesión
                    </Button>
                </div>
            </Drawer>
        </Hidden>
        
        <Hidden mdDown={true}>
            <Drawer variant="permanent" PaperProps={{classes: {root: "menu"}}} anchor="left" open={true}>            
                <div>
                    <div className="menu__profile">
                        <img src={profileIcon} alt=""/>

                        <div>
                            <h2 className="menu__name">{userData.name}</h2>
                        </div>
                    </div>

                    <hr className="menu__divider"/>

                    <Link to="/" className="menu__link menu__link--active">
                        <DashboardIcon className="menu__itemIcon"/>
                        Mi espacio
                    </Link>

                    {/* <Link to="/estadisticas" className="menu__link">
                        <InsertChartIcon className="menu__itemIcon"/>
                        Estadísticas
                    </Link> */}
                </div>

                <div>
                    <Button variant="text" onClick={handleLogOut} classes={{label: "color-error", root: "btn--iconText"}}>
                        <ExitToApp color="error" className="btn__icon"/>
                        Cerrar Sesión
                    </Button>
                </div>
            </Drawer>
        </Hidden>
        
    </React.Fragment>)
}

export default Dashboard;