import { FC, useEffect, useState } from "react";
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import logo from '../assets/logo-white.svg';
/* import { useHistory } from "react-router-dom"; */
import RegisterForm from "../components/registerFormSteps/RegisterForm";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/firebase";
import CompleteProfileStep from "../components/registerFormSteps/CompleteProfileStep";
import SleepStep from "../components/registerFormSteps/SleepStep";
import LunchStep from "../components/registerFormSteps/LunchStep";
import ProductivityStep from "../components/registerFormSteps/ProductivityStep";


export interface IRegisterInfo {
    name: string;
    email: string;
    uid: string;
    bedtime: number;
    waketime: number;
    lunchtime: number;
    breaktime: number;
}

export enum Stage { Basic, Introduction, Sleep, Lunch, Productivity, Afirmations };

const SignUp:FC = () => {
    const [ stage, setStage ] = useState<number>(Stage.Basic);
    const [ error, setError ] = useState<string>('');
    const [ openError, setOpenError ] = useState(false);
    const [ registerInfo, setRegisterInfo] = useState<IRegisterInfo>();
    const { currentUser } = useAuth()!;
    /* const history = useHistory(); */

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
    console.log(stage);

    return (
        <section className="log">

            <div className="flex-center log__logo">
                <img src={logo} alt="Remo"/>
            </div>            

            {(stage === Stage.Basic) && <RegisterForm setError={setError} setOpenError={setOpenError} setRegisterInfo={setRegisterInfo} setStage={setStage}/>}

            {(stage === Stage.Introduction) && <CompleteProfileStep setStage={setStage}/>}

            {(stage === Stage.Sleep) && <SleepStep setStage={setStage} setRegisterInfo={setRegisterInfo}/>}

            {(stage === Stage.Lunch) && <LunchStep setStage={setStage} setRegisterInfo={setRegisterInfo}/>}

            {(stage === Stage.Productivity) && <ProductivityStep setStage={setStage} setRegisterInfo={setRegisterInfo} setError={setError} setOpenError={setOpenError}/>}

            <Snackbar open={openError} autoHideDuration={5000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default SignUp;