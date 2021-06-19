import { FC, useEffect, useState } from "react";
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import logo from '../assets/logo-white.svg';
import { useHistory } from "react-router-dom";
import RegisterForm from "../components/registerFormSteps/RegisterForm";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/firebase";
import CompleteProfileStep from "../components/registerFormSteps/CompleteProfileStep";
import SleepStep from "../components/registerFormSteps/SleepStep";
import LunchStep from "../components/registerFormSteps/LunchStep";
import ProductivityStep from "../components/registerFormSteps/ProductivityStep";
import SlidersStep from "../components/registerFormSteps/SlidersStep";
import WorkdayStep from "../components/registerFormSteps/WorkdayStep";


export interface IRegisterInfo {
    name: string;
    email: string;
    uid: string;
    workday: Array<number>;
    bedtime: number;
    waketime: number;
    lunchtime: number;
    naptime: number;
    breaktime: number;
    nightEnjoy: number;
    productivity: number;
    wakeDifficulty: number;
    satisfaction: number;
}

export enum Stage { Basic, Introduction, Workday, Sleep, Lunch, Productivity, Afirmations };

function calculateProfile(user:IRegisterInfo) {
    const profiles = [{id: 0, value: 0}, {id: 1, value: 0}, {id: 2, value: 0}, {id: 3, value: 0}, {id: 4, value: 0}];

    if(user.bedtime > 12 && user.bedtime < 23) {
        profiles[0].value++;
        profiles[1].value++;
    } else {
        if(user.bedtime >= 23 || user.bedtime < 0.5) profiles[2].value++;
        if(user.bedtime >= 0 && user.bedtime < 1) profiles[3].value++;
        if(user.bedtime >= 0.5 && user.bedtime < 18) profiles[4].value++; 
    }

    if(user.productivity === 0) {
        profiles[0].value += 2;
        profiles[1].value++;
    } else if(user.productivity === 1) {
        profiles[2].value += 2;
        profiles[3].value++;
    } else {
        profiles[4].value++;
    }

    if(user.wakeDifficulty > 4) {
        profiles[0].value--;
        profiles[1].value--;
    } else if(user.wakeDifficulty > 3) {
        profiles[0].value--;
    }

    if(user.nightEnjoy  === 3) profiles[3].value++;
    if(user.nightEnjoy > 3) profiles[4].value++;

    let result = profiles.reduce((acc, current) => {
        if(acc.value < current.value) return current;
        return acc;
    });

    if(result.id === 0 && profiles[0].value === profiles[1].value) result = profiles[1];
    if(result.id === 3 && profiles[3].value === profiles[2].value) result = profiles[2];
    if(result.id === 4 && profiles[4].value === profiles[3].value) result = profiles[3];

    console.log(result);
    return result.id;
}

const SignUp:FC = () => {
    const [ stage, setStage ] = useState<number>(Stage.Basic);
    const [ error, setError ] = useState<string>('');
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

    useEffect(() => {
        if(stage === Stage.Afirmations && registerInfo!.satisfaction) {
            const userUpload = {
                name: registerInfo!.name,
                email: registerInfo!.email,
                uid: registerInfo!.uid,
                profile: calculateProfile(registerInfo as IRegisterInfo),
                workday: registerInfo!.workday,
                lunch: registerInfo!.lunchtime,
                nap: registerInfo!.naptime,
                satisfaction: registerInfo!.satisfaction,
                tasks: []
            }
    
            db.collection('users').doc(userUpload.uid).set(userUpload)
            .then(() => {
                history.push('/');
            })
            .catch(error => console.log(error));
        }
        
    }, [registerInfo])
        
    

    /* console.log(registerInfo) */

    return (
        <section className="log">

            <div className={`flex-center log__logo ${(stage > Stage.Basic && stage < 6) && "hidden"}`}>
                <img src={logo} alt="Remo"/>
            </div>            

            {(stage === Stage.Basic) && <RegisterForm setError={setError} setOpenError={setOpenError} setRegisterInfo={setRegisterInfo} setStage={setStage}/>}

            {(stage === Stage.Introduction) && <CompleteProfileStep setStage={setStage}/>}

            {(stage === Stage.Workday) && <WorkdayStep setStage={setStage} setRegisterInfo={setRegisterInfo}/>}

            {(stage === Stage.Sleep) && <SleepStep setStage={setStage} setRegisterInfo={setRegisterInfo}/>}

            {(stage === Stage.Lunch) && <LunchStep setStage={setStage} setRegisterInfo={setRegisterInfo}/>}

            {(stage === Stage.Productivity) && <ProductivityStep setStage={setStage} setRegisterInfo={setRegisterInfo} setError={setError} setOpenError={setOpenError}/>}

            {(stage === Stage.Afirmations) && <SlidersStep setStage={setStage} setRegisterInfo={setRegisterInfo} setError={setError} setOpenError={setOpenError}/>}

            <Snackbar open={openError} autoHideDuration={5000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default SignUp;