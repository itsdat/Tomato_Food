import { assets } from "../../../../../assets";

export default function AppDownLoad() {
  return (
    <div
      className="mx-auto mt-25 text-[max(3vw,20px)] text-center font-medium w-full"
      id="app-download"
    >
      <p>
        For Better Experience Download <br /> Tomato App
      </p>
      <div className="flex items-center justify-center gap-[max(2vw,10px)] mt-10">
        <img
          src={assets.play_store}
          alt="image"
          className="w-[max(30vw,120px)] max-w-45 transition-all duration-500 cursor-pointer hover:scale-105"
        />
        <img
          src={assets.app_store}
          alt="image"
          className="w-[max(30vw,120px)] max-w-45 transition-all duration-500 cursor-pointer hover:scale-105"
        />
      </div>
    </div>
  );
}
