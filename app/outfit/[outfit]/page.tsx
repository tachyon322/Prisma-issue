"use client";

import { getOutfitById } from "@/data/outfit";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ClothImage {
  id: number;
  url: string | null;
  postId: number | null;
  clothId: number | null;
}

interface Cloth {
  id: number;
  name: string;
  rating: number;
  isAd: string;
  userId: string | null;
  Image: ClothImage[];
}

interface OutfitType {
  id: number;
  title?: string;
  description?: string;
  cloths: Cloth[];
}

export default function Outfit({ params }: { params: { outfit: string } }) {
  const [outfit, setOutfit] = useState<OutfitType | null>(null);
  const outfitId = Number(params.outfit);

  useEffect(() => {
    getOutfitById(outfitId).then((data) => {
      setOutfit(data as OutfitType | null);
    });
  }, [outfitId]);

  if (!outfit) return <div>Загрузка...</div>;

  return (
    <div className="flex gap-3">
      {outfit.cloths?.length
        ? outfit.cloths.map((item) => (
            <div
              key={item.id}
              className="w-[300px] h-[300px] rounded-lg border-black border-2 flex items-center justify-center"
            >
              {item.Image[0]?.url ? (
                <Image
                  className="rounded-lg"
                  src={item.Image[0].url}
                  alt={item.name || "Cloth image"}
                  width={300}
                  height={300}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="">
                  <p>Нет изображения</p>
                </div>
              )}
            </div>
          ))
        : "В этом аутфите нет одежды... Очень Странно!"}
    </div>
  );
}
