"use server"

import { connection } from "mongoose";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";
import { getCurrentMonthRange } from "../utils";
import { endOfDay, startOfDay } from "date-fns";


export async function getAllUsers() {
    try {
        await connectToDB();

        const users = await User.find({}).lean();

        if (users.length === 0) return [];

        return JSON.parse(JSON.stringify(users));

    } catch (error) {
        throw error;
    }
}



export async function fetchUserById(userId: string) {
    try {
        await connectToDB();

        const user = await User.findById(userId).lean();

        if (!user) throw new Error(`User ${userId} not found`);

        return JSON.parse(JSON.stringify(user));

    } catch (error) {
        throw error;
    }
}

export async function countAllUsers() {
    try {
        await connectToDB();

        const totalUsers = await User.countDocuments({});

        return totalUsers;

    } catch (error) {
        throw error;
    }
}
export async function getActiveUsersForCurrentMonth() {
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();
    await connectToDB();

    // Find users who are active and logged in during the current month
    const activeUsersCount = await User.countDocuments({
        isActive: true,
        lastLogin: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return activeUsersCount;
}


export async function getSignUpsForCurrentMonth() {
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();
    await connectToDB();
    // Find users who were created in the current month
    const signUpsCount = await User.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return signUpsCount;
}


export async function getSignInsForCurrentMonth() {
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();
    await connectToDB();
    // Find users who logged in during the current month
    const signInsCount = await User.countDocuments({
        lastLogin: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return signInsCount;
}

export async function getSignInForToday() {
    try {
        await connectToDB();
        const today = new Date();

        // Define the start and end of the day
        const startOfToday = startOfDay(today);
        const endOfToday = endOfDay(today);

        // Query users whose `updatedAt` (login time) is today
        const users = await User.find({
            lastLogin: {
                $gte: startOfToday,
                $lte: endOfToday
            }
        });

        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        throw error
    }
}

export async function getSignUpForToday() {
    try {
        const today = new Date();
        await connectToDB()
        // Define the start and end of the day
        const startOfToday = startOfDay(today);
        const endOfToday = endOfDay(today);

        // Query users created today
        const users = await User.find({
            createdAt: {
                $gte: startOfToday,
                $lte: endOfToday
            }
        });

        if (users.length === 0) return [];

        return JSON.parse(JSON.stringify(users));

    } catch (error) {
        throw error
    }
}