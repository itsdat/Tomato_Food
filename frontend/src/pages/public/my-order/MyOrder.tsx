import { assets } from "../../../assets";
import { useStore } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const { orders } = useStore();
  const navigate = useNavigate();

  return (
    <div className="mt-25 px-4 md:px-0">
      <h2 className="text-2xl font-bold mb-6 text-(--color-title)">
        My Orders
      </h2>

      {orders && orders.length > 0 ? (
        <div className="mt-10">
          {/* Header Bảng - Giống hệt Cart Page */}
          <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center text-(--color-title) text-[max(1vw,12px)] font-semibold">
            <p>Parcel</p>
            <p>Title</p>
            <p>Amount</p>
            <p>Quantity</p>
            <p>Status</p>
          </div>
          <br />
          <hr className="h-px bg-(--color-border) border-none" />

          {/* List Đơn hàng */}
          {orders.map((order, index) => (
            <div key={index}>
              <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center text-[max(1vw,12px)] my-4 text-black">
                {/* Cột Icon */}
                <img
                  src={assets.parcel_icon}
                  alt="parcel"
                  className="w-10 md:w-12.5"
                />

                {/* Cột Danh sách món ăn */}
                <div className="pr-4 flex flex-wrap gap-x-3 gap-y-1">
                  {order.items.map((item: any, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100"
                      >
                        <img
                          src={`${item.image}`}
                          alt={item.name}
                          className="w-6 h-6 object-cover rounded-full shadow-sm"
                        />

                        <span className="whitespace-nowrap">
                          {item.name}{" "}
                          <b className="text-(--color-primary)">
                            x{item.quantity}
                          </b>
                          {idx === order.items.length - 1 ? "" : ","}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Cột Tổng tiền */}
                <p className="font-semibold">${order.amount}.00</p>

                {/* Cột Tổng số loại món */}
                <p>{order.items.length}</p>

                {/* Cột Trạng thái */}
                <p className="flex items-center gap-1.5 font-medium">
                  <span className="text-green-500 text-[10px]">●</span>
                  <span className="text-gray-600">{order.status}</span>
                </p>
              </div>
              <hr className="h-px bg-(--color-border) border-none" />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State (Giữ nguyên giao diện cũ của bạn vì nó đẹp rồi) */
        <div className="flex flex-col items-center justify-center w-full h-[60vh] text-center">
          <div className="w-64 h-64 bg-[url('/empty_cart.png')] bg-contain bg-no-repeat bg-center opacity-80 mb-6" />
          <h2 className="text-2xl font-semibold text-(--color-title) mb-2">
            You don't have any orders yet.
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 mt-4 bg-(--color-primary) text-white font-medium rounded-full cursor-pointer hover:scale-105 transition-all shadow-lg"
          >
            Order now
          </button>
        </div>
      )}
    </div>
  );
}
