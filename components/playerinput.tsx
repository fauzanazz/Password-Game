"use client";
import React, {useState, ChangeEvent, useRef} from "react";
import useAutosizeText from "@/components/AutoSizeText";

const PlayerInput = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [password, setPassword] = useState<string>("");
    const [level, setLevel] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [passlength, setPasslength] = useState<number>(0);

    useAutosizeText(inputRef.current, password);

    const handleChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isStarted) {
            setIsStarted(true);
        }

        const input = event.target?.value;
        setPassword(input);
        setPasslength(input.length);

        console.log(level);
    }

    return (
        <div>
            <div className="text-center">
                <h1 className="text-4xl font-serif mb-8">✶ The Password Game</h1>
                <label className="block text-lg mb-2">Please choose a password</label>
                <div className="flex justify-center ">
                    <textarea
                        onChange={handleChange}
                        placeholder="Enter your password"
                        ref={inputRef}
                        rows={1}
                        value={password}
                        className="border rounded-lg p-2 w-96"
                    />
                    <label className="text-lg ml-2 p-2"> {passlength === 0 ? "" : passlength} </label>
                </div>
            </div>
        </div>
    );
};

export default PlayerInput;