import { z } from "zod"
 
export const LoginSchema = z.object({
  email: z.string().email({ message: "Введите правильный адрес электронной почты" }),
  password: z.string({message: "Введите пароль"}).min(4, { message: "Минимальная длина пароля - 4 символа" }),
})

export const SignupSchema = z.object({
  name: z.string().min(2, { message: "Введите никнейм!" }),
  email: z.string().email(),
  password: z.string().min(4, { message: "Минимальная длина пароля - 4 символа" }),
})
