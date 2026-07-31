import { useEffect, useState } from "react";
import { assets } from "../../../../assets";
import { API_URL } from "../../../../constants/api.constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useStore } from "../../../../context/StoreContext";

export default function LoginPopup({
  setShowLogin,
}: {
  setShowLogin: (value: boolean) => void;
}) {
  const [currState, setCurrState] = useState<"Sign Up" | "Sign In">("Sign In");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { setToken } = useStore();

  const onChangeHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event: any) => {
    event.preventDefault();
    const URL =
      currState === "Sign In"
        ? `${API_URL}/user/login`
        : `${API_URL}/user/register`;

    try {
      const res = await axios.post(`${URL}`, data);
      if (res.data.success) {
        setToken(res.data.data);
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.data);
        setShowLogin(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      console.error("Login Error:", error);

      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="absolute z-10 w-full h-full bg-[#00000090] grid">
      <form
        onSubmit={onLogin}
        className="place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6.25 py-6.25 px-7.5 rounded-lg text-[14px] animate-fade-modal"
      >
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
            className="w-4 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-6.25">
          {currState === "Sign Up" && (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Your name"
              required
              className="outline-none border border-[#c9c9c9] rounded-sm px-2 py-3 focus:border-black"
            />
          )}
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your email"
            required
            className="outline-none border border-[#c9c9c9] rounded-sm px-2 py-3 focus:border-black"
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
            className="outline-none border border-[#c9c9c9] rounded-sm px-2 py-3 focus:border-black"
          />
        </div>

        <button
          type="submit"
          className="border-none p-2.5 rounded-sm text-white bg-(--color-primary) text-[15px] cursor-pointer"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="flex items-start gap-2 -mt-3.75">
          <input type="checkbox" required className="mt-1" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Sign In" ? (
          <p>
            Create a new account?{" "}
            <span
              className="text-(--color-primary) font-medium cursor-pointer"
              onClick={() => setCurrState("Sign Up")}
            >
              Click here!
            </span>
          </p>
        ) : (
          <p>
            Already have an account{" "}
            <span
              className="text-(--color-primary) font-medium cursor-pointer"
              onClick={() => setCurrState("Sign In")}
            >
              Login here!
            </span>
          </p>
        )}
      </form>
    </div>
  );
}
