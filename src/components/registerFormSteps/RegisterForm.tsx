import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { FC, FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import validateEmail, { getInnerInputValue } from '../../utils/emailValidation';
import { IRegisterInfo } from '../../pages/SignUp';
import { db } from "../../utils/firebase";

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
            setError('Debes llenar todos los campos para continuar');
            return false;
        }

        if(!validateEmail(getInnerInputValue(emailRef!.current!))) {
            setOpenError(true);
            setError('La dirección de correo electrónico no es válida');
            return false;
        }

        if(getInnerInputValue(passwordRef!.current!) !== getInnerInputValue(passwordConfirmRef!.current!)) {
            setOpenError(true);
            setError('Las contraseñas no coinciden');
            return false;
        }

        if(getInnerInputValue(termsCheckboxRef!.current!, 'checked') === 'false') {
            setOpenError(true);
            setError('Debes aceptar los términos y condiciones');
            return false;
        }

        setLoading(true)
        return true;
    }

    function handleSubmitRegister(event:FormEvent) {
        event.preventDefault();

        if(checkValid()) {

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
                db.collection('users').doc(user.user.uid).set({
                    name: getInnerInputValue(nameRef!.current!),
                    email: getInnerInputValue(emailRef!.current!),
                    uid: user.user.uid
                })
                .then(() => {
                    setStage(1);
                })
            })
            .catch((error:any) => {
                setLoading(false);
                setOpenError(true);
                switch(error.code) {
                    case 'auth/email-already-in-use':
                        return setError('Ya existe una cuenta con esa dirección de correo electrónico');
                        
                    case 'auth/weak-password':
                        return setError('La contraseña debe contener al menos 6 caracteres');
                }
                return setError(error.message);
            });
        }
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    return (
        <form className="log__form" onSubmit={handleSubmitRegister}>
            <h2 className="log__title">Regístrate</h2>
            <TextField variant="outlined" ref={nameRef} id="name" label="Nombre" className="textfield"></TextField>
            <TextField variant="outlined" ref={emailRef} type="email" id="email" label="Correo electrónico" className="textfield"></TextField>
            <div className="textfield__container">
                <TextField variant="outlined" ref={passwordRef} type={passwordVisible ? 'text' :  'password'} id="password" label="Contraseña" className="textfield"></TextField>
                <IconButton onClick={toggleVisibility} className="textfield__iconEnd">
                    {passwordVisible && <VisibilityOff/>}
                    {!passwordVisible && <Visibility/>}
                </IconButton>
            </div>                
            <TextField variant="outlined" ref={passwordConfirmRef} type={passwordVisible ? 'text' : 'password'} id="password-confirm" label="Confirmar contraseña" className="textfield"></TextField>
            <div className="log__terms">
                <Checkbox className="checkbox" id="terms" ref={termsCheckboxRef}/>
                <label htmlFor="terms" className="checkbox__label">Acepto los<span className="underline" onClick={() => setOpenModal(true)}> términos y condiciones</span></label>
            </div>
            <Button variant="contained" className="btn btn--secondary" type="submit" disabled={loading}>Regístrate</Button>

            <p className="log__navigate">¿Ya tienes cuenta? <Link to="/login" className="underline">Inicia sesión</Link></p>

            <Dialog open={openModal} onClose={handleCloseModal} scroll="paper" aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle id="scroll-dialog-title">Términos y condiciones</DialogTitle>
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