"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas/authSchema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
      console.error("Authentication Error: ", error); 
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };

        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  return { success: "Login successful!" };
};
