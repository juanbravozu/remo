import { Button, IconButton, Slider } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { FC } from "react";

interface ISlidersStep {
    setStage: (value:any) => void;
    setRegisterInfo: Function;
}

const marks = [
    {
        value: 1,
        label: 'I disagree'
    },
    {
        value: 6,
        label: 'I agree'
    }
];

const SlidersStep:FC<ISlidersStep> = ({ setStage, setRegisterInfo }) => {

    function handlePreviousStage() {
        setStage((prevStage:number) => {return prevStage - 1})
    }

    return (
        <div className="formStep">
            <div className="formStep__wrapper">
                <header className="formStep__header">
                    <IconButton onClick={handlePreviousStage} className="formStep__back">
                        <ArrowBack />
                    </IconButton>
                    <p>Step 4 out of 4</p>
                </header>
                <h1 className="formStep__title">Almost finished!</h1>
                <p className="formStep__text">Tell us, in a scale from 1 to 6, how much do you agree with the following affirmations.</p>

                <p className="formStep__label" id="first-slider-label">I have trouble waking up early even if I sleep enough hours</p>
                <Slider 
                    min={1}
                    max={6}
                    step={1}
                    marks={marks}
                    valueLabelDisplay="auto"
                    aria-labelledby="first-slider-label"
                />

                <Button className="btn btn--secondary">Continue</Button>
            </div>
        </div>
    );
} 

export default SlidersStep;