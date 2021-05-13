import { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db, userData } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext'
import { Button } from "@material-ui/core";

const Dashboard:FC = () => {

    const { currentUser } = useAuth()!;
    const [ user, setUser ] = useState<userData>();
    const { logout } = useAuth()!;
    const history = useHistory();

    db.collection('users').doc(currentUser.uid).get()
    .then(data => {
        setUser(data.data() as userData);
    });

    function handleLogOut() {
        logout()
        .then(() => {
            history.push('/login')
        })
    }

    return (<div>
        
        <h1>Hola {user && user.name}</h1>

        <Link to="/signup" className="btn btn--primary">Sign up</Link>
        <Link to="/login" className="btn btn--secondary">Log in</Link>

        <Button variant="contained" className="btn btn--primary" onClick={handleLogOut}>Log Out</Button>
    </div>)
}

export default Dashboard;