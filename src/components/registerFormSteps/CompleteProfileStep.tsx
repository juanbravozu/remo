import { Button } from "@material-ui/core";
import { FC } from "react";
import { Stage } from '../../pages/SignUp';

interface ICompleteProfileStep {
    setStage: (value:number) => void;
}

const CompleteProfileStep:FC<ICompleteProfileStep> = ({ setStage }) => {

    function handleStageChange() {
        setStage(Stage.Sleep);
    }

    return (
        <div className="formStep">
            <div className="formStep__wrapper">
                <h1 className="formStep__title">Let’s complete your profile</h1>
                <p className="formStep__text">In order to assign you a productivity profile, we need to know a little bit about you.</p>
                <Button className="btn btn--secondary" onClick={handleStageChange}>Continue</Button>
            </div>            
        </div>
    )
} 

export default CompleteProfileStep;