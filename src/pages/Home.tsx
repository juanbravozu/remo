import { FC } from "react";
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Home:FC = () => {   

    let history = useHistory();

    function handleToLogin() {
        history.push('/login');
    }

    return (
        <main>
            <Button className="btn btn--primary" variant="contained" onClick={handleToLogin}>Log in</Button>
        </main>
    )
}

export default Home;