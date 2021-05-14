import { FC, useState } from "react";
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import logo from '../assets/logo-white.svg';
import { useHistory } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import RegisterForm from "../components/RegisterForm";


export interface IRegisterInfo {
    name: string;
    email: string;
    uid: string;
    bedtime: number;
    waketime: number;
    lunchtime: number;
    breaktime: number;
}

const SignUp:FC = () => {

    enum Stage { Basic, Sleep, Wake, Productivity, Afirmations };
    const [ stage, setStage ] = useState<number>(Stage.Basic);
    const { signup } = useAuth()!;
    const [ error, setError ] = useState('');
    const [ openError, setOpenError ] = useState(false);
    const [ registerInfo, setRegisterInfo] = useState<IRegisterInfo>();
    const history = useHistory();

    function handleCloseError() {
        setOpenError(false);
        setError('');
    }
    
    console.log(registerInfo);

    return (
        <section className="log">

            <div className="flex-center log__logo">
                <img src={logo} alt="Remo"/>
            </div>            

            {(stage === Stage.Basic) && <RegisterForm setError={setError} setOpenError={setOpenError} setRegisterInfo={setRegisterInfo} setStage={setStage}/>}

            <Snackbar open={openError} autoHideDuration={5000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default SignUp;