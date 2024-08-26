"use server";

import {db} from "@/lib/db";
import {SessionConfig} from "@/actions/PasswordChecker";
import {Difficulty} from "@/app/page";

export const configGenerator = async (difficulty: Difficulty) => {
    let passLength = 0, sumDigits = 0, RomanNumeralMult = 0, WormsEaten = 0, WormsUpdateRate = 0, RandomBannedWord = 0, MinimumDigits = 0;

    switch (difficulty) {
        case "easy":
            passLength = Math.floor(Math.random() * 3) + 3;
            sumDigits = Math.floor(Math.random() * 5) + 10;
            RomanNumeralMult = (Math.floor(Math.random() * 3) * 5) + 10;
            WormsEaten = Math.floor(Math.random() * 5) + 1;
            WormsUpdateRate = (Math.floor(Math.random() * 3) + 1) * 10;
            RandomBannedWord = Math.floor(Math.random() * 2) + 1;
            MinimumDigits = Math.floor(Math.random() * 5) + 3;
            break;
        case "medium":
            passLength = Math.floor(Math.random() * 5) + 5;
            sumDigits = Math.floor(Math.random() * 10) + 20;
            RomanNumeralMult = (Math.floor(Math.random() * 5) * 5) + 20;
            WormsEaten = Math.floor(Math.random() * 8) + 1;
            WormsUpdateRate = (Math.floor(Math.random() * 5) + 1) * 15;
            RandomBannedWord = Math.floor(Math.random() * 2) + 1;
            MinimumDigits = Math.floor(Math.random() * 10) + 5;
            break;
        case "hard":
            passLength = Math.floor(Math.random() * 7) + 7;
            sumDigits = Math.floor(Math.random() * 15) + 30;
            RomanNumeralMult = (Math.floor(Math.random() * 7) * 5) + 30;
            WormsEaten = Math.floor(Math.random() * 10) + 2;
            WormsUpdateRate = (Math.floor(Math.random() * 7) + 1) * 20;
            RandomBannedWord = Math.floor(Math.random() * 3) + 1;
            MinimumDigits = Math.floor(Math.random() * 15) + 7;
            break;
    }

    const country = await getRandomEntryFlag();
    const countryID = country.id;
    const Capcha = await getRandomEntryCaptcha();
    const CaptchaID = Capcha.id;

    const config: SessionConfig = {
        Difficulty: difficulty,
        passLength,
        sumDigits,
        countryID,
        RomanNumeralMult,
        CaptchaID,
        WormsEaten,
        WormsUpdateRate,
        RandomBannedWord,
        BannedWord: "",
        MinimumDigits,
    };

    return config;
}

export async function getRandomEntryFlag() {
    const totalEntries = await db.countryFlag.count();
    const randomIndex = Math.floor(Math.random() * totalEntries);
    const randomEntry = await db.countryFlag.findMany({
        skip: randomIndex,
        take: 1,
    });

    return randomEntry[0];
}

export async function getRandomEntryCaptcha() {
    const totalEntries = await db.captcha.count();
    const randomIndex = Math.floor(Math.random() * totalEntries);
    const randomEntry = await db.captcha.findMany({
        skip: randomIndex,
        take: 1,
    });

    return randomEntry[0];
}

