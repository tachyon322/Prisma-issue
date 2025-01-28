import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/svg/logo.svg";
import React from "react";
import { auth } from "@/auth";
import UserProfile from "./image/UserAvatar";

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

      <UserProfile showName={true} avatarSize={32} />
    </div>
  );
}
