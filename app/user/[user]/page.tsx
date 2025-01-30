"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import userBlankLogo from "@/app/assets/svg/userBlankLogo.svg";
import Logout from "@/components/login/Logout";
import HeaderElement from "@/components/HeaderElement";
import { fetchUserProfile, fetchUserSession } from "@/data/user";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
}

interface PageProps {
  params: {
    user: string;
  };
}

export default function Page({ params }: PageProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userSession, setUserSession] = useState<any | null>(null);
  const userID = params.user;

  useEffect(() => {
    const loadData = async () => {
      const profileData = await fetchUserProfile(userID);
      setUserProfile(profileData);

      const sessionData = await fetchUserSession();
      setUserSession(sessionData);
    };

    loadData();
  }, [userID]);

  return (
    <div className="wide-wrap">
      <HeaderElement />

      <h1>Профиль</h1>
      <p>ID: {userID}</p>
      <p>Имя: {userProfile?.name ?? "Не найдено"}</p>
      <p>Email: {userProfile?.email ?? "Не найдено"}</p>
      <Image
        src={userProfile?.image || userBlankLogo} 
        alt="user profile"
        width={300}
        height={200}
      />

      <p>Сессия {JSON.stringify(userSession)}</p>


      {
        userSession?.user ? (
          <div className="">
            <Logout />
          </div>
        ) :
        (
          null
        )
      }
    </div>
  );
}
