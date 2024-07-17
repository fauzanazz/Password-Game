import React from "react";
import {Progress} from "@nextui-org/progress";

interface ScorePasswordProps {
    password: string;
    onValueChange?: (value: number) => void;
}

const ScorePassword: React.FC<ScorePasswordProps> = (Score) => {
    const [values, setValues] = React.useState(0);
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

        const passwordLength = Array.from(password).length;
        if (possibleSymbols <= 0) return 0;

        return Math.log2(Math.pow(possibleSymbols, passwordLength));
    }

    React.useEffect(() => {
        const entropy = PasswordScorerEntropy(Score.password);
        const scaledValue = entropy / 8;
        setValues(scaledValue);
        Score.onValueChange?.(scaledValue);
    }, [Score.password]);

    return (
        <div className="w-full flex flex-col items-center gap-y-2">
            <Progress
                label="Password Strength"
                size="lg"
                value={values}
                valueLabel={values < 64 ? "Weak" : values < 96 ? "Medium" : "Strong"}
                maxValue={128}
                color={values < 64 ? "danger" : values < 96 ? "warning" : "success"}
                formatOptions={{ style: "decimal" }}
                showValueLabel={true}
                className="max-w-lg"
            />
            <div className="text-center">
                <p className="text-sm">Password Score: {values.toFixed(2)} bits</p>
            </div>
        </div>
    );
}

export default ScorePassword;