import React from "react";

interface ScorePasswordProps {
    password: string;

}


const ScorePassword : React.FC<ScorePasswordProps> = ({ password }) => {
    const score = 0;
    return (
        <div>
            <h1>Score Password</h1>
            <p>Score: {score}</p>
        </div>
    )
}