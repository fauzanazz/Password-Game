import { getAnswerCaptcha, getAnswerCountryFlag } from "@/actions/database";
import KMP from "@/Algorithm/StringMatching/KMP";
import Boyermoore from "@/Algorithm/StringMatching/boyermoore";


export interface SessionConfig {
    passLength: number;
    sumDigits: number;
    countryID: string;
    RomanNumeralMult: number;
    CaptchaID: string;
    WormsEaten: number;
    WormsUpdateRate: number;
    MinimumDigits: number;
    LetterBanned: string;
}
const debuggingMode = true;
export const PasswordChecker = async (password: string, level: number, config: SessionConfig): Promise<Record<number, boolean> | null> => {
    if (isCheatUsed(password)) return null;

    const result: Record<number, boolean> = {};

    for (let i = 1; i <= level; i++) {
        result[i] = await Runner(password, i, level, config);
    }

    return result;
};

const Runner = (password: string, level: number, currentLevel: number, config: SessionConfig) => {
    switch (level) {
        case 1:
            return level1(password, config.passLength);
        case 2:
            return level2(password);
        case 3:
            return level3(password);
        case 4:
            return level4(password);
        case 5:
            return level5(password, config.sumDigits);
        case 6:
            return level6(password);
        case 7:
            return level7(password);
        case 8:
            return level8(password, config.countryID);
        case 9:
            return level9(password, config.RomanNumeralMult);
        case 10:
            return level10(password);
        case 11:
            return level11(password, currentLevel);
        case 12:
            return level12(password, config.CaptchaID);
        case 13:
            return level13(password);
        case 14:
            return level14(password, config.WormsEaten, currentLevel);
        case 15:
            return level15(password, config.LetterBanned);
        case 16:
            return level16(password);
        case 17:
            return level17(password);
        case 18:
            return level18(password);
        case 19:
            return level19(password);
        case 20:
            return level20(password);
        default:
            return false;
    }
}

const isCheatUsed = (password: string) => {
    // Password must not contain the word "cheat"
    return password.toLowerCase().includes("cheat");
}

const level1 = (password: string, length: number) => {
    // Password must be at least X characters long
    return Array.from(password).length >= length;
}

const level2 = (password: string) => {
    // Password must contain at least one number
    return /\d/.test(password);
}

const level3 = (password: string) => {
    // Password must contain at least one uppercase letter
    return /[A-Z]/.test(password);
}

const level4 = (password: string) => {
    // Password must contain at least one special character
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
}

const level5 = (password: string, sum: number) => {
    if (debuggingMode) return true;
    // The digits in your password must add up to X
    const digits = password.match(/\d/g);
    const sumDigits = digits ? digits.reduce((acc, digit) => acc + parseInt(digit), 0) : 0;
    return sumDigits === sum;
}

const level6 = (password: string) => {
    // Password must include a month of the year
    return password.toLowerCase().match(/january|february|march|april|may|june|july|august|september|october|november|december/) !== null;
}

const level7 = (password: string) => {
    // Password must include a Roman numeral
    return password.match(/[IVXLCDM]/) !== null;
}

const level8 = async (password: string, countryID: string) => {
    if (debuggingMode) return true;
    // Password must include one of this country
    const answer = await getAnswerCountryFlag(countryID);
    if (!answer) return false;
    const passwordLower = password.toLowerCase();
    console.log(passwordLower, answer)
    const kmp = await KMP(passwordLower, answer.toLowerCase());
    console.log(kmp);
    return kmp != -1;
}

const level9 = (password: string, product: number) => {
    if (debuggingMode) return true;
    // The Roman numerals in your password should multiply to X
    const romanNumerals = password.match(/[IVXLCDM]+/g);
    let productRoman = 1;

    function romanToNumber(roman: string) {
        const romanMap: Record<string, number> = {
            'I': 1,
            'V': 5,
            'X': 10,
            'L': 50,
            'C': 100,
            'D': 500,
            'M': 1000
        };

        let result = 0;
        let prev = 0;

        for (let i = roman.length - 1; i >= 0; i--) {
            let current = romanMap[roman[i]];

            if (current < prev) {
                result -= current;
            } else {
                result += current;
            }

            prev = current;
        }

        return result;
    }

    if (romanNumerals) {
        romanNumerals.forEach((roman) => {
            productRoman *= romanToNumber(roman);
        });
    }

    return productRoman === product
}

const level10 = (password: string) => {
    // Oh no! Your password is on fire 🔥. Quick, put it out!
    const boyerMoore = Boyermoore(password,"🔥" );
    return boyerMoore[0] !== -1;
}

const level11 = (password: string, currentLevel: number) => {
    //🥚 This is my chicken Paul. He hasn’t hatched yet. Please put him in your password and keep him safe
    console.log(currentLevel);
    return password.includes("🥚") || currentLevel >= 14;
}

const level12 = async (password: string, CaptchaID: string) => {
    // Your password must include this CAPTCHA
    const answer = await getAnswerCaptcha(CaptchaID);
    if (!answer) return false;
    const kmp = await KMP(password, answer);
    return kmp != -1;
}

const level13 = (password: string) => {
    // Your password must include a leap year
    const year = password.match(/\d+/g);
    if (!year) return false;

    for (let i = 0; i < year.length; i++) {
        if (parseInt(year[i]) % 4 === 0) {
            if (parseInt(year[i]) % 100 === 0) {
                if (parseInt(year[i]) % 400 === 0) {
                    return true;
                }
            } else {
                return true;
            }
        }
    }

    return false;
}

const level14 = (password: string, X: number, currentLevel: number) => {
    const worms = password.match(/🐛/g);
    if (!worms) return false;
    return worms.length >= X || currentLevel >= 15;
}

const level15 = (password: string, number: string) => {
    // A sacrifice must be made. Pick X letters that you will no longer be able to use
    return true;
}

const level16 = (password: string) => {
    // Your password must contain one of the following words: I want IRK | I need IRK | I love IRK
    const words = ["I want IRK", "I need IRK", "I love IRK"];
    return words.some(word => password.includes(word));
}

const level17 = (password: string) => {
    // At least X% of your password must be in digits
    if (debuggingMode) return true;
    const digits = password.match(/\d/g);
    if (!digits) return false;
    return digits.length / password.length >= 0.01;
}

const level18 = async (password: string) => {
    // Your password must include the length of your password
    if (debuggingMode) return true;
    const length = Array.from(password).length.toString();
    const kmp = await KMP(password, length);
    return kmp != -1;
}

const level19 = (password: string) => {
    // The length of your password must be a prime number
    if (debuggingMode) return true;
    const length =Array.from(password).length;
    if (length <= 1) return false;
    for (let i = 2; i <= Math.sqrt(length); i++) {
        if (length % i === 0) return false;
    }
    return true;
}

const level20 = async (password: string) => {
    // Your password must include the current time
    const time = new Date().toLocaleTimeString();
    console.log(time)
    const kmp = await KMP(password, time);
    return kmp != -1;
}


export default PasswordChecker;

