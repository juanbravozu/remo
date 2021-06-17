import React, { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db, userData } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext'
import { Button, Drawer, IconButton } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { setGlobalUser, IAvailability, IUser, parseDaysToWeek } from "../utils/algorithm";

const Dashboard:FC = () => {

    const [ openMenu, setOpenMenu ] = useState<boolean>(false);
    const { currentUser } = useAuth()!;
    const [ name, setName ] = useState<string>('');
    const { logout } = useAuth()!;
    const history = useHistory();

    db.collection('users').doc(currentUser.uid).get()
    .then(data => {
        if(!(data.data()!.profile)) return history.push('/signup');
        const myUser:IUser = {
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
        setGlobalUser(myUser);
        setName(myUser.name);
    });

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

        <main>
            <h1>Hola {name && name}</h1>
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