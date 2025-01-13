import React from "react";
import HeaderElement from "@/components/HeaderElement";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wide-wrap">
      <HeaderElement/>
      {children}
    </div> 
  );
}