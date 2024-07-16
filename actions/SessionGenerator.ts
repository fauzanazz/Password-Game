"use server";

import {db} from "@/lib/db";
import {SessionConfig} from "@/actions/PasswordChecker";

export const configGenerator = async () => {
    const passLength = Math.floor(Math.random() * 5) + 5;
    const sumDigits = Math.floor(Math.random() * 50) + 30;
    const country = await getRandomEntryFlag();
    const countryID = country.id;
    const RomanNumeralMult = (Math.floor(Math.random() * 5) * 5) + 20;
    const Capcha = await getRandomEntryCaptcha();
    const CaptchaID = Capcha.id;
    const WormsEaten = Math.floor(Math.random() * 8) + 1;
    const WormsUpdateRate = (Math.floor(Math.random() * 5) + 1) * 15;
    const RandomBannedWord = Math.floor(Math.random() * 2) + 1;
    const MinimumDigits = Math.floor(Math.random() * 30) + 10;

    const config: SessionConfig = {
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

