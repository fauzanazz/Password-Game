import { useEffect } from "react";

const useAutosizeText = (
    textRef: HTMLTextAreaElement | null,
    value: string
) => {
    useEffect(() => {
        if (textRef) {
            textRef.style.height = "0px";
            const scrollHeight = textRef.scrollHeight;
            textRef.style.height = scrollHeight + "px";
        }
    }, [textRef, value]);
};

export default useAutosizeText;