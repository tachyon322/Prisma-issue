import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import userBlankLogo from "@/app/assets/svg/userBlankLogo.svg"; // Добавление пути к изображению
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "../ui/separator";
import { UserProfile, UserSession } from "@/types";
import { Button } from "../ui/button";
import { fetchUserSubscriptions } from "@/data/user";

export default function AuthUser({
  userProfile,
  userSession,
}: {
  userProfile: UserProfile | null;
  userSession: UserSession | null;
}) {
  const isLoading = !userProfile; // Определяем, загружаются ли данные

  useEffect(() => {
    const loadData = async () => {
      console.log("достаем подписки: ", userProfile?.id);
      const subs = await fetchUserSubscriptions(userProfile?.id as string);
      console.log(subs);
    };

    loadData();
  }, []);

  return (
    <div className="">
      <h1>Профиль</h1>

      <div className="flex mt-8">
        <Image
          className="rounded-full"
          src={isLoading ? userBlankLogo : userProfile?.image || userBlankLogo}
          alt="user profile"
          width={150}
          height={150}
        />

        <div className="flex flex-col justify-center w-full">
          {isLoading ? (
            <div className="">
              <Skeleton className="h-5 w-40 ml-3" />
              <Separator className="my-2 w-max" />
              <Skeleton className="h-5 w-56 ml-3" />
            </div>
          ) : (
            <div className="">
              <div className="flex items-center gap-3">
                <h2 className="ml-3">{userProfile?.name ?? "Не найдено"}</h2>
                {userSession?.user == null || userSession?.user?.id === userProfile?.id ? (
                  <div className="">
                    
                  </div>
                ) : (
                  <Button size={"sm"} className="mt-1">
                    Подписаться
                  </Button>
                )}
              </div>
              <Separator className="h-[2px] bg-black rounded-full" />

              <div className="flex">
                <h2 className="ml-3">{userProfile?.email ?? "Не найдено"}</h2>
                <h2></h2>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
          Сессия:{" "}
          {isLoading ? (
            <Skeleton className="h-5 w-full" />
          ) : (
            JSON.stringify(userSession)
          )}
      </div>
    </div>
  );
}

{
  /* <div className="">
<div>
  <span>ID: {isLoading ? <Skeleton className="h-5 w-32" /> : userProfile?.id ?? "Не найдено"}</span>
</div>
<div>
  <span>Имя: {isLoading ? <Skeleton className="h-5 w-32" /> : userProfile?.name ?? "Не найдено"}</span>
</div>
<div>
  <span>Email: {isLoading ? <Skeleton className="h-5 w-32" /> : userProfile?.email ?? "Не найдено"}</span>
</div>
</div> */
}
