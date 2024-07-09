export interface SessionConfig {
    passLength: number;
    sumDigits: number;
    countryID: string;
    RomanNumeralMult: number;
    CapchaID: string;
    WormsEaten: number;
    WormsUpdateRate: number;
    LetterBanned: string;
}
export const PasswordChecker = (password: string, level: number, config: SessionConfig, isLooping: boolean): Record<number, boolean> | null => {
    if (isCheatUsed(password)) return null;

    const result: Record<number, boolean> = {};

    if (isLooping) {
        result[level] = Runner(password, level, config);
        return result;
    }

    for (let i = 1; i <= level; i++) {
        result[i] = Runner(password, i, config);
    }

    return result;
};

const Runner = (password: string, level: number, config: SessionConfig) => {
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
            return level11(password);
        case 12:
            return level12(password, config.CapchaID);
        case 13:
            return level13(password);
        case 14:
            return level14(password, config.WormsEaten, config.WormsUpdateRate);
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
    return password.length >= length;
}

const level2 = (password: string) => {
    // Password must contain at least one number
    return true;
}

const level3 = (password: string) => {
    // Password must contain at least one uppercase letter
    return true;
}

const level4 = (password: string) => {
    // Password must contain at least one special character
    return true;
}

const level5 = (password: string, sum: number) => {
    // The digits in your password must add up to X
    let digits = password.match(/\d+/g);
    let sumDigits = 0;
    if (digits) {
        digits.forEach((digit) => {
            sumDigits += parseInt(digit);
        });
    }
    return sumDigits === sum;
}

const level6 = (password: string) => {
    // Password must include a month of the year
    return true;
}

const level7 = (password: string) => {
    // Password must include a Roman numeral
    return true;
}

const level8 = (password: string, countryID: string) => {
    // Password must include one of this country
    return true;
}

const level9 = (password: string, product: number) => {
    // The Roman numerals in your password should multiply to X
    return true;
}

const level10 = (password: string) => {
    // 🥚Oh no! Your password is on fire 🔥. Quick, put it out!
    return true;
}

const level11 = (password: string) => {
    //🥚 This is my chicken Paul. He hasn’t hatched yet. Please put him in your password and keep him safe
    return true;
}

const level12 = (password: string, CaptchaID: string) => {
    // Your password must include this CAPTCHA
    return true;
}

const level13 = (password: string) => {
    // Your password must include a leap year
    return true;
}

const level14 = (password: string, X: number, Y: number) => {
    // 🐔 Paul has hatched ! Please don’t forget to feed him. He eats X 🐛 every Y second
    return true;
}

const level15 = (password: string, number: string) => {
    // A sacrifice must be made. Pick X letters that you will no longer be able to use
    return true;
}

const level16 = (password: string) => {
    // Your password must contain one of the following words: I want IRK | I need IRK | I love IRK
    return true;
}

const level17 = (password: string) => {
    // At least X% of your password must be in digits
    return true;
}

const level18 = (password: string) => {
    // Your password must include the length of your password
    return true;
}

const level19 = (password: string) => {
    // The length of your password must be a prime number
    return true;
}

const level20 = (password: string) => {
    // Your password must include the current time
    return true;
}


export default PasswordChecker;

