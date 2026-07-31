import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-center animate-page">
      <div className="w-80 h-80 bg-[url('/404.png')] bg-contain bg-no-repeat bg-center opacity-80 " />

      <h2 className="text-2xl font-semibold text-(--color-title) mb-2">
        Page Not Found
      </h2>
      <p className="text-[#555] mb-8 max-w-75">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-8 py-3 bg-(--color-primary) text-white font-medium rounded-full cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg shadow-(--color-primary)/20"
      >
        Back To Home
      </button>
    </div>
  );
}
