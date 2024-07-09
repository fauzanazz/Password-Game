const lastpattern = (pattern: string): number[] => {
    const last = Array(256).fill(-1);
    for (let i = 0; i < pattern.length; i++) {
        last[pattern.charCodeAt(i)] = i;
    }
    return last;
}
const boyermoore = (text: string, pattern: string): number[] => {
    const patternLength = pattern.length;
    const textLength = text.length;
    const last = lastpattern(pattern);
    const result: number[] = [];
    let i = patternLength - 1;
    let j = patternLength - 1;
    while (i < textLength) {
        if (text[i] === pattern[j]) {
            if (j === 0) {
                result.push(i);
                i += patternLength;
                j = patternLength - 1;
            } else {
                i--;
                j--;
            }
        } else {
            i += patternLength - Math.min(j, 1 + last[text.charCodeAt(i)]);
            j = patternLength - 1;
        }
    }
    return result;
}

export default boyermoore;