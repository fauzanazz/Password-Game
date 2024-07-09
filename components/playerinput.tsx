"use client";
import {useState} from "react";

const PlayerInput = () => {
    const [password, setPassword] = useState<string>("");
    return (
        <div className="text-center">
            <h1 className="text-4xl font-serif mb-8">✶ The Password Game</h1>
            <label className="block text-lg mb-2">Please choose a password</label>
            <input className="border rounded-lg p-2 w-96" onChange={(e) => setPassword(e.target.value)} />
        </div>
    );
};

export default PlayerInput;