"use server";

import bcrypt from "bcrypt";
import { db } from "@/db";
import { getUserByEmail } from "@/data/user";

export const registerAction = async (email: string, password: string, name: string) => {
    const hashPassword = await bcrypt.hash(password, 10);
    
    const existingUser = await getUserByEmail(email);
    if (existingUser) return { error: "This email taken!" }

    await db.user.create({
        data: {
            email,
            name,
            password: hashPassword
        }
    });

    return { success: "User Created!" };
}
