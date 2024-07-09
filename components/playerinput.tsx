"use client";
import { useState, ChangeEvent } from "react";
import {SessionConfig, PasswordChecker} from "@/PasswordChecker";
import {configGenerator} from "@/actions/SessionGenerator";
import FinishScreen from "@/components/FinishScreen";

const PlayerInput = () => {
    const [password, setPassword] = useState<string>("");
    const [level, setLevel] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [config, setConfig] = useState<SessionConfig>({
        passLength: 0,
        sumDigits: 0,
        countryID: "0",
        RomanNumeralMult: 0,
        CapchaID: "0",
        WormsEaten: 0,
        WormsUpdateRate: 0,
        LetterBanned: ""
    });

    const onPasswordSubmit = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!isStarted) {
            setIsStarted(true);
            setConfig(await configGenerator());
        }

        const input = event.target.value;
        setPassword(input);

        let result = PasswordChecker(input, level, config, false);
        while (result && result[level]) {
            setLevel(prevLevel => prevLevel + 1);
            result = PasswordChecker(input, level, config, true);
        }

        console.log(level);
    }

    return (
        <div>
            <div className="text-center">
                <h1 className="text-4xl font-serif mb-8">✶ The Password Game</h1>
                <label className="block text-lg mb-2">Please choose a password</label>
                <input className="border rounded-lg p-2 w-96" onChange={onPasswordSubmit}/>
            </div>
            <FinishScreen win="You win" lose="You lose" isVisible={isFinished}/>
        </div>
    );
};

export default PlayerInput;