import { useEffect } from "react";

const useAutosizeText = (
    textRef: HTMLTextAreaElement | null,
    value: string
) => {
    useEffect(() => {
        if (textRef) {
            textRef.style.height = "auto";
            const scrollHeight = textRef.scrollHeight;
            textRef.style.height = `${Math.min(textRef.scrollHeight, 400)}px`;
        }
    }, [textRef, value]);
};

export default useAutosizeText;