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

export interface leaderboardItem {
    rank: number;
    name: string;
    score: number | null;
    level: string;
}

export interface addLeaderboardItem {
    username: string;
    userId?: string;
    score: number;
    mode: string;
}

export async function addLeaderboard(data: addLeaderboardItem) {
    if (data.userId == null) {
        const user = await getUser(data.username);
        if (user == null) {
            console.error(`User with username ${data.username} not found.`);
            return;
        }
        data.userId = user.id;
    }

    try {
        await db.score.create({
            data: {
                score: data.score,
                mode: data.mode,
                username: data.username,
                userId: data.userId
            }
        });
        console.log('Added to leaderboard');
    } catch (error) {
        console.error('Error adding to leaderboard:', error);
    }
}

export async function getUser(username: string) {
    const user = await db.user.findFirst({
        where: {
            username: username
        }
    });

    if (user == null) {
        console.log('User not found, creating new user')
        await db.user.create({
            data: {
                username: username
            }
        });

        return db.user.findFirst({
            where: {
                username: username
            }
        });
    }

    console.log('User found')
    return user;
}

export async function getLeaderboard() {
    const leaderboard = await db.score.groupBy({
        by: ['userId', 'mode'],
        _max: {
            score: true
        },
        orderBy: {
            _max: {
                score: 'desc'
            }
        },
        take: 10
    });

    const formattedLeaderboard = await Promise.all(leaderboard.map(async (item, index) => {
        const user = await db.user.findUnique({
            where: {
                id: item.userId
            }
        });

        const data =  {
            rank: index + 1,
            name: user ? user.username : 'Unknown',
            score: item._max.score,
            level: item.mode
        }

        return data;
    }));

    return formattedLeaderboard;
}