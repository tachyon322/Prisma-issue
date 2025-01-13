import React from "react";
import { auth, signOut } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function page() {
  const sesstion = await auth();

  return (
    <div>
      <h1>user</h1>
      <p>{JSON.stringify(sesstion)}</p>
      <h1>items</h1>

      <form // signOut form
        action={async () => {
          "use server";

          await signOut();
        }}>
        <button className="mt-5 bg-slate-200 p-1 rounded-lg hover:bg-red-500 transition-all hover:text-white">Sign Out</button>
      </form>
    </div>
  );
}
