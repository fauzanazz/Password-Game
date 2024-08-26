import { RulesData, RuleCard } from '@/components/Rules/RuleCard';
import {SessionConfig} from "@/actions/PasswordChecker";
import React, {useEffect} from "react";

const Rules = ({ rules, level, data, onChaptchaReload }: { rules: RulesData[]; level: number; config: SessionConfig; data: Record<number, boolean>; onChaptchaReload: () => void}) => {
    const [orderedRules, setOrderedRules] = React.useState([...rules]);

    useEffect(() => {
        const falseRules = rules.slice(0, level).filter((rule, index) => !data[index + 1]).reverse();
        const trueRules = rules.slice(0, level).filter((rule, index) => data[index + 1]);
        setOrderedRules([...falseRules, ...trueRules]);
    }, [rules, level, data]);

    return (
        <div className="flex flex-col gap-y-3 justify-center">
            {orderedRules.map((rule, index) => {
                const originalIndex = rules.findIndex(originalRule => originalRule.title === rule.title);
                return (
                    <RuleCard key={index} index={index} rule={rule} bool={data[originalIndex + 1]} onCaptchaReload={onChaptchaReload} />
                );
            })}
        </div>
    );
}

export default Rules;