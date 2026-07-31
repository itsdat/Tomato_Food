import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../constants/api.constant";
import { toast } from "react-toastify";
import type { IOrder } from "../../../interfaces/order.interface";
import { assets } from "../../../assets";

interface IAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  // Lấy danh sách đơn hàng từ API
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/order/find-all`);
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Server connection failed");
    }
  };

  // Cập nhật trạng thái đơn hàng (Food Processing -> Out for delivery -> Delivered)
  const statusHandler = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    orderId: string,
  ) => {
    try {
      const res = await axios.post(`${API_URL}/order/update`, {
        orderId,
        status: event.target.value,
      });
      if (res.data.success) {
        await fetchOrders();
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-[90%] mx-auto p-10 animate-fadeIn animate-page">
      <h2 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-[#FF6347] rounded-full"></span>
        Order Management
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] items-center py-4 px-6 bg-slate-50 border-b border-slate-100 text-sm font-bold text-slate-600">
          <p>Box</p>
          <p>Items & Details</p>
          <p>Amount</p>
          <p>Payment</p>
          <p>Status Action</p>
        </div>

        {/* Orders List */}
        <div className="flex flex-col">
          {orders.length > 0 ? (
            orders.map((order) => {
              const address = order.address as IAddress;
              return (
                <div
                  key={order._id}
                  className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] items-center gap-4 py-6 px-6 border-b border-slate-50 hover:bg-orange-50/10 transition-colors last:border-0"
                >
                  <div className="hidden md:flex justify-start">
                    <img
                      src={assets.parcel_icon}
                      alt="img"
                      className="w-14 aspect-square object-cover"
                    />
                  </div>

                  {/* Items & Address */}
                  <div className="text-sm">
                    <p className="font-bold text-slate-800 mb-1">
                      {order.items.map(
                        (item: any, index: number) =>
                          `${item.name} x ${item.quantity}${index === order.items.length - 1 ? "" : ", "}`,
                      )}
                    </p>
                    <p className="text-slate-500 font-medium">
                      {address.firstName} {address.lastName}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {address.street}, {address.city}
                    </p>
                  </div>

                  {/* Amount */}
                  <p className="font-bold text-[#FF6347] md:text-lg">
                    ${order.amount.toFixed(2)}
                  </p>

                  {/* Payment Status */}
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.payment ? "bg-green-100 text-green-600 border border-green-200" : "bg-amber-100 text-amber-600 border border-amber-200"}`}
                    >
                      {order.payment ? "Paid" : "Pending"}
                    </span>
                  </div>

                  {/* Status Dropdown - The "Action" part */}
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => statusHandler(e, order._id as string)}
                      value={order.status}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FF6347]/20 focus:border-[#FF6347] transition-all"
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center text-slate-400">
              <p>No orders yet. Waiting for hungry customers!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
