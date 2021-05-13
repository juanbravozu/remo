import React, { FC, useRef, useState } from "react";
import { TextField, Button, Checkbox, IconButton, Snackbar, Dialog } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import logo from '../assets/logo-white.svg';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import validateEmail from "../utils/emailValidation";
import { db } from "../utils/firebase";

const SignUp:FC = () => {

    const [passwordVisible, setPasswordVisible ] = React.useState(false);

    const nameRef = useRef<HTMLDivElement>(null);
    const emailRef = useRef<HTMLDivElement>(null);
    const passwordRef = useRef<HTMLDivElement>(null);
    const passwordConfirmRef = useRef<HTMLDivElement>(null);
    const { signup } = useAuth()!;
    const [ error, setError ] = useState('');
    const [ openError, setOpenError ] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    function getInnerInputValue(container: HTMLElement): string {
        return '' + container.querySelector('input')?.value;
    }

    function handleSubmit(e:any) {
        e.preventDefault();

        if(!getInnerInputValue(nameRef!.current!) && !getInnerInputValue(emailRef!.current!) && !getInnerInputValue(passwordRef!.current!) && !getInnerInputValue(passwordConfirmRef!.current!)){
            setOpenError(true);
            return setError('All fields need to be filled');
        }

        if(!validateEmail(getInnerInputValue(emailRef!.current!))) {
            setOpenError(true);
            return setError('Email is not valid');
        }

        if(getInnerInputValue(passwordRef!.current!) !== getInnerInputValue(passwordConfirmRef!.current!)) {
            setOpenError(true);
            return setError('Passwords do not match');
        }

        setLoading(true)
        signup(getInnerInputValue(emailRef!.current!), getInnerInputValue(passwordRef!.current!))
        .then((user:any) => {
            setLoading(false);
            console.log(user);
            db.collection('users').doc(user.user.uid).set({
                name: getInnerInputValue(nameRef!.current!),
                email: user.user.email,
                uid: user.user.uid
            }). then(() => {
                history.push('/');
            })
        })
        .catch((error:any) => {
            setLoading(false);
            setOpenError(true);
            setError(error.message);
        }); 
    }

    function handleCloseError() {
        setOpenError(false);
        setError('');
    }

    function toggleVisibility() {setPasswordVisible(currentValue => !currentValue)}

    return (
        <section className="log">

            <div className="flex-center log__logo">
                <img src={logo} alt="Remo"/>
            </div>            

            <form className="log__form" onSubmit={handleSubmit}>
                <h2 className="log__title">Sign Up</h2>
                <TextField variant="outlined" ref={nameRef} id="name" label="Name" className="textfield"></TextField>
                <TextField variant="outlined" ref={emailRef} type="email" id="email" label="Email" className="textfield"></TextField>
                <div className="textfield__container">
                    <TextField variant="outlined" ref={passwordRef} type={passwordVisible ? 'text' :  'password'} id="password" label="Password" className="textfield"></TextField>
                    <IconButton onClick={toggleVisibility} className="textfield__iconEnd">
                        {passwordVisible && <VisibilityOff/>}
                        {!passwordVisible && <Visibility/>}
                    </IconButton>
                </div>                
                <TextField variant="outlined" ref={passwordConfirmRef} type={passwordVisible ? 'text' : 'password'} id="password-confirm" label="Confirm password" className="textfield"></TextField>
                <div className="log__terms">
                    <Checkbox className="checkbox" id="terms"/>
                    <label htmlFor="terms" className="checkbox__label">I accept the <span className="underline" onClick={() => setOpenModal(true)}>terms and conditions</span></label>
                </div>
                <Button variant="contained" className="btn btn--secondary" type="submit" disabled={loading}>Sign Up</Button>

                <p className="log__navigate">Already have an account? <Link to="/login" className="underline">Log In</Link></p>
            </form>

            <Snackbar open={openError} autoHideDuration={5000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">
                    {error}
                </Alert>
            </Snackbar>
            
            <Dialog open={openModal}>

            </Dialog>
        </section>
    )
}

export default SignUp;