import React, { FC, useRef } from "react";
import { TextField, Button, Checkbox, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import logo from '../assets/logo-white.svg';
import { Link } from "react-router-dom";

const SignUp:FC = () => {

    const [passwordVisible, setPasswordVisible ] = React.useState(false);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);

    function toggleVisibility() {setPasswordVisible(currentValue => !currentValue)}

    return (
        <section className="log">

            <div className="flex-center log__logo">
                <img src={logo} alt="Remo"/>
            </div>            

            <form className="log__form">
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
                    <label htmlFor="terms" className="checkbox__label">I accept the <span className="underline">terms and conditions</span></label>
                </div>
                <Button variant="contained" className="btn btn--secondary">Sign Up</Button>

                
                <p className="log__navigate">Already have an account? <Link to="/login">Log In</Link></p>

            </form>
        </section>
    )
}

export default SignUp;