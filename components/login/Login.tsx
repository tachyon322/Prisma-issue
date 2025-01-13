"use client";

import React from "react";
import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import YandexLoginButton from "../socialButtons/Yandex";
import { loginAction } from "@/actions/login";

export default function Login() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(() => {
      loginAction(values)
      .then((data) => {

        setError(data.error || undefined)
      })
    })
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8" style={{width: "300px"}} >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex ">
                  <p className="text-sm">Почта</p>
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl className="flex">
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

      <div className="my-6 flex flex-col items-center space-y-8">
        <YandexLoginButton />

        <Link href={"/register"} className="hover:underline">
            <p>Нет аккаунта? Зарегистрируйтесь</p>
        </Link>
      </div>
    </div>
  );
}
