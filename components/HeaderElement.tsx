"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/svg/logo.svg";
import userBlankLogo from "@/app/assets/svg/userBlankLogo.svg";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { fetchUserSession } from "@/data/user";
import { UserSession } from "@/types";

export default function HeaderElement() {
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const sessionData = await fetchUserSession();
      setUserSession(sessionData);
    };

    loadData();
  }, []);

  const userImage = userSession?.user?.image;
  const userId = userSession?.user?.id; // Сохраняет идентификатор пользователя

  return (
    <div className="flex items-center justify-between gap-10 pt-2.5 mb-10">
      <Link className="flex-1 text-left" href={"/"}>
        <Image src={logo} width={150} height={50} alt="logo" />
      </Link>

      <ul className="flex gap-6 justify-center flex-1">
        {["главная", "вещи", "коллекции", "о нас"].map((item) => (
          <li key={item} className="btn-anim1">
            <Link href={"/newest"}>
              <p>{item}</p>
            </Link>
          </li>
        ))}
      </ul>

      {userId ? ( 
        <Link
          className="flex items-center gap-3 flex-1 justify-end"
          href={`/user/${userId}`}
        >
          <div className="">
            {userImage === "" ? (
              <div className="flex items-center gap-2">
                <Image
                  className="w-8 h-8 rounded-full"
                  src={userBlankLogo}
                  width={32}
                  height={32}
                  alt="User Image"
                />
                <p className="text-sm font-medium">{userSession.user?.name}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Image
                  className="w-8 h-8 rounded-full"
                  src={userImage || userBlankLogo}
                  width={32}
                  height={32}
                  alt="Default"
                />
                <p className="text-sm font-medium">{userSession.user?.name}</p>
              </div>
            )}
          </div>
        </Link>
      ) : (
        <Link className="flex items-center gap-3 flex-1 justify-end" href="/login">
          <Button>
            <p>Войти</p>
          </Button>
        </Link>
      )}
    </div>
  );
}
