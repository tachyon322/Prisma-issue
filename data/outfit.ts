"use server";

import { db } from "@/db";

export const getOutfits = async () => {
  try {
    const items = await db.outfit.findMany({
      include: {
        cloths: true,
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
    const item = await db.outfit.findUnique({ where: { id } });
    return item;
  } catch {
    return null;
  }
};
