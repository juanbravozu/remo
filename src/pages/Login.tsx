import React, { FC, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { TextField, Button, IconButton, Snackbar } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import logo from '../assets/logo-white.svg';
import { Alert } from "@material-ui/lab";

const Login:FC = () => {

    const [passwordVisible, setPasswordVisible ] = React.useState(false);

    const emailRef = useRef<HTMLDivElement>(null);
    const passwordRef = useRef<HTMLDivElement>(null);
    const [ error, setError ] = useState('');
    const [ openError, setOpenError ] = useState(false);

    function toggleVisibility() {setPasswordVisible(currentValue => !currentValue)}

    function getInnerInputValue(container: HTMLElement): string {
        return '' + container.querySelector('input')?.value;
    }
    
    function handleClose() {
        setOpenError(false);
        setError('');
    }

    return (
        <section className="log">

            <div className="flex-center log__logo">
                <img src={logo} alt="Remo"/>
            </div>            

            <form className="log__form">
                <h2 className="log__title">Log In</h2>
                <TextField variant="outlined" ref={emailRef} type="email" id="email" label="Email" className="textfield"></TextField>
                <div className="textfield__container">
                    <TextField variant="outlined" ref={passwordRef} type={passwordVisible ? 'text' :  'password'} id="password" label="Password" className="textfield"></TextField>
                    <IconButton onClick={toggleVisibility} className="textfield__iconEnd">
                        {passwordVisible && <VisibilityOff/>}
                        {!passwordVisible && <Visibility/>}
                    </IconButton>
                </div>           
                <Link to="/forgotPassword" className="log__forgotPassword">Forgot your password?</Link>     
                <Button variant="contained" className="btn btn--primary">Log In</Button>

                
                <p className="log__navigate">Don't have an account? <Link to="/signup" className="underline">Sign Up</Link></p>
            </form>

            <Snackbar open={openError} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default Login;