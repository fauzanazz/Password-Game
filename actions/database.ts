"use server"
import {db} from "@/lib/db";

export async function getImageFlag(id: string) {
    const entry = await db.countryFlag.findUnique({
        where: {
            id: id
        }
    });

    if (!entry) {
        return null;
    }

    // Assuming entry.image is a Buffer, convert it to a base64 string
    const base64Image = entry.image.toString('base64');
    return `data:image/jpeg;base64,${base64Image}`;
}

export async function getImageCaptcha(id: string) {
    const entry = await db.captcha.findUnique({
        where: {
            id: id
        }
    });

    if (!entry) {
        return null;
    }

    // Assuming entry.image is a Buffer, convert it to a base64 string
    const base64Image = entry.image.toString('base64');
    return `data:image/jpeg;base64,${base64Image}`;
}

export async function getAnswerCountryFlag(id: string) {
    const entry = await db.countryFlag.findUnique({
        where: {
            id: id
        }
    });

    if (!entry) {
        return null;
    }

    return entry.country;
}

export async function getAnswerCaptcha(id: string) {
    const entry = await db.captcha.findUnique({
        where: {
            id: id
        }
    });

    if (!entry) {
        return null;
    }

    return entry.answer;
}