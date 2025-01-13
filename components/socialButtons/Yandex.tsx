import React from "react";
import Image from "next/image";
import yandexLogo from "@/app/assets/svg/yandex_logo.png";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function YandexLoginButton() {
  const handleYandexLogin = (provider: string) => {

    signIn(provider, {
      callbackUrl: "/user",
    });
  };

  "use client";

  return (
    <Button onClick={() => handleYandexLogin("yandex")}
    className="border" variant={"secondary"}>
      <Image src={yandexLogo} alt="yandex" width={30} height={30} />
      <p>Войти через Яндекс</p>
    </Button>
  );
}
