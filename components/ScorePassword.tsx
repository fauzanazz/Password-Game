import React from "react";
import {Progress} from "@/components/ui/progress";

interface ScorePasswordProps {
    password: string;
}

export const PasswordScorerEntropy = (password: string) => {
    let possibleSymbols = 0;

    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    const hasSpaces = /\s/.test(password);
    const hasRepeated = /(.)\1{2,}/.test(password);
    const hasSequential = /(123|abc|qwerty)/i.test(password);

    if (hasLowerCase) possibleSymbols += 26;
    if (hasUpperCase) possibleSymbols += 26;
    if (hasNumbers) possibleSymbols += 10;
    if (hasNonalphas) possibleSymbols += 32;
    if (hasSpaces) possibleSymbols += 1;
    if (hasRepeated) possibleSymbols -= 20;
    if (hasSequential) possibleSymbols -= 20;

    return Math.log2(Math.pow(possibleSymbols, Array.from(password).length));
}

const ScorePassword : React.FC<ScorePasswordProps> = ({ password }) => {

    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        const entropy = PasswordScorerEntropy(password) / 6;
        setValue(entropy);
    }, [password]);

    return (
        <div className="">
            <Progress value={value} max={100} />
            <p className="text-center text-sm text-gray-500">Password Strength</p>
            <p className="text-center text-sm text-gray-500">{value.toFixed(2)} bits</p>
        </div>
    )
}

export default ScorePassword;