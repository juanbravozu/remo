import { Button } from "@material-ui/core";
import { FC } from "react";
import { Stage } from '../../pages/SignUp';

interface ICompleteProfileStep {
    setStage: (value:number) => void;
}

const CompleteProfileStep:FC<ICompleteProfileStep> = ({ setStage }) => {

    function handleStageChange() {
        setStage(Stage.Workday);
    }

    return (
        <div className="formStep">
            <div className="formStep__wrapper">
                <h1 className="formStep__title">Completemos tu perfil</h1>
                <p className="formStep__text">Para poder asignarte un perfil de productividad necesitamos conocerte un poco más.</p>
                <Button className="btn btn--secondary" onClick={handleStageChange}>Empecemos</Button>
            </div>            
        </div>
    )
} 

export default CompleteProfileStep;