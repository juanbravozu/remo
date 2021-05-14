import { FC, useEffect, useState } from "react";
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import logo from '../assets/logo-white.svg';
import { useHistory } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/firebase";


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

    enum Stage { Basic, Introduction, Sleep, Wake, Productivity, Afirmations };
    const [ stage, setStage ] = useState<number>(Stage.Basic);
    const [ error, setError ] = useState('');
    const [ openError, setOpenError ] = useState(false);
    const [ registerInfo, setRegisterInfo] = useState<IRegisterInfo>();
    const { currentUser } = useAuth()!;
    const history = useHistory();

    useEffect(() => {
        if(currentUser) {
            db.collection('users').doc(currentUser.uid).get()
            .then(doc => {
                setRegisterInfo(doc.data() as IRegisterInfo);
                setStage(Stage.Introduction);
            });
        }
    }, []);
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

            {(stage === Stage.Basic) && <RegisterForm setError={setError} setOpenError={setOpenError} setRegisterInfo={setRegisterInfo} setStage={setStage} registerInfo={registerInfo}/>}

            <Snackbar open={openError} autoHideDuration={5000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default SignUp;