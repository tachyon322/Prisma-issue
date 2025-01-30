import Link from "next/link";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Link href={"/"}>
        <h1 className="text-xl">Вернуться на главную</h1>
      </Link>
      {children}
    </div>
  );
}
