import React from "react";
import { auth } from "@/auth";
import HeaderElement from "@/components/HeaderElement";
import Image from "next/image";
import userBlankLogo  from "@/app/assets/svg/userBlankLogo.svg";

export default async function page({ params }: { params: { user: string } }) {
  const session = await auth();

  const userID = params.user;

  return (
    <div className="wide-wrap">
      <HeaderElement />

      <h1>Профиль</h1>

      <div className="flex">
        <Image
          className="rounded-full"
          src={session?.user.image || userBlankLogo }
          width={128}
          height={128}
          alt="User Image"
        />

        <div className="">
          <p>{session?.user.name}</p>
          <hr />
          <p>ID: {session?.user.id}</p>
        </div>
      </div>
    </div>
  );
}
