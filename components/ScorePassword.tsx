import React from "react";
import {Progress} from "@nextui-org/progress";

interface ScorePasswordProps {
    password: string;

}
const ScorePassword : React.FC<ScorePasswordProps> = ({ password }) => {

    const [value, setValue] = React.useState(0);
    const PasswordScorerEntropy = (password: string) => {
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

    React.useEffect(() => {
        const entropy = PasswordScorerEntropy(password) / 6;
        setValue(entropy);
    }, [password]);

    return (
        <Progress
            label="Password Strength"
            size="lg"
            value={value}
            maxValue={128}
            color={value < 64 ? "danger" : value < 96 ? "warning" : "success"}
            formatOptions={{style: "decimal"}}
            showValueLabel={true}
            className="max-w-md"
        />
    )
}

export default ScorePassword;