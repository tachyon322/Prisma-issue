"use server";

import { db } from "@/db";

export const getOutfits = async () => {
  try {
    const items = await db.outfit.findMany({
      include: {
        cloths: {
          select: {
            Image: true,
            name: true,
            id: true,
          },
        },
      },
    });
    return items;
  } catch {
    return null;
  }
};

export const getOutfitItems = async (id: any) => {
  try {
    const outfit = await db.outfit.findUnique({
      where: { id },
      select: {
        title: true,
        cloths: {
          select: {
            name: true,
          },
        },
      },
    });

    return outfit ? outfit.cloths : null; // Return only cloths array
  } catch {
    return null;
  }
};

export const getOutfitById = async (id: any) => {
  try {
    const item = await db.outfit.findUnique({
      where: { id },
      include: { cloths: { include: { Image: true } } },
    });
    if (!item) {
      console.warn("Outfit not found for id:", id);
    }
    return item;
  } catch (error) {
    console.error("Ошибка при получении outfit:", error);
    return null;
  }
};
