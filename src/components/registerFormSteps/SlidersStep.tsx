import { Button, IconButton, Slider } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { FC, useState } from "react";

interface ISlidersStep {
    setStage: (value:any) => void;
    setRegisterInfo: Function;
    setError: (value:string) => void;
    setOpenError: (value:boolean) => void;
    onComplete: Function;
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

const SlidersStep:FC<ISlidersStep> = ({ setStage, setRegisterInfo, setError, setOpenError, onComplete }) => {

    const [ wakeValue, setWakeValue ] = useState<number | number[]>(-1);
    const [ nightValue, setNightValue ] = useState<number | number[]>(-1);
    const [ satisfactionValue, setSatisfactionValue ] = useState<number | number[]>(-1);

    function handlePreviousStage() {
        setStage((prevStage:number) => {return prevStage - 1})
    }

    function updateInformation() {
        if(wakeValue === -1 || nightValue === -1 || satisfactionValue === -1) {
            setError('Please choose a value in all fields');
            return setOpenError(true);
        }

        setRegisterInfo((prevState:any) => ({
            ...prevState,
            nightEnjoy: nightValue,
            wakeDifficulty: wakeValue,
            satisfaction: satisfactionValue
        }));
    }

    function handleWakeValueChanged(e:any, value:number | number[]) {
        setWakeValue(value);
    }

    function handleNightValueChanged(e:any, value:number | number[]) {
        setNightValue(value);
    }

    function handleSatisfactionValueChanged(e:any, value:number | number[]) {
        setSatisfactionValue(value);
    }

    function handleClick() {
        updateInformation();
        onComplete();
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
                    value={wakeValue}
                    min={1}
                    max={6}
                    step={1}
                    marks={marks}
                    valueLabelDisplay="auto"
                    aria-labelledby="first-slider-label"
                    onChange={handleWakeValueChanged}
                />

                <p className="formStep__label" id="second-slider-label">I enjoy working during the night</p>
                <Slider 
                    value={nightValue}
                    min={1}
                    max={6}
                    step={1}
                    marks={marks}
                    valueLabelDisplay="auto"
                    aria-labelledby="second-slider-label"
                    onChange={handleNightValueChanged}
                />

                <p className="formStep__label" id="third-slider-label">At the end of my workday I feel satisfied with the work I’ve done</p>
                <Slider 
                    value={satisfactionValue}
                    min={1}
                    max={6}
                    step={1}
                    marks={marks}
                    valueLabelDisplay="auto"
                    aria-labelledby="third-slider-label"
                    onChange={handleSatisfactionValueChanged}
                />

                <Button className="btn btn--secondary" onClick={handleClick}>Continue</Button>
            </div>
        </div>
    );
} 

export default SlidersStep;