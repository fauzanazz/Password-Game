"use client"

import PlayerInput from "@/components/playerinput";
import React from "react";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function Home() {
    const [difficulty, setDifficulty] = React.useState<Difficulty>(Difficulty.NONE);
    const [username, setUsername] = React.useState<string>("");

    const onDifficultySelect = (difficulty: Difficulty) => {
        setDifficulty(difficulty);
    }

    const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    return (
        <main className="min-h-screen">
            <div
                className={`flex flex-col justify-center items-center min-h-screen ${difficulty === Difficulty.NONE ? `block` : `hidden`}`}>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" placeholder="John Doe" onChange={onUsernameChange}/>
                </div>


                <h1 className="mt-10 text-2xl font-bold text-center">Select Difficulty</h1>
                <div className="flex justify-center gap-x-4 mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => onDifficultySelect(Difficulty.EASY)}
                    >
                        Easy
                    </button>
                    <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => onDifficultySelect(Difficulty.MEDIUM)}
                    >
                        Medium
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => onDifficultySelect(Difficulty.HARD)}
                    >
                        Hard
                    </button>
                </div>
            </div>
            {difficulty !== Difficulty.NONE && <PlayerInput difficulty={difficulty} username={username}/>}
        </main>
    );
}

export enum Difficulty {
    NONE = "none",
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}
