import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import userBlankLogo from "@/app/assets/svg/userBlankLogo.svg";
import { Button } from "../ui/button";

interface UserProfileProps {
  showName: boolean;
  avatarSize: number;
  linkable: boolean;
  textSize?: string;
}

export default async function UserProfile({
  showName = true,
  avatarSize = 32,
  linkable = true,
  textSize = "text-sm",
}: UserProfileProps) {
  const session = await auth();

  return (
    <div className="">
      {linkable ? (
            <Link 
            href={`/user/${session?.user?.id}`}
            className="flex items-center gap-2">
              {session ? (
                <>
                  <div className="flex items-center gap-2">
                    <Image
                      className="rounded-full"
                      src={session.user?.image || userBlankLogo}
                      width={avatarSize}
                      height={avatarSize}
                      alt="User Avatar"
                      style={{ width: avatarSize, height: avatarSize }}
                    />
                  </div>
                  {showName && (
                    <p className={`${textSize} font-medium`}>
                      {session.user?.name || null}
                    </p>
                  )}
                </>
              ) : (
                <Link href="/login">
                  <Button>
                    <p>Войти</p>
                  </Button>
                </Link>
              )}
            </Link>
      ) : (
        <div
        className="flex items-center gap-2">
          {session ? (
            <>
              <div className="flex items-center gap-2">
                <Image
                  className="rounded-full"
                  src={session.user?.image || userBlankLogo}
                  width={avatarSize}
                  height={avatarSize}
                  alt="User Avatar"
                  style={{ width: avatarSize, height: avatarSize }}
                />
              </div>
              {showName && (
                <p className={`${textSize} font-medium`}>
                  {session.user?.name || null}
                </p>
              )}
            </>
          ) : (
            <Link href="/login">
              <Button>
                <p>Войти</p>
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}