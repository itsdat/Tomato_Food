import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants/api.constant";
import { toast } from "react-toastify";
import { useAdminStore } from "../../../context/AdminContext";

export default function AdminLogin() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setToken } = useAdminStore();

  const adminBg =
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop";

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/admin/login`, data);
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("admin_token", res.data.data);
        setToken(res.data.data);
        navigate("/admin/food-list");
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fcfcfc]">
      {/* Card chính: Bo góc rất nhẹ, đổ bóng cực mềm */}
      <div className="w-full max-w-5xl h-155 flex flex-row rounded-4xl bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-100">
        {/* Cánh trái: Ảnh & Thương hiệu */}
        <div className="hidden md:block w-1/2 relative border-r border-gray-50">
          <img
            src={adminBg}
            alt="Fine Dining"
            className="w-full h-full object-cover grayscale-30 opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-l from-white via-transparent to-transparent"></div>

          {/* Logo/Slogan nhỏ ở góc */}
          <div className="absolute bottom-10 left-10">
            <h2 className="text-[#FF6347] text-[10px] tracking-[0.5em] uppercase font-bold mb-2">
              Prime Service
            </h2>
            <p className="text-gray-400 text-xs font-light tracking-widest italic">
              Management Excellence
            </p>
          </div>
        </div>

        {/* Cánh phải: Form tối giản */}
        <div className="flex-1 p-12 lg:p-20 flex flex-col justify-center bg-white">
          <div className="mb-14 text-center md:text-left">
            <h1 className="text-4xl font-medium text-gray-800 tracking-tighter">
              Tomato. <span className="font-medium text-[#FF6347]">Admin</span>
            </h1>
            <div className="w-26 h-0.75 bg-[#FF6347] mt-1 mx-auto md:mx-0"></div>
          </div>

          <form onSubmit={onLogin} className="space-y-10">
            <div className="group border-b border-gray-200 focus-within:border-[#FF6347] transition-all duration-500">
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Manager's Email"
                required
                className="w-full bg-transparent py-3 text-gray-700 outline-none placeholder:text-gray-400 font-light text-sm"
              />
            </div>

            <div className="group border-b border-gray-200 focus-within:border-[#FF6347] transition-all duration-500">
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Security Password"
                required
                className="w-full bg-transparent py-3 text-gray-700 outline-none placeholder:text-gray-400 font-light text-sm"
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="group relative w-full border border-[#FF6347] py-4 text-[#FF6347] text-[11px] tracking-[0.4em] uppercase font-bold transition-all duration-500 hover:text-white"
              >
                {/* Lớp nền Tomato chạy ra khi hover */}
                <div className="absolute inset-0 bg-[#FF6347] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="relative z-10">Sign In</span>
              </button>
            </div>
          </form>

          <button
            onClick={() => navigate("/")}
            className="mt-12 text-[10px] text-gray-400 hover:text-[#FF6347] tracking-[0.3em] uppercase transition-colors duration-300 text-center"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
