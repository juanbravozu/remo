import React, { FC, useRef } from "react";
import { TextField, Button, Checkbox, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import logo from '../assets/logo-white.svg';
import { Link } from "react-router-dom";

const Login:FC = () => {

    const [passwordVisible, setPasswordVisible ] = React.useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    function toggleVisibility() {setPasswordVisible(currentValue => !currentValue)}

    return (
        <section className="log">

            <div className="flex-center log__logo">
                <img src={logo} alt="Remo"/>
            </div>            

            <form className="log__form">
                <h2 className="log__title">Login</h2>
                <TextField variant="outlined" ref={emailRef} type="email" id="email" label="Email" className="textfield"></TextField>
                <div className="textfield__container">
                    <TextField variant="outlined" ref={passwordRef} type={passwordVisible ? 'text' :  'password'} id="password" label="Password" className="textfield"></TextField>
                    <IconButton onClick={toggleVisibility} className="textfield__iconEnd">
                        {passwordVisible && <VisibilityOff/>}
                        {!passwordVisible && <Visibility/>}
                    </IconButton>
                </div>           
                <p className="log__forgotPassword">Forgot your password?</p>     
                <Button variant="contained" className="btn btn--secondary">Log In</Button>

                
                <p className="log__navigate">Don't have an account? <Link to="/signup">Sign Up</Link></p>

            </form>
        </section>
    )
}

export default Login;