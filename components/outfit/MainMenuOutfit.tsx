"use client";

import React, { useState, useEffect } from "react";
import { getOutfits } from "@/data/outfit";
import Link from "next/link";
import Image from "next/image";

export default function Outfit() {
  const [outfit, setOutfit] = useState([]);

  useEffect(() => {
    getOutfits().then((data: any) => {
      setOutfit(data || []);
    });
  }, []);

  return (
    <div className="flex gap-5">
      {outfit.map((item: any) => (
        <Link
          href={`/outfit/${item.id}`}
          key={item.id}
          className="flex flex-col border-2 border-black rounded-lg p-3 gap-2">
          <p>{item.title}</p>
          <div className="grid grid-cols-2 gap-2">
            {item.cloths.map((cloth: any) => (
              <div
                key={cloth.id}
                className="flex items-center rounded-lg">
                {cloth.image.length === 0 ? (
                  <div className="w-[100px] h-[100px] flex items-center justify-center text-center p-2">
                    Нет изображения
                  </div>
                ) : (
                  cloth.image
                    .slice(0, 1)
                    .map((imgItem: any) => (
                      <Image
                        className="rounded-lg"
                        key={imgItem.id}
                        src={imgItem.url}
                        alt={imgItem.url}
                        width={100}
                        height={100}
                      />
                    ))
                )}
              </div>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
