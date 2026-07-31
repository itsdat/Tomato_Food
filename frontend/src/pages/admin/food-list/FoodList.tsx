import { useEffect, useState } from "react";
import type { IFood } from "../../../interfaces/food.interface";
import axios from "axios";
import { API_URL, IMAGE_URL } from "../../../constants/api.constant";
import { toast } from "react-toastify";

export default function FoodList() {
  const [list, setList] = useState<IFood[]>([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${API_URL}/food/find-all`);
      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Server connection failed");
    }
  };

  const removeFood = async (foodId: string) => {
    // Hiển thị hộp thoại xác nhận
    const isConfirm = window.confirm(
      "Are you sure you want to delete this food item?",
    );

    if (!isConfirm) return;

    try {
      const res = await axios.delete(`${API_URL}/food/delete/${foodId}`);
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      }
    } catch (error) {
      toast.error("Could not delete item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-[90%] mx-auto p-10 animate-fadeIn animate-page">
      <h2 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-[#FF6347] rounded-full"></span>
        Food List
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Header - Geometric Style */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center py-4 px-6 bg-slate-50 border-b border-slate-100 text-sm font-bold text-slate-600">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {/* List Items */}
        <div className="flex flex-col">
          {list.length > 0 ? (
            list.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-4 py-4 px-6 border-b border-slate-50 hover:bg-orange-50/20 transition-colors last:border-0"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
                  <img
                    src={`${IMAGE_URL}/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <p className="font-semibold text-slate-700 text-sm md:text-base">
                  {item.name}
                </p>

                {/* Category Badge */}
                <p className="hidden md:block">
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-medium border border-slate-200">
                    {item.category}
                  </span>
                </p>

                {/* Price */}
                <p className="font-bold text-(--color-primary)">
                  ${item.price}
                </p>

                {/* Action - Delete Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => removeFood(item._id)}
                    className="p-2 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition-all active:scale-90"
                    title="Delete item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-slate-400">
              <p>No foods found. Start adding some!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
