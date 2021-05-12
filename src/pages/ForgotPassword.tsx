import { Button, TextField } from "@material-ui/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo-white.svg';


const ForgotPassword:FC = () => {

    return (
        <section className="log">
 
            <div className="flex-center log__logo">
                <img src={logo} alt="Remo"/>
            </div>            

            <form className="log__form">
                <h2 className="log__title">Reset Password</h2>
                <TextField variant="outlined" type="email" id="email" label="Email" className="textfield"></TextField>   
                <Button variant="contained" className="btn btn--primary">Change Password</Button>

                <Link to="/login" className="log__navigate">Log In</Link>

            </form>
        </section>
    )
}

export default ForgotPassword;