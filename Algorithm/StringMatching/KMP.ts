const makeKMPTable = (pattern: string) => {
    const table = Array(pattern.length).fill(0);
    let prefixIndex = 0;
    for (let i = 1; i < pattern.length; i++) {
        while (prefixIndex > 0 && pattern[i] !== pattern[prefixIndex]) {
            prefixIndex = table[prefixIndex - 1];
        }
        if (pattern[i] === pattern[prefixIndex]) {
            prefixIndex++;
        }
        table[i] = prefixIndex;
    }
    return table;
};

const KMP = async (text: string, pattern: string) => {
    if (pattern === "") return 0; // Edge case if pattern is empty
    const kmpTable = makeKMPTable(pattern);
    let textIndex = 0;
    let patternIndex = 0;
    while (textIndex < text.length) {
        if (text[textIndex] === pattern[patternIndex]) {
            textIndex++;
            patternIndex++;
            if (patternIndex === pattern.length) {
                return textIndex - patternIndex; // Match found
            }
        } else if (patternIndex > 0) {
            patternIndex = kmpTable[patternIndex - 1];
        } else {
            textIndex++;
        }
    }
    return -1; // No match found
};

export default KMP;