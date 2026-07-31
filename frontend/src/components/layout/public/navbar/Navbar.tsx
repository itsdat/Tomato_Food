import { useEffect, useRef, useState } from "react";
import { assets } from "../../../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../../../context/StoreContext";

const menuItems = [
  { lable: "Home", href: "/" },
  { lable: "Menu", href: "#explore-menu" },
  { lable: "Moblie App", href: "#app-download" },
  { lable: "Contact Us", href: "#contact" },
];

export default function Navbar({
  setShowLogin,
}: {
  setShowLogin: (value: boolean) => void;
}) {
  const [menu, setMenu] = useState<string>("/");
  const { getTotalCartAmount, token, setToken } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY.current) {
        setScrollDir("down");
      } else if (scrollY < lastScrollY.current) {
        setScrollDir("up");
      }

      lastScrollY.current = scrollY <= 0 ? 0 : scrollY;

      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div
      className={`w-full py-5 hidden md:block sticky top-0 z-1 bg-white transition-all duration-500 
    ${scrollDir === "down" && isScrolled ? "-translate-y-full" : "translate-y-0"} 
    ${isScrolled ? `${scrollDir === "up" ? "shadow-md" : "shadow-none"}` : ""}`}
    >
      <div className="md:flex items-center justify-between max-w-[80%] mx-auto ">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="w-37.5 lg:w-35 md:w-30"
          />
        </Link>

        <ul className="flex items-center justify-center gap-5 lg:text-[17px] md:text-[16px] md:gap-3.75 text-(--color-text) text-lg">
          {menuItems.map((item, index) =>
            item.href === "/" ? (
              <Link
                onClick={() => setMenu(item.href)}
                to={item.href}
                key={index}
                className={`cursor-pointer ${menu === item.href ? "pb-0.5 border-b-2 border-(--color-text)" : ""}`}
              >
                {item.lable}
              </Link>
            ) : (
              <a
                onClick={() => setMenu(item.href)}
                href={item.href}
                key={index}
                className={`cursor-pointer ${menu === item.href ? "pb-0.5 border-b-2 border-(--color-text)" : ""}`}
              >
                {item.lable}
              </a>
            ),
          )}
        </ul>

        <div className="flex items-center justify-end gap-10 lg:gap-7.5 md:gap-5">
          <img
            src={assets.search_icon}
            alt="search"
            className="lg:w-5.5 md:w-5"
          />
          <div className="flex items-center justify-center relative cursor-pointer">
            <Link to={"/cart"}>
              <img
                src={assets.basket_icon}
                alt="search"
                className="lg:w-5.5 md:w-5"
              />
            </Link>
            {getTotalCartAmount() > 0 && (
              <div className="w-2.5 aspect-square rounded-full bg-(--color-primary) absolute -right-2 -top-1"></div>
            )}
          </div>
          {token ? (
            <div className="group relative">
              {/* Icon Profile */}
              <img
                src={assets.profile_icon}
                alt="avatar"
                className="lg:w-5.5 md:w-5 cursor-pointer"
              />

              <ul className="absolute right-0 z-20 flex flex-col gap-0.5 min-w-40 bg-white mt-2 p-2 rounded-xl border border-slate-100 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] list-none invisible opacity-0 translate-y-2 transition-all duration-300 delay-500 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-150">
                <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white border-t border-l border-slate-100 rotate-45"></div>
                <li onClick={() => navigate('/my-orders')} className=" flex items-center gap-3 px-4 py-1.5 rounded-lg cursor-pointer text-(--color-text) hover:text-(--color-primary) hover:bg-orange-50 transition-colors group/item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag group-hover/item:rotate-12 transition-transform"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" />
                    <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                  </svg>
                  <p className="text-slate-700 font-medium group-hover/item:text-(--color-primary)">
                    Orders
                  </p>
                </li>

                <hr className="mx-4 border-slate-50" />

                <li
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-1.5 rounded-lg cursor-pointer text-(--color-text) hover:text-red-500 hover:bg-red-50 transition-colors group/item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-logout group-hover/item:rotate-12 transition-transform"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M9 12h12l-3 -3" />
                    <path d="M18 15l3 -3" />
                  </svg>
                  <p className="text-slate-700 font-medium group-hover/item:text-red-500">
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-transparent text-[16px] text-(--color-text) border border-(--color-primary) py-2.5 px-7.5 lg:py-2 lg:px-6.25 md:text-[15px] rounded-[50px] cursor-pointer hover:bg-(--color-hover) transition-colors duration-300"
            >
              Sign In {token}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
