import {SessionConfig} from "@/actions/PasswordChecker";
import { getImageFlag, getImageCaptcha } from "@/actions/database";

export const generateSetRules = async (config : SessionConfig ) => {
    const rules = [
        {
            title: "Rule 1",
            description: () => `Your password must be at least ${config.passLength} characters`
        },
        {
            title: "Rule 2",
            description: () => `Your password must include a number`
        },
        {
            title: "Rule 3",
            description: () => `Your password must include an uppercase letter`
        },
        {
            title: "Rule 4",
            description: () => `Your password must include a special character`
        },
        {
            title: "Rule 5",
            description: () => `The digits in your password must add up to ${config.sumDigits}`
        },
        {
            title: "Rule 6",
            description: () => `Your password must include a month of the year`
        },
        {
            title: "Rule 7",
            description: () => `Your password must include a Roman numeral`
        },
        {
            title: "Rule 8",
            description: () => `Your password must include one of this country`,
            image: await getImageFlag(config.countryID)
        },
        {
            title: "Rule 9",
            description: () => `The Roman numerals in your password should multiply to ${config.RomanNumeralMult}`
        },
        {
            title: "Rule 10",
            description: () => `Oh no! Your password is on fire 🔥. Quick, put it out!`
        },
        {
            title: "Rule 11",
            description: () => `🥚 This is my chicken Paul. He hasn’t hatched yet. Please put him in your password and keep him safe`
        },
        {
            title: "Rule 12",
            description: () => `Your password must include this CAPTCHA`,
            image: await getImageCaptcha(config.CaptchaID),
            isCaptcha: true
        },
        {
            title: "Rule 13",
            description: () => `Your password must include a leap year`
        },
        {
            title: "Rule 14",
            description: () => `🐔 Paul has hatched ! Please don’t forget to feed him. He eats ${config.WormsEaten} 🐛 every ${config.WormsUpdateRate} second`
        },
        {
            title: "Rule 15",
            description: () => `A sacrifice must be made. Pick ${config.RandomBannedWord} letters that you will no longer be able to use`
        },
        {
            title: "Rule 16",
            description: () => `Your password must contain one of the following words: I want IRK | I need IRK | I love IRK`
        },
        {
            title: "Rule 17",
            description: () => `At least ${config.MinimumDigits}% of your password must be in digits`
        },
        {
            title: "Rule 18",
            description: () => `Your password must include the length of your password`
        },
        {
            title: "Rule 19",
            description: () => `The length of your password must be a prime number`
        },
        {
            title: "Rule 20",
            description: () => `Your password must include the current time "HH:MM:SS"`
        },
    ];

    return rules;
}