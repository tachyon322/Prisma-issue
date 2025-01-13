"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupSchema } from "@/schemas/authSchema";
import { useState, useTransition } from "react";
import YandexLoginButton from "../socialButtons/Yandex";
import Link from "next/link";
import { registerAction } from "@/actions/register";
import { CardHeader } from "../ui/card";

export default function Register() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    const validatedFields = SignupSchema.safeParse(values);

    if (!validatedFields.success) {
      setError("Invalid fields!");
      return;
    }

    startTransition(() => {
      const { email, password, name } = validatedFields.data;
      registerAction(email, password, name).then((data: any) => {
        setSuccess(data.success || undefined);
        setError(data.error || undefined);

        form.setValue("email", "");
        form.setValue("password", "");
        form.setValue("name", "");
      });
    });
  }

  return (
    <div
      className={`w-[500px] h-auto flex flex-col items-center border-black border rounded-lg shadow-2xl`}
    >
      <CardHeader className="text-center">
        <h1 className="">style32</h1>
        <p>ПРОВОДНИК В МИР МОДЫ</p>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8"
          style={{ width: "300px" }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex ">
                  <p className="text-sm">Никнейм</p>
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl className="flex">
                  <Input
                    placeholder="nagibator812"
                    style={{ marginTop: 0 }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex ">
                  <p className="text-sm">Почта</p>
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl className="flex ">
                  <Input
                    placeholder="viper@example.com"
                    style={{ marginTop: 0 }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex ">
                  <p className="text-sm">Пароль</p>
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl className="flex ">
                  <Input
                    placeholder="********"
                    style={{ marginTop: 0 }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <p>Войти</p>
          </Button>
        </form>
      </Form>

      <div className="flex flex-col items-center space-y-8 my-6">
        <YandexLoginButton />

        <Link href="/login" className="hover:underline">
          <p>Уже зарегистрированы?</p>
        </Link>
      </div>
    </div>
  );
}
