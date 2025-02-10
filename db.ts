import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const url = process.env.DATABASE_URL;



export const db = new PrismaClient().$extends(withAccelerate())
