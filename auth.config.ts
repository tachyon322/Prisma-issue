import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import bcrypt from "bcryptjs"
import Yandex from "next-auth/providers/yandex"

import { LoginSchema } from "./schemas/authSchema"
import { getUserByEmail } from "@/data/user"
 
export default { providers: [
  Credentials({
    async authorize(credentials) {
      const validatedFields = LoginSchema.safeParse(credentials);
    
      if (validatedFields.success) {
        const { email, password } = validatedFields.data;
    
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;
    
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user; 
      }
    
      return null;
    }
    
  }),
  Yandex({
    clientId: process.env.YANDEX_CLIENT_ID,
    clientSecret: process.env.YANDEX_CLIENT_SECRET,
  }),
  
] } satisfies NextAuthConfig
