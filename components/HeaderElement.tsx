import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/svg/logo.svg";
import React from "react";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import userBlankLogo from "@/app/assets/svg/userBlankLogo.svg";

export default async function HeaderElement() {
  const session = await auth();
  const userImage = session?.user?.image;

  return (
    <div className="flex items-center justify-between gap-10 pt-2.5 mb-10">
      <Link className="flex-1 text-left" href={"/"}>
        <Image src={logo} width={150} height={50} alt="logo" />
      </Link>

      <ul className="flex gap-6 justify-center flex-1 ">
        <li className="btn-anim1">
          <Link href={"/newest"}>
            <p>главная</p>
          </Link>
        </li>
        <li className="btn-anim1">
          <Link href={"/newest"}>
            <p>вещи</p>
          </Link>
        </li>
        <li className="btn-anim1">
          <Link href={"/main"}>
            <p>коллекции</p>
          </Link>
        </li>
        <li className="btn-anim1">
          <Link href={"/main"}>
            <p>о нас</p>
          </Link>
        </li>
      </ul>

      {session ? (
        <Link className="flex items-center gap-3 flex-1 justify-end" href="/user">
          <div className="">
            {userImage === "" ? (
              <div className="flex items-center gap-2">
                <Image className="w-8 h-8 rounded-full" src={userImage} width={32} height={32} alt="User Image" />
                <p className="text-sm font-medium">{session.user?.name}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Image className="w-8 h-8" src={userBlankLogo} width={32} height={32} alt="Default" />
                <p className="text-sm font-medium">{session.user?.name}</p>
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
