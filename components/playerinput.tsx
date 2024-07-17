"use client";
import React, {useEffect, useRef, useState} from "react";
import {RulesData} from "@/components/Rules/RuleCard";
import Rules from "@/components/Rules/Rules";
import {PasswordChecker} from "@/actions/PasswordChecker";
import {configGenerator} from "@/actions/SessionGenerator";
import FinishScreen from "@/components/FinishScreen";
import {generateSetRules} from "@/components/Rules/SetRules";
import './playerinput.css';
import CheatGenerator, {ConfigWrapper} from "@/actions/Cheat";
import LoadingScreen from "@/components/LoadingScreen";
import ScorePassword from "@/components/ScorePassword";
import {Difficulty} from "@/app/page";

interface PlayerInputProps {
    Difficulty?: Difficulty;
}
const PlayerInput = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isWinning, setIsWinning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [config, setConfig] = useState<ConfigWrapper>(
        {
            config: {
                passLength: 0,
                sumDigits: 0,
                countryID: "",
                RomanNumeralMult: 0,
                CaptchaID: "",
                WormsEaten: 0,
                WormsUpdateRate: 0,
                RandomBannedWord: 0,
                BannedWord: "",
                MinimumDigits: 0,
            }
        }
    );
    const [booleanData, setBooleanData] = useState<Record<number, boolean>>({});
    const [rules, setRules] = useState<RulesData[]>([]);
    const higlightRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => { // Config and rules generation
        const fetchData = async () => {
            const data = await configGenerator();
            const generatedRules = await generateSetRules(data);
            const rulesData = generatedRules.map((rule, index) => ({
                title: rule.title,
                description: rule.description(),
                image: rule.image,
                index: index
            }));
            setRules(rulesData);
            setConfig({config: data});
        };

        fetchData();
    }, []);

    const [isFireLevel, setIsFireLevel] = useState(false);
    const [isEggLevel, setIsEggLevel] = useState(false);
    const [isChickenLevel, setIsChickenLevel] = useState(false);
    const [bannedWord, setBannedWord] = useState("");
    const [isLoadingCheat, setIsLoadingCheat] = useState(false);
    const [isCheatUsed, setIsCheatUsed] = useState(false);
    const [Score, SetScore] = useState(0);
    useEffect(() => {
        // Random chance to set the fire level on again
        if (level >= 11 && !isCheatUsed) {
            let intervalFireStarter: NodeJS.Timeout | undefined;
            if (intervalFireStarter !== undefined) return;
            intervalFireStarter = setInterval(() => {
                if (isCheatUsed) return;
                const randomChance = Math.floor(Math.random() * 100);
                if (randomChance < 10) {
                    setIsFireLevel(true);
                    const currentInput = inputRef.current?.value || "";
                    const lastIndex = currentInput.length - 1;

                    if (lastIndex === -1) return;
                    const newValue = currentInput.substring(0, lastIndex) + '🔥';

                    inputRef.current!.value = newValue;
                    setPassword(newValue);
                    clearInterval(intervalFireStarter);
                }
            }, 5000);
        }

        // Exit early if isFireLevel is not true,
        // preventing the interval from being set
        if (!isFireLevel || isCheatUsed) return;

        let intervalId: NodeJS.Timeout | undefined;
        // Set the interval to update the textarea value
        intervalId = setInterval(() => {
            // FUCNKING!!! I WORK 8 HOURS JUST TO NOT KNOW THIS
            // https://stackoverflow.com/questions/38345372/why-does-a-string-containing-a-single-emoji-like-have-a-length-of-2
            if (inputRef.current == null || isCheatUsed) return;
            const currentValue = Array.from(inputRef.current.value);
            const indexFire = currentValue.indexOf("🔥");

            // Change one character from the fire index to the left
            // To a fire emoji
            if (indexFire === -1) return;

            // Calculate the start index for replacement,
            // ensuring it does not go beyond the start of the string
            const startIndex = indexFire > 0 ? indexFire - 1 : indexFire;
            // if it already on the first index,
            // don't change anything
            if (startIndex === indexFire) return;

            // Replace the character at the start index with a fire emoji
            let newValue = currentValue;
            newValue[startIndex] = '🔥';

            // Join the array back into a string
            const newValueString = newValue.join("");
            inputRef.current.value = newValueString;

            setPassword(newValueString);
        }, 1000); // ms

        // Cleanup function to clear the interval when the component unmounts
        // or isFireLevel changes
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isFireLevel, level, isCheatUsed]);

    useEffect(() => {
        const handleInput = () => {
            const text = inputRef.current?.value || "";

            let maxRed = 0;
            for (let i = 1; i <= level; i++) {
                if (!booleanData[i]) {
                    maxRed = i;
                }
            }

            switch (maxRed) {
                case 5:
                    const highlightedText = text.replace(/\d/g, '<mark>$&</mark>');
                    if (higlightRef.current) {
                        higlightRef.current.innerHTML = highlightedText;
                    }
                    break;
                case 9:
                    const highlightedTextRoman = text.replace(/[IVXLCDM]+/g, (match) => `<mark>${match}</mark>`);
                    if (higlightRef.current) {
                        higlightRef.current.innerHTML = highlightedTextRoman;
                    }
                    break;
                default:
                    if (higlightRef.current) {
                        higlightRef.current.innerHTML = text;
                    }
                    break;
            }
        };
        handleInput()

        const handleScroll = () => {
            if (backdropRef.current && higlightRef.current) {
                backdropRef.current.scrollTop = inputRef.current?.scrollTop || 0;
                backdropRef.current.scrollLeft = inputRef.current?.scrollLeft || 0;
            }
        };
        inputRef.current?.addEventListener('input', handleInput);
        inputRef.current?.addEventListener('scroll', handleScroll);
        // Cleanup
        return () => {
            inputRef.current?.removeEventListener('input', handleInput);
            inputRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, [backdropRef, higlightRef, booleanData, level, password]);

    useEffect(() => {
        if (!isChickenLevel || isCheatUsed) return;
        
        let intervalChicken: NodeJS.Timeout | undefined;
        
        if (config === undefined || config.config.WormsUpdateRate === 0) return;
        
        intervalChicken = setInterval(() => {
            if (isCheatUsed) return;
            let current = inputRef.current?.value || "";
            const worms = current.match(/🐛/g);

            if (worms === null || worms.length === 0){
                setIsFinished(true);
                return;
            }

            let newVal = Array.from(current);

            for (let i = 0; i < config.config.WormsEaten; i++){
                const index = newVal.indexOf("🐛");
                if (index === -1 && !isCheatUsed) {
                    setIsFinished(true);
                    return;
                }
                newVal[index] = "";
            }
            const newvalString = newVal.join("");
            inputRef.current!.value = newvalString;
            setPassword(newvalString);
        }, config.config.WormsUpdateRate * 1000);

        // Cleanup
        return () => {
            if (intervalChicken) clearInterval(intervalChicken);
        };
    }, [config, isCheatUsed, isChickenLevel]);

    const preProcessLevel = async (currentLevel: number, input: string, isCheatUsed: boolean) => {
        switch (currentLevel) {
            case 10:
                if (isCheatUsed) return;
                setIsFireLevel(true);
                let currentInput = Array.from(input);
                const lastIndex = currentInput.length - 1;
                if (lastIndex === -1) return;
                let newValue = currentInput;
                newValue[lastIndex] = '🔥';
                const stringOfArray = newValue.join("");
                inputRef.current!.value = stringOfArray;
                setPassword(stringOfArray);
                input = stringOfArray;
                break;
            case 11:
                setIsEggLevel(true);
                break;
            case 14:
                setIsChickenLevel(true);
                setIsEggLevel(false);
                const current = inputRef.current?.value || "";
                const newval = current.replace("🥚", "🐔");
                inputRef.current!.value = newval;
                setPassword(newval);
                input = newval;
                break;
            default:
                break;
        }
    }

    const SpecialEndings = (currentLevel : number, input: string) => {
        if (isCheatUsed) return;

        if (isEggLevel && currentLevel < 14 && currentLevel > 11){
            const isEgg = input?.includes("🥚");
            if (isEgg) return;
            setIsFinished(true);
        }

        if (isChickenLevel){
            const isChicken = input?.match(/🐔/g)?.length;
            if (isChicken) return;
            setIsFinished(true);
        }
    }
    const processLevel = async (currentLevel: number, input: string, isCheatUsed: boolean) => {

        SpecialEndings(currentLevel, input);
        if (input === undefined) return;
        const result = await PasswordChecker(input,currentLevel, config.config, bannedWord, isLoadingCheat, isCheatUsed);

        if (result == null) {
            setIsLoadingCheat(true);
            const password = await CheatGenerator(input, config, bannedWord);
            if (password === "") return;

            const passLength = Array.from(password).length;
            const pass = passLength == 99 ? password.substring(0, 97) : password

            setPassword(pass);
            inputRef.current!.value = pass;
            setIsLoadingCheat(false);
            setIsCheatUsed(true);

            const isCheatUsedNow = true;

            await processLevel(currentLevel, pass, isCheatUsedNow);
            return;
        }
        setBooleanData(result);

        for (let i = 1; i <= currentLevel; i++) { // If some level not passed yet, return
            if (!result[i]) {
                return;
            }
        }

        if (!result[currentLevel]) return;
        if (currentLevel === 20) {
            setIsWinning(true);
            setIsFinished(true);
            return;
        } else {
            setLevel(currentLevel + 1);
            // When level up is called, set the next level first before processing
            // If the next level need some special changes to input
            await preProcessLevel(currentLevel + 1, input, isCheatUsed);
            await processLevel(currentLevel + 1, input, isCheatUsed);
        }
    };

    const handleChange = async (event: React.ChangeEvent<HTMLTextAreaElement> | null, directValue?: string) => {
        let input = directValue;
        if (event) {
            input = event.target.value;
        }
        setPassword(input? input : "");
        if (input === undefined) return;

        if (!isStarted) {
            setIsStarted(true);
            setLevel(1);
            await processLevel(1, input, isCheatUsed);
            return;
        }

        await processLevel(level, input, isCheatUsed);
    };

    const ExtraInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBannedWord(value);
        await processLevel(level, password, isCheatUsed);
    }

    const onScoreChange = (value: number) => {
        SetScore(value);
    }

    return (
        <div className="flex flex-col w-full p-8 items-center gap-y-5">
            <LoadingScreen isVisible={isLoadingCheat}/>
            <div className="flex flex-col text-center items-center justify-center w-full gap-y-5">
                <h1 className="text-4xl font-serif">✶ The Password Game</h1>
                <label className="text-lg">Please choose a password</label>
                <div className="flex gap-4 items-center relative">
                    <div className="flex w-full justify-center">
                        <div
                            className="backdrop rounded-lg border-2 border-black"
                            ref={backdropRef}
                        >
                            <div className="highlights" ref={higlightRef}></div>
                        </div>
                        <textarea
                            onChange={handleChange}
                            placeholder="Enter your password"
                            ref={inputRef}
                            rows={1}
                            value={password}
                            className="rounded-lg border-2 border-black shadow-md"
                        />
                    </div>
                    <label className="text-lg absolute right-[-32px]"> {Array.from(password).length === 0 ? "" : Array.from(password).length} </label>
                </div>
                <FinishScreen win="You win" lose="You lose" state={isWinning} isVisible={isFinished}
                              onClose={() => setIsFinished(false)} score={Score}/>

            </div>
            <div className="flex flex-col text-center items-center justify-center w-full gap-y-5">
                <ScorePassword password={password} onValueChange={onScoreChange}/>
            </div>
            <div className={`flex flex-col text-center items-center justify-center w-full gap-y-5 ${level >= 15 ? "" : "hidden"}`}>
                <label className="text-lg">Enter the banned word</label>
                <input
                    className={`py-2 px-4 w-[450px] rounded-lg border-black border-2 shadow-md`}
                    type="text"
                    placeholder="Enter the banned word"
                    onChange={ExtraInput}
                />
            </div>
            <div>
                <Rules rules={rules} level={level} config={config.config} data={booleanData}/>
            </div>
        </div>
    );
};

export default PlayerInput;