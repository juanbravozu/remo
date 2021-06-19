import React, { FC, useRef, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { TextField, Button, IconButton, Snackbar } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import logo from '../assets/logo-white.svg';
import { Alert } from "@material-ui/lab";
import validateEmail from "../utils/emailValidation";
import { useAuth } from "../contexts/AuthContext";

const Login:FC = () => {

    const [passwordVisible, setPasswordVisible ] = React.useState(false);
    const emailRef = useRef<HTMLDivElement>(null);
    const passwordRef = useRef<HTMLDivElement>(null);
    const [ error, setError ] = useState('');
    const [ openError, setOpenError ] = useState(false);
    const { login } = useAuth()!;
    const history = useHistory();

    function toggleVisibility() {setPasswordVisible(currentValue => !currentValue)}

    function getInnerInputValue(container: HTMLElement): string {
        return '' + container.querySelector('input')?.value;
    }
    
    function handleSubmit(event:any) {
        event.preventDefault();
        const emailValue = getInnerInputValue(emailRef.current!);
        const passwordValue = getInnerInputValue(passwordRef.current!)

        if(!emailValue && !passwordValue) {
            setOpenError(true);
            return setError('Debes llenar todos los campos');
        }

        if(!validateEmail(getInnerInputValue(emailRef!.current!))) {
            setOpenError(true);
            return setError('La dirección de correo electrónico no es válida');
        }

        login(emailValue, passwordValue)
        .then(() => {
            setTimeout(() => {
                history.push('/');
            }, 500);
        })
        .catch((error:any) => {
            setOpenError(true);
            switch(error.code) {
                case 'auth/user-not-found':
                    return setError('No encontramos una cuenta con esa dirección de correo electrónico');

                case 'auth/wrong-password':
                    return setError('Contraseña incorrecta');
            }
            return setError(error.message);
        })
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

            <form className="log__form" onSubmit={handleSubmit}>
                <h2 className="log__title">Inicia sesión</h2>
                <TextField variant="outlined" ref={emailRef} type="email" id="email" label="Correo electrónico" className="textfield"></TextField>
                <div className="textfield__container">
                    <TextField variant="outlined" ref={passwordRef} type={passwordVisible ? 'text' :  'password'} id="password" label="Contraseña" className="textfield"></TextField>
                    <IconButton onClick={toggleVisibility} className="textfield__iconEnd">
                        {passwordVisible && <VisibilityOff/>}
                        {!passwordVisible && <Visibility/>}
                    </IconButton>
                </div>           
                <Link to="/forgotPassword" className="log__forgotPassword">¿Olvidaste tu contraseña?</Link>     
                <Button variant="contained" className="btn btn--secondary" type="submit">Iniciar sesión</Button>

                
                <p className="log__navigate">¿No tienes cuenta? <Link to="/signup" className="underline">Regístrate</Link></p>
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