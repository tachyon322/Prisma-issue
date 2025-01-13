import "./globals.css";
import Image from "next/image";
import bannerImg from "@/app/assets/svg/bannerLogo2.svg";
import bannerImg2 from "@/app/assets/svg/bannerLogo3.svg";
import HeaderElement from "@/components/HeaderElement";
import { db } from "@/db";
import Outfit from "@/components/outfit/Outfit";

export default async function Home() {
  const outfits = await db.outfit.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return (
    <div className="wide-wrap">
      <HeaderElement />
      <div className="flex flex-col items-center justify-center mt-28 space-y-28">
        <h1>Место для самовыражения</h1>
        <h1>Смотрите и оценивайте</h1>
        <h1>Создавайте свои образы</h1>
        <h1>Составляйте свои коллекции</h1>
      </div>

      <div className="mt-28">
        <Outfit />
      </div>
    </div>
  );
}
