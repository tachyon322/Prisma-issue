"use client";

import { getOutfitById } from "@/data/outfit";
import React, { useEffect, useState } from "react";
import ClothList from "@/components/outfit/ClothList";
import { OutfitType } from "@/types";

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
      <ClothList cloths={outfit.cloths} />
      <div className="w-[300px]">
        <h1>{outfit.title}</h1>
        <p>{outfit.description}</p>
      </div>
    </div>
  );
}
