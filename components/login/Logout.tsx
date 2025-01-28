import React from 'react'
import { signOut } from "@/auth";

export default function Logout() {
  return (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="mt-5 bg-slate-200 p-1 rounded-lg hover:bg-red-500 transition-all hover:text-white">
              Sign Out
            </button>
          </form>
  )
}
