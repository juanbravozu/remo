import { Button, Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useRef } from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo-white.svg';
import { useAuth } from "../contexts/AuthContext";
import validateEmail from "../utils/emailValidation";
import { getInnerInputValue } from "../utils/emailValidation";


const ForgotPassword:FC = () => {

    const [ error, setError ] = useState<string>('');
    const [ message, setMessage ] = useState<string>('');
    const emailRef = useRef(null);
    const { resetPassword } = useAuth()!;

    function handleCloseError() {
        setError('');
    }

    function handleResetPassword() {
        const value = getInnerInputValue(emailRef!.current!)

        if(!value) { 
            return setError('Por favor escribe tu correo electrónico');
        }
        if(!validateEmail(value)) {
            return setError('La dirección de correo electrónico no es válida');
        }

        resetPassword(value)
        .then(() => {
            setMessage('Revisa tu correo para seguir el proceso de reiniciar tu contraseña');
        })
        .catch(error => {
            if(error.code === 'auth/user-not-found') setError('No encontramos un usuario con esa dirección de correo electrónico');
        });
    }

    function handleCloseMessage() {
        setMessage('');
    }

    return (
        <section className="log">
 
            <div className="flex-center log__logo">
                <img src={logo} alt="Remo"/>
            </div>            

            <form className="log__form">
                <h2 className="log__title">Reiniciar contraseña</h2>
                <TextField variant="outlined" ref={emailRef} type="email" id="email" label="Correo electrónico" className="textfield"></TextField>   
                <Button variant="contained" className="btn btn--primary" onClick={handleResetPassword}>Cambiar contraseña</Button>

                <Link to="/login" className="log__navigate">Iniciar sesión</Link>

            </form>
            <Snackbar open={error ? true : false} autoHideDuration={5000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">
                    {error}
                </Alert>
            </Snackbar>

            <Snackbar open={message ? true : false} autoHideDuration={5000} onClose={handleCloseMessage}>
                <Alert onClose={handleCloseMessage} severity="success">
                    {message}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default ForgotPassword;