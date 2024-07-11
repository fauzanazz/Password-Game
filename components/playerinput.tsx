"use client";
import React, {useState, useRef, useEffect} from "react";
import { RulesData } from "@/components/Rules/RuleCard";
import Rules from "@/components/Rules/Rules";
import { SessionConfig, PasswordChecker } from "@/PasswordChecker";
import { configGenerator } from "@/actions/SessionGenerator";
import FinishScreen from "@/components/FinishScreen";
import useAutosizeText from "@/components/AutoSizeText";
import { generateSetRules } from "@/components/Rules/SetRules";

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
    useAutosizeText(inputRef.current, password);

    useEffect(() => {
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
        // Define the interval ID
        let intervalId: string | number | NodeJS.Timeout | undefined;

        if (inputRef.current) {
            // Set the interval to update the textarea value every 2 seconds
            intervalId = setInterval(() => {
                if (inputRef.current == null) return;

                const currentValue = inputRef.current.value;

                if (isFireLevel) {
                    if (inputRef.current && currentValue.length > 0) {
                        const indexFire = currentValue.indexOf("🔥");
                        if (indexFire !== -1) {
                            const newValue = currentValue.substring(0, indexFire) + currentValue.substring(indexFire + 1);
                            inputRef.current.value = newValue;
                            setPasswordAndTriggerChange(newValue);
                        }
                    }
                }

            }, 1000); // ms
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    const handleChange = async (event: React.ChangeEvent<HTMLTextAreaElement> | null, directValue?: string) => {
        let input = directValue;
        if (event) {
            input = event.target.value;
        }
        setPassword(input? input : "");

        if (!isStarted) {
            setIsStarted(true);
            setLevel(1);
        }

        if (isFireLevel && !input?.match(/🔥/)) {
            setIsFireLevel(false);
        }
        const processLevel = async (currentLevel: number) => {
            if (input == null) return;
            let result = await PasswordChecker(input, currentLevel, config);
            if (result !== null) {

                setBooleanData(result);
                for (let i = 1; i <= currentLevel; i++) { // Kalau masih ada yg salah di nomor sebelumnya jangan proses
                    if (!result[i]) {
                        return;
                    }
                }

                if (result[currentLevel] && input) {
                    setLevel(currentLevel + 1);

                    if (currentLevel === 10) { // Fire level setter
                        setIsFireLevel(true);
                        const randomIndex = Math.floor(Math.random() * input?.length);
                        const newValue = input?.substring(0, randomIndex) + "🔥" + input?.substring(randomIndex + 1);
                        if (inputRef.current)
                            inputRef.current.value = newValue;
                        setPasswordAndTriggerChange(newValue);
                    } else if (currentLevel === 11) { // Egg level setter
                        setIsEggLevel(true);
                    } else if (currentLevel === 14) { // Chicken level setter
                        setIsEggLevel(false);
                        setIsChickenLevel(true);
                    }

                    // Process egg level
                    if (isEggLevel) {
                        if (!input.includes("🥚")) {
                            setIsFinished(true);
                        }
                    }

                    // Process chicken level
                    if (isChickenLevel) {
                        const lengthWorms = input.match(/🐛/g)?.length;
                        if (lengthWorms === undefined || lengthWorms < config.WormsEaten) {
                            setIsFinished(true);
                        }
                    }


                    if (currentLevel + 1 <= 20) {
                        await processLevel(currentLevel + 1);
                    } else {
                        setIsWinning(true);
                        setIsFinished(true);
                    }
                }
            } else {
               console.error("Cheat detected")
            }
        };

        await processLevel(level);
    };

    const setPasswordAndTriggerChange = (newPassword: string) => {
        setPassword(newPassword);
        handleChange(null, newPassword).then(r => r);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center relative h-[50%]">
                <h1 className="text-4xl font-serif mb-8">✶ The Password Game</h1>
                <label className="block text-lg mb-2">Please choose a password</label>
                <div className="flex justify-center">
                    <textarea
                        onChange={handleChange}
                        placeholder="Enter your password"
                        ref={inputRef}
                        rows={1}
                        value={password}
                        className="border rounded-lg p-2 w-96 resize-none"
                    />
                    <label className="text-lg ml-2 p-2"> {password.length === 0 ? "" : password.length} </label>
                </div>
                <FinishScreen win="You win" lose="You lose" state={isWinning} isVisible={isFinished} onClose={()=> setIsFinished(false)}/>
            </div>
            <div className="absolute top-[75%]">
                <Rules rules={rules} level={level} config={config} data={booleanData}/>
            </div>
        </div>
    );
};

export default PlayerInput;