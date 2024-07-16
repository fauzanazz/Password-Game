import { RulesData, RuleCard } from '@/components/Rules/RuleCard';
import {SessionConfig} from "@/actions/PasswordChecker";

const Rules = ({ rules, level, data }: { rules: RulesData[]; level: number; config: SessionConfig; data: Record<number, boolean> }) => {
    const falseRules = rules.slice(0, level).filter((rule, index) => !data[index + 1]).reverse();
    const trueRules = rules.slice(0, level).filter((rule, index) => data[index + 1]);

    const orderedRules = [...falseRules, ...trueRules];

    return (
        <div className="flex flex-col gap-y-3 justify-center">
            {orderedRules.map((rule, index) => {
                const originalIndex = rules.findIndex(originalRule => originalRule.title === rule.title);
                return (
                    <RuleCard key={index} index={index} rule={rule} bool={data[originalIndex + 1]} />
                );
            })}
        </div>
    );
}

export default Rules;