import { Button, IconButton, Slider } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { FC, useState } from "react";

interface ISlidersStep {
    setStage: (value:any) => void;
    setRegisterInfo: Function;
    setError: (value:string) => void;
    setOpenError: (value:boolean) => void;
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

const SlidersStep:FC<ISlidersStep> = ({ setStage, setRegisterInfo, setError, setOpenError }) => {

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
    }

    return (
        <div className="formStep">
            <div className="formStep__wrapper">
                <header className="formStep__header">
                    <IconButton onClick={handlePreviousStage} className="formStep__back">
                        <ArrowBack />
                    </IconButton>
                    <p>Paso 5 de 5</p>
                </header>
                <h1 className="formStep__title">¡Ya casi terminas!</h1>
                <p className="formStep__text">Elige qué tan de acuerdo estás, en una escala de 1 a 6, con las siguientes afirmaciones.</p>

                <p className="formStep__label" id="first-slider-label">Me cuesta levantarme temprano, incluso si he dormido lo suficiente</p>
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

                <p className="formStep__label" id="second-slider-label">Disfruto trabajar durante la noche</p>
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

                <p className="formStep__label" id="third-slider-label">Al finalizar mi jornada laboral, me siento satisfecho/a con mi trabajo</p>
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

                <Button className="btn btn--secondary" onClick={handleClick}>Continuar</Button>
            </div>
        </div>
    );
} 

export default SlidersStep;