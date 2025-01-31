"use client";

import React, { useEffect, useState } from "react";
import Logout from "@/components/login/Logout";
import HeaderElement from "@/components/HeaderElement";
import { fetchUserProfile, fetchUserSession } from "@/data/user";
import AuthUser from "@/components/user/AuthUser";

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

      <AuthUser userProfile={userProfile} userSession={userSession} />

      {userSession?.user && (
        <div className="">
          <Logout />
        </div>
      )}
    </div>
  );
}
