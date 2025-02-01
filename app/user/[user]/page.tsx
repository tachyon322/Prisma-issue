"use client";

import React, { useEffect, useState } from "react";
import Logout from "@/components/login/Logout";
import HeaderElement from "@/components/HeaderElement";
import { fetchUserProfile, fetchUserSession } from "@/data/user";
import AuthUser from "@/components/user/AuthUser";
import { UserProfile, UserSession } from "@/types";

interface PageProps {
  params: {
    user: string;
  };
}

export default function Page({ params }: PageProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
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

  const isLoading = !userProfile; // Определяем, загружаются ли данные

  return (
    <div className="wide-wrap">
      <HeaderElement />

      <AuthUser userProfile={userProfile} userSession={userSession} />

      {userSession?.user?.id === userProfile?.id && (
        <div className="">
          {isLoading ? null : <Logout />}
        </div>
      )}
    </div>
  );
}
