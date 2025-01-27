"use client";

import React, { useState, useEffect } from "react";
import { getOutfitItems, getOutfitById, getOutfits } from "@/data/outfit";
import Link from "next/link";
import Image from "next/image";

export default function Outfit() {
  const [outfit, setOutfit] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getOutfits().then((data: any) => {
      setOutfit(data || []);
    });
  }, []);

  const sortedOutfit = [...outfit]
    .sort((a: any, b: any) => b.createdAt - a.createdAt)
    .slice(0, 3);

  return (
    <Link href={"/user"} className="flex gap-5">
      {sortedOutfit.map((item: any) => {
        return (
          <div
            key={item.id}
            className="flex flex-col border-2 border-black rounded-lg p-4 gap-2">
            <p>{item.title}</p>
            <div className="grid grid-cols-2">
              {item.cloths.map((cloth: any) => {
                return (
                  <div
                    key={cloth.id}
                    className="flex border-2 border-black rounded-lg p-4 flex-row gap-2">

                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </Link>
  );
}
{
  /* <Image src={cloth.image} alt={cloth.name} width={100} height={100} /> */
}
