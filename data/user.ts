import { db } from "@/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email },  cacheStrategy: { ttl: 60 }, });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: any) => {
  try {
    const user = await db.user.findUnique({ where: { id },  cacheStrategy: { ttl: 60 }, });
    return user;
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    return null;
  }
};

interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
}

export const fetchUserProfile = async (
  userID: string
): Promise<UserProfile | null> => {
  try {
    const response = await fetch(`/api/user/searchbyid/${userID}`);
    console.log("Fetching:", response.url); // Для отладки

    if (!response.ok) {
      console.error("Ошибка при получении данных:", await response.text());
      return null;
    }

    const data: UserProfile = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    return null;
  }
};

export const fetchUserSession = async (): Promise<any | null> => {
  try {
    const response = await fetch(`/api/user/session`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    return null;
  }
};

export const fetchUserSubscriptions = async (
  userID: string
): Promise<any | null> => {
  try {
    const response = await fetch(`/api/user/subscriptions/${userID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    return null;
  }
};