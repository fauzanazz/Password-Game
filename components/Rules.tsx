import { RulesData, RuleCard } from '@/components/RuleCard';

const Rules = ({ rules }: { rules: RulesData[] }) => {
    return (
        <div>
            {rules.map((rule, index) => (
                <RuleCard key={index} index={index} rule={rule} />
            ))}
        </div>
    );
}

export default Rules;