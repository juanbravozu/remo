import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { FC, useState } from "react";
import { IRegisterInfo } from "../../pages/SignUp";

interface IProductivityStep {
    setStage: (value:any) => void;
    setRegisterInfo: Function;
    setError: (value:string) => void;
    setOpenError: (value:boolean) => void;
}

enum Productivity { Morning, Afternoon, Evening };

const ProductivityStep:FC<IProductivityStep> = ({ setStage, setRegisterInfo, setError, setOpenError }) => {

    const [ currentProd, setCurrentProd ] = useState<number>(-1);

    function handleSelection(number:number) {
        setCurrentProd(number);
    }

    function handlePreviousStage() {
        setStage((prevStage:number) => {return prevStage - 1})
    }

    function handleNextStage() {

        if(currentProd === -1) {
            setError('Please pick an option before continuing');
            return setOpenError(true);
        }

        setRegisterInfo((prevState:IRegisterInfo) => ({
            ...prevState,
            productivity: currentProd
        })); 
        setStage((prevStage:number) => {return prevStage + 1});
    }

    return (
        <div className="formStep">
            <div className="formStep__wrapper">
                <header className="formStep__header">
                    <IconButton onClick={handlePreviousStage} className="formStep__back">
                        <ArrowBack />
                    </IconButton>
                    <p>Step 3 out of 4</p>
                </header>
                <h1 className="formStep__title">Productivity</h1>
                <p className="formStep__text">Please choose at what time of the day you feel more productive.</p>

                <ButtonGroup className="btn btn--group">
                    <Button className={(currentProd === Productivity.Morning) ? "btn__grouped btn__grouped--active" : "btn__grouped"} onClick={() => handleSelection(Productivity.Morning)}>
                        Morning
                    </Button>
                    <Button className={(currentProd === Productivity.Afternoon) ? "btn__grouped btn__grouped--active" : "btn__grouped"} onClick={() => handleSelection(Productivity.Afternoon)}>
                        Afternoon
                    </Button>
                    <Button className={(currentProd === Productivity.Evening) ? "btn__grouped btn__grouped--active" : "btn__grouped"} onClick={() => handleSelection(Productivity.Evening)}>
                        Evening
                    </Button>
                </ButtonGroup>

                <Button className="btn btn--secondary" onClick={handleNextStage}>Continue</Button>
            </div>
        </div>
    );
}

export default ProductivityStep;