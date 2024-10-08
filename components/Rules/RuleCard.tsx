import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface RulesData {
    title: string;
    description: string;
    image?: String | null;
    isCaptcha?: boolean | null;
}

export const RuleCard = ({ rule, bool, onCaptchaReload }: { index: number; rule: RulesData; bool: boolean ; onCaptchaReload: () => void;}) => {
    const image = rule.image ? base64ToBlob(rule.image): null;
    return (
        <div className={`border-2 rounded-lg p-4 w-[450px] text-left shadow-md ${bool ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}`}>
            <h2 className="text-xl font-semibold">{rule.title}</h2>
            <div className="flex justify-between items-center">
                <h3 className="text-lg">{rule.description}</h3>
                {image && <Image src={URL.createObjectURL(image)} alt="rule image" width={150} height={150} className="border-b-black border-2" />}
            </div>
            {rule.isCaptcha && <Button onClick={onCaptchaReload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Reload</Button>}
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