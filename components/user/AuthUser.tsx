import React from "react";
import Image from "next/image";
import userBlankLogo from "@/app/assets/svg/userBlankLogo.svg"; // Добавление пути к изображению
import { Skeleton } from "@/components/ui/skeleton"

export default function AuthUser({ userProfile, userSession }: any) {
  return (
    <div className="">
      <h1>Профиль</h1>
      <div className="">
        <Skeleton className="h-9 w-44 rounded-xl" />
        <p>ID: {userProfile?.id ?? "Не найдено"}</p>
        <p>Имя: {userProfile?.name ?? "Не найдено"}</p>
        <p>Email: {userProfile?.email ?? "Не найдено"}</p>
      </div>
      <Image
        src={userProfile?.image || userBlankLogo}
        alt="user profile"
        width={300}
        height={200}
      />

      <p>Сессия: {JSON.stringify(userSession)}</p>
    </div>
  );
}
