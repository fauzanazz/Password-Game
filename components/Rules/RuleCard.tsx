import Image from "next/image";

export interface RulesData {
    title: string;
    description: string;
    image?: String | null;
}

export const RuleCard = ({ rule, index, bool }: { index: number; rule: RulesData; bool: boolean }) => {
    const image = rule.image ? base64ToBlob(rule.image): null;

    return (
        <div className={`border rounded-lg p-4 w-96 text-left ${bool ? 'bg-green-500' : 'bg-red-500'}`}>
            <h2 className="text-xl font-semibold mb-2">{rule.title}</h2>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold mb-2">{rule.description}</h3>
                {image && <Image src={URL.createObjectURL(image)} alt="rule image" width={150} height={150} className="border-b-black border-2" />}
            </div>
        </div>
    );
}

function base64ToBlob(base64Image: String) {
    const byteCharacters = atob(base64Image.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: 'image/jpeg'});
}