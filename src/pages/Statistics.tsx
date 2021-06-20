import { Button, Drawer, Hidden, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import InsertChartIcon from '@material-ui/icons/InsertChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { ExitToApp } from "@material-ui/icons";
import profileIcon from '../assets/profile_icon.svg';
import { FC } from "react";
import { db } from "../utils/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";


const Statistics:FC = () => {
    const [ openMenu, setOpenMenu ] = useState<boolean>(false);
    const { currentUser, logout } = useAuth()!;
    const [ userData, setUserData ] = useState<any>({});
    const [ tasks, setTasks ] = useState<any[]>([]);
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

    function handleLogOut() {
        logout()
        .then(() => {
            history.push('/login');
        })
    }

    return (
        <React.Fragment>
            <header className="nav">
                <IconButton color="primary" style={{fontSize: "2.8rem"}} onClick={() => setOpenMenu(true)}>
                    <MenuIcon color="primary" fontSize="inherit"/>
                </IconButton>
            </header>

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

                    <Link to="/" className="menu__link">
                        <DashboardIcon className="menu__itemIcon"/>
                        Mi espacio
                    </Link>
 
                    <Link to="/estadisticas" className="menu__link menu__link--active">
                        <InsertChartIcon className="menu__itemIcon"/>
                        Estadísticas
                    </Link>
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

                        <Link to="/" className="menu__link">
                            <DashboardIcon className="menu__itemIcon"/>
                            Mi espacio
                        </Link>

                        <Link to="/estadisticas" className="menu__link menu__link--active">
                            <InsertChartIcon className="menu__itemIcon"/>
                            Estadísticas
                        </Link>
                    </div>

                    <div>
                        <Button variant="text" onClick={handleLogOut} classes={{label: "color-error", root: "btn--iconText"}}>
                            <ExitToApp color="error" className="btn__icon"/>
                            Cerrar Sesión
                        </Button>
                    </div>
                </Drawer>
            </Hidden>
        </React.Fragment>
    )
}

export default Statistics;