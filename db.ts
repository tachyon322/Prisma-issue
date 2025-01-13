import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = global.prisma || new PrismaClient();

const main = async () => {
    await db.$connect();

}

if (process.env.NODE_ENV !== "production") global.prisma = db;

main();