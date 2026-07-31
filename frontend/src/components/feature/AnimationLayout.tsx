import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../layout/public/navbar/Navbar";
import Footer from "../layout/public/footer/Footer";

export default function AnimationLayout({
  setShowLogin,
}: {
  setShowLogin: (value: boolean) => void;
}) {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar setShowLogin={setShowLogin} />
      <div className="animate-page w-full max-w-[92%] md:max-w-[90%] lg:max-w-[80%] mx-auto" key={pathname}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
