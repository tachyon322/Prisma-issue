import "./globals.css";
import HeaderElement from "@/components/HeaderElement";
import Outfit from "@/components/outfit/MainMenuOutfit";

export default async function Home() {

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
