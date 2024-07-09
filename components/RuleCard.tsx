export interface RulesData {
    description: string;
}

export const RuleCard = ({ rule, index }: { index: number; rule: RulesData }) => {
    return (
        <div className="bg-white border rounded-lg p-4 w-96 text-left border-b-black">
            <h2 className="text-xl font-semibold mb-2">Rule {index + 1}</h2>
            <h3 className="text-lg font-semibold mb-2">{rule.description}</h3>
        </div>
    );
}