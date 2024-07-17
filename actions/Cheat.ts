"use server"

import PasswordChecker, {romanToNumber, SessionConfig} from "@/actions/PasswordChecker";
import {getAnswerCaptcha, getAnswerCountryFlag} from "@/actions/database";

// Cheat for 20 Level No Difficulty
// 7/14/2024

export interface ConfigWrapper {
    config: SessionConfig;
}
const CheatGenerator = async (password: string, configWrapper: ConfigWrapper, letterBanned: string) => {

    const regex = /cheat/gi;
    password = password.replace(regex, "");

    const regexFire = /🔥/gi;
    password = password.replace(regexFire, "");

    const config = configWrapper.config;

    do {
        const result = await PasswordChecker(password, 20, config, letterBanned, true, false);

        if (result === null) {
            break;
        }

        const level = IsAllFinished(result, configWrapper);
        if (level === -1) {
            break;
        }

        password = await FixPassword(password, level, configWrapper, letterBanned);
    } while (true);

    return password;
}

const FixPassword = async (password: string, level: number, ConW: ConfigWrapper, letterBanned: string) => {
    const config = ConW.config;
    switch (level) {
        case 1:
            return FixLevel1(password, config.passLength);
        case 2:
            return FixLevel2(password);
        case 3:
            return FixLevel3(password, letterBanned);
        case 4:
            return FixLevel4(password);
        case 5:
            return FixLevel5(password, ConW);
        case 6:
            return FixLevel6(password, letterBanned);
        case 7:
            return FixLevel7(password, letterBanned);
        case 8:
            return FixLevel8(password, config.countryID);
        case 9:
            return FixLevel9(password, config.RomanNumeralMult);
        case 10:
            return FixLevel10(password);
        case 11:
            return FixLevel11(password);
        case 12:
            return FixLevel12(password, config.CaptchaID);
        case 13:
            return FixLevel13(password);
        case 14:
            return FixLevel14(password);
        case 15:
            return FixLevel15(password, letterBanned, config.RandomBannedWord);
        case 16:
            return FixLevel16(password);
        case 17:
            return FixLevel17(password, config.MinimumDigits);
        case 18:
            return FixLevel18(password);
        case 19:
            return FixLevel19(password);
        case 20:
            return FixLevel20(password);
        default:
            return password;
    }
}
const FixLevel1 = (password: string, passLength: number) => {
    while (password.length < passLength) {
        password += " ";
    }
    return password;
}

const FixLevel2 = (password: string) => {
    password += "0";
    return password;
}

const FixLevel3 = (password: string, bannedLetter: string) => {
    let CharPossible = ["A", "B", "E", "F", "G", "H", "J", "K", "L", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "Y", "Z"];
    CharPossible = CharPossible.filter((char) => char !== bannedLetter);
    password += CharPossible[0];
    return password;
}

const FixLevel4 = (password: string) => {
    const SpecialChar = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "{", "}", "[", "]", "|", ":", ";", "'", '"', "<", ">", ",", ".", "?", "/", "`", "~"];
    password += SpecialChar[Math.floor(Math.random() * SpecialChar.length)];
    return password;
}

const FixLevel5 = async (password: string, config: ConfigWrapper) => {
    const ArrayPassword = password.split("");
    let TargetDigits = config.config.sumDigits;
    let sum = 0;
    ArrayPassword.forEach((char) => {
        if (!isNaN(parseInt(char))) {
            sum += parseInt(char);
        }
    });

    const possibleNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Case 1 :sum > TargetDigits
    if (sum > TargetDigits) {
        TargetDigits = sum + await FindDifferenceTarget(ArrayPassword, TargetDigits);
        config.config.sumDigits = TargetDigits;
    }

    while (sum < TargetDigits) {
        const BiggestNumber = possibleNumber[possibleNumber.length - 1];

        if (BiggestNumber + sum > TargetDigits) {
            possibleNumber.pop();
            continue;
        }

        password += BiggestNumber;
        sum += BiggestNumber;
    }

    console.log(`Sum : ${sum} Target : ${TargetDigits} Password : ${password} `);
    return password;
}

export const FindDifferenceTarget = async (ArrayPassword: string[], TargetDigits: number) => {
    const LengthOfAddedPassword = FindHowMuchDigitToAdd(TargetDigits);
    const NextAssumedPrime = FindClosestPrime(ArrayPassword.length + LengthOfAddedPassword);
    const ArrayFuturePrime = Array.from(NextAssumedPrime.toString());
    let AddedFuturePrime = 0;

    for (let i = 0; i < ArrayFuturePrime.length; i++) {
        AddedFuturePrime += parseInt(ArrayFuturePrime[i]);
    }

    return AddedFuturePrime + 2;
}



const FindClosestPrime = (num: number) => {
    let i = num;
    while (true) {
        if (isPrime(i)) {
            return i;
        }
        i++;
    }
}

const FindHowMuchDigitToAdd = (TargetDigits: number) => {
    let sum = 0;
    const possibleNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let ret = 0;

    while (sum < TargetDigits) {
        const BiggestNumber = possibleNumber[possibleNumber.length - 1];

        if (BiggestNumber + sum > TargetDigits) {
            possibleNumber.pop();
            continue;
        }
        ret++;
        sum += BiggestNumber;
    }

    return ret;
}



const FixLevel6 = (password: string, bannedChar: string) => {
    const month = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const MonthPossible = month.filter((char) => char !== bannedChar);
    password += MonthPossible[0];
    return password;
}

const FixLevel7 = (password: string, bannedchar: string) => {
    const romanNumeral = ["I", "V", "X", "L", "C", "D", "M"];
    const RomanPossible = romanNumeral.filter((char) => char !== bannedchar);
    password += RomanPossible[0];
    return password;

}

const FixLevel8 = async (password: string, countryID: string) => {
    const Answer = await getAnswerCountryFlag(countryID)
    if (Answer === null) {
        console.log("Error Not found Database");
        return password;
    }
    password += Answer.toLowerCase();

    return password;
}

const FixLevel9 = (password: string, RomanNumeralMult: number) => {
    const romanNumerals = password.match(/[IVXLCDM]+/g);
    let productRoman = 1;
    const ArrayPassword = password.split("");


    if (romanNumerals) {
        romanNumerals.forEach((roman) => {
            productRoman *= romanToNumber(roman);
        });
        console.log(RomanNumeralMult, productRoman);
    } else {
        // Case 1 : no RomanNumeral found
        // Just add RomanNumeral

        const RomanAdded = arabicToRoman(RomanNumeralMult);
        password += RomanAdded;
        return password;
    }

    // Case 2 : productRoman / RomanNumeralMult is not integer or productRoman > RomanNumeralMult
    if (productRoman % RomanNumeralMult !== 0 || productRoman > RomanNumeralMult) {
        const regex = /[IVXLCDM]+/g;
        password = ArrayPassword.filter((char) => !regex.test(char)).join("");
        productRoman = 1;
        const RomanAdded = arabicToRoman(RomanNumeralMult);
        password += RomanAdded;
        return password;
    }

    // Case 3 : productRoman < RomanNumeralMult
    if (productRoman < RomanNumeralMult) {
        const RomanAdded = arabicToRoman(RomanNumeralMult / productRoman);
        password += RomanAdded;
        return password;
    }

    return password;
}

const arabicToRoman = (num: number): string => {
    const arabicNumeralMap: Record<number, string> = {
        1000: 'M',
        900: 'CM',
        500: 'D',
        400: 'CD',
        100: 'C',
        90: 'XC',
        50: 'L',
        40: 'XL',
        10: 'X',
        9: 'IX',
        5: 'V',
        4: 'IV',
        1: 'I'
    };

    let roman = "";
    const keys = Object.keys(arabicNumeralMap).map(Number).sort((a, b) => b - a);

    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        const value = arabicNumeralMap[key];

        while (num >= key) {
            num -= key;
            roman += value;
        }
    }

    return roman;
};

const FixLevel10 = (password: string) => {
    const ArrayPassword = password.split("");
    return ArrayPassword.filter((char) => char !== "🔥").join("");
}

const FixLevel11 = (password: string) => {
    // NO need to be fixed
    return password
}

const FixLevel12 = async (password: string, CaptchaID: string) => {
    let ArrayPassword = password.split("");
    const Answer = await getAnswerCaptcha(CaptchaID);
    if (Answer === null ){
        console.log("Error Not found Database");
        return password;
    }
    ArrayPassword = ArrayPassword.concat(Answer.toLowerCase().split(""));
    return ArrayPassword.join("");
}

const FixLevel13 = (password: string) => {
    password += '0';
    return password;
}

const FixLevel14 = (password: string) => {
    // NO need to be fixed
    return password;
}

const FixLevel15 = (password: string, letterBanned: string, RandomBannedWord: number) => {
    const ArrayPassword = password.split("");
    const CharPossible = ["A", "B", "E", "F", "G", "H", "J", "K", "L", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "Y", "Z"];
    const CharBanned = CharPossible.filter((char) => char !== letterBanned);
    for (let i = 0; i < RandomBannedWord; i++) {
        ArrayPassword.concat(CharBanned[i]);
    }
    return ArrayPassword.join("");
}

const FixLevel16 = (password: string) => {
    password += " I want IRK "
    return password;
}

const FixLevel17 = (password: string, MinimumDigits: number) => {
    const ArrayPassword = password.split("");
    const Digit = ArrayPassword.filter((char) => !isNaN(parseInt(char))).length;
    let DigitPercentage = (Digit / ArrayPassword.length) * 100;
    while (DigitPercentage < MinimumDigits) {
        ArrayPassword.concat("0");
        DigitPercentage = (Digit / ArrayPassword.length) * 100;
    }
    return ArrayPassword.join("");
}

const FixLevel18 = (password: string) => {
    const ArrayPassword = password.split("");
    password += (ArrayPassword.length + 2);
    return password;
}

const FixLevel19 = (password: string) => {

    while (!isPrime(Array.from(password).length + 2)){
        password += '0';
    }
    return password;
}

const isPrime = (num: number) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

const FixLevel20 = (password: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    return `${password} ${time} `;
}
const IsAllFinished = (result: Record<number, boolean>, configWrapper: ConfigWrapper) => {
    // Check problematik level
    if (!result[12]){
        console.log("Level 12 is not finished");
        return 12;
    }

    for (let i = 1; i <= 20; i++) {
        if (!result[i] && i !== 5 && i !== 18 && i !== 19 && i !== 14 && i !== 15) {
            console.log(`Level ${i} is not finished`);
            return i;
        }
    }

    if (!result[5]){
        // Max possible if clock at the max 2 + 3 + 5 + 9 + 5 + 9 = 33
        // Max possible captcha 13
        // Max estimation password length = 99, kalo nyampe 3 digit trolling bro don't use cheat
        configWrapper.config.sumDigits = 33 + 13 + 9 + 9;
        console.log("Level 5 is not finished");
        return 5;
    }

    if (!result[19]){
        console.log("Level 19 is not finished");
        return 19;
    }

    if (!result[18]){
        console.log("Level 18 is not finished");
        return 18;
    }

    return -1;
}

export default CheatGenerator;