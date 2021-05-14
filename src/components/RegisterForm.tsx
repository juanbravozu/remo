import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { FC, FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import validateEmail, { getInnerInputValue } from '../utils/emailValidation';
import { IRegisterInfo } from '../pages/SignUp';

interface BasicRegisterProps {
    setError: (error:string) => void;
    setOpenError: (openError:boolean) => void;
    setRegisterInfo: Function;
    setStage: Function;
}

const RegisterForm:FC<BasicRegisterProps> = ({setError, setOpenError, setRegisterInfo, setStage }: BasicRegisterProps) => {

    function toggleVisibility() {setPasswordVisible(currentValue => !currentValue)}
    const [passwordVisible, setPasswordVisible ] = useState(false);
    const nameRef = useRef<HTMLDivElement>(null);
    const emailRef = useRef<HTMLDivElement>(null);
    const passwordRef = useRef<HTMLDivElement>(null);
    const passwordConfirmRef = useRef<HTMLDivElement>(null);
    const termsCheckboxRef = useRef<HTMLButtonElement>(null);
    const [ loading, setLoading ] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);
    const { signup } = useAuth()!;

    function checkValid() {

        if(!getInnerInputValue(nameRef!.current!) || !getInnerInputValue(emailRef!.current!) || !getInnerInputValue(passwordRef!.current!) || !getInnerInputValue(passwordConfirmRef!.current!)){
            setOpenError(true);
            setError('All fields need to be filled');
            return false;
        }

        if(!validateEmail(getInnerInputValue(emailRef!.current!))) {
            setOpenError(true);
            setError('Email is not valid');
            return false;
        }

        if(getInnerInputValue(passwordRef!.current!) !== getInnerInputValue(passwordConfirmRef!.current!)) {
            setOpenError(true);
            setError('Passwords do not match');
            return false;
        }

        if(getInnerInputValue(termsCheckboxRef!.current!, 'checked') === 'false') {
            setOpenError(true);
            setError('You need to accept our Terms and Conditions');
            return false;
        }

        setLoading(true)
        return true;
    }

    function handleSubmitRegister(event:FormEvent) {
        event.preventDefault();

        if(checkValid()) {
            console.log('Passed validation');
            
            setLoading(true);
            signup(getInnerInputValue(emailRef!.current!), getInnerInputValue(passwordRef!.current!))
            .then((user:any) => {
                setLoading(false);
                setRegisterInfo((prevState:IRegisterInfo) => ({
                    ...prevState,
                    name: getInnerInputValue(nameRef!.current!),
                    email: getInnerInputValue(emailRef!.current!),
                    uid: user.user.uid
                }));
                setStage(1);
            })
            .catch((error:any) => {
                setLoading(false);
                setOpenError(true);
                setError(error.message);
            });
        }
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    return (
        <form className="log__form" onSubmit={handleSubmitRegister}>
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
                <Checkbox className="checkbox" id="terms" ref={termsCheckboxRef}/>
                <label htmlFor="terms" className="checkbox__label">I accept the <span className="underline" onClick={() => setOpenModal(true)}>terms and conditions</span></label>
            </div>
            <Button variant="contained" className="btn btn--secondary" type="submit" disabled={loading}>Sign Up</Button>

            <p className="log__navigate">Already have an account? <Link to="/login" className="underline">Log In</Link></p>

            <Dialog open={openModal} onClose={handleCloseModal} scroll="paper" aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle id="scroll-dialog-title">Terms and Conditions</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="scroll-dialog-description" tabIndex={-1} className="body">
                        {[...new Array(50)]
                            .map(
                                () => `Cras mattis consectetur purus sit amet fermentum.
                                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                            )
                        .join('\n')}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseModal} className="body">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}

export default RegisterForm;