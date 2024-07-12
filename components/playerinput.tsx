"use client";
import React, {useEffect, useRef, useState} from "react";
import {RulesData} from "@/components/Rules/RuleCard";
import Rules from "@/components/Rules/Rules";
import {PasswordChecker, SessionConfig} from "@/PasswordChecker";
import {configGenerator} from "@/actions/SessionGenerator";
import FinishScreen from "@/components/FinishScreen";
import useAutosizeText from "@/components/AutoSizeText";
import {generateSetRules} from "@/components/Rules/SetRules";
import './playerinput.css';

const PlayerInput = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isWinning, setIsWinning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [config, setConfig] = useState<SessionConfig>({
        passLength: 0,
        sumDigits: 0,
        countryID: "0",
        RomanNumeralMult: 0,
        CaptchaID: "0",
        WormsEaten: 0,
        WormsUpdateRate: 0,
        LetterBanned: "",
        MinimumDigits: 0
    });
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
            setConfig(data);
        };

        fetchData();
    }, []);

    const [isFireLevel, setIsFireLevel] = useState(false);
    const [isEggLevel, setIsEggLevel] = useState(false);
    const [isChickenLevel, setIsChickenLevel] = useState(false);


    useEffect(() => {
        // Exit early if isFireLevel is not true,
        // preventing the interval from being set
        if (!isFireLevel) return;

        let intervalId: NodeJS.Timeout | undefined;
        // Set the interval to update the textarea value
        intervalId = setInterval(() => {
            // FUCNKING!!! will repair later if I found this still makes bugs
            // https://stackoverflow.com/questions/38345372/why-does-a-string-containing-a-single-emoji-like-have-a-length-of-2
            if (inputRef.current == null) return;
            const currentValue = inputRef.current.value;
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
            // Calculate the end index for replacement,
            // ensuring it does not exceed the string's length
            const endIndex = indexFire + 2 < currentValue.length ? indexFire + 3 : indexFire + 2;

            // Replace the character before the "🔥" emoji with "🔥",
            // taking care to handle surrogate pairs
            let newValue = currentValue.substring(0, startIndex) + '🔥' + currentValue.substring(indexFire, currentValue.length);
            // Replace the character after the "🔥" emoji with "🔥",
            // again being mindful of surrogate pairs
            newValue = newValue.substring(0, indexFire + 1) + '🔥' + newValue.substring(endIndex, newValue.length);

            inputRef.current.value = newValue;

            // Bugs fix
            const count = (newValue.match(/🔥/g) || []).length;
            if (count == 2) {
                // Remove last index
                newValue = newValue.substring(0, newValue.length - 1);
                inputRef.current.value = newValue;
            }
            setPassword(newValue);
        }, 1000); // ms

        // Cleanup function to clear the interval when the component unmounts
        // or isFireLevel changes
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isFireLevel]);

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
    }, [backdropRef, higlightRef, booleanData, level]);

    const handleChange = async (event: React.ChangeEvent<HTMLTextAreaElement> | null, directValue?: string) => {
        let input = directValue;
        if (event) {
            input = event.target.value;
        }
        setPassword(input? input : "");

        const preProcessLevel = async (currentLevel: number) => {
            switch (currentLevel) {
                case 10:
                    setIsFireLevel(true);
                    const currentInput = inputRef.current?.value || "";
                    const lastIndex = currentInput.length - 1;
                    if (lastIndex === -1) return;
                    // Replace the last character with a fire emoji
                    const newValue = currentInput.substring(0, lastIndex) + '🔥';
                    inputRef.current!.value = newValue;
                    setPassword(newValue);
                    input = newValue;
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

        const SpecialEndings = () => {
            if (isEggLevel){
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
        const processLevel = async (currentLevel: number) => {

            SpecialEndings();
            if (input === undefined) return;
            const result = await PasswordChecker(input,currentLevel, config);

            if (result == null) return;
            setBooleanData(result);

            for (let i = 1; i <= currentLevel; i++) { // If some level not passed yet, return
                if (!result[i]) {
                    return;
                }
            }

            if (!result[currentLevel]) return;
            if (currentLevel === 21) {
                setIsFinished(true);
                setIsWinning(true);
            } else {
                setLevel(currentLevel + 1);
                // When level up is called, set the next level first before processing
                // If the next level need some special changes to input
                await preProcessLevel(currentLevel + 1);
                await processLevel(currentLevel + 1);
            }
        };

        if (!isStarted) {
            setIsStarted(true);
            setLevel(1);
            await processLevel(1);
            return;
        }

        await processLevel(level);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center relative h-[50%]">
                <h1 className="text-4xl font-serif mb-8">✶ The Password Game</h1>
                <label className="block text-lg mb-2">Please choose a password</label>
                <div className="containerH">
                    <div
                        className="backdrop"
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
                        className=""
                    />

                </div>
                <label className="text-lg ml-2 p-2"> {Array.from(password).length === 0 ? "" : Array.from(password).length} </label>
                <FinishScreen win="You win" lose="You lose" state={isWinning} isVisible={isFinished}
                              onClose={() => setIsFinished(false)}/>
            </div>
            <div className="absolute top-[75%]">
                <Rules rules={rules} level={level} config={config} data={booleanData}/>
            </div>
        </div>
    );
};

export default PlayerInput;