import { useNavigate, useSearchParams } from "react-router-dom";
import { useStore } from "../../../context/StoreContext";
import { SecretRoute } from "../../../components/feature/SecretRoute";
import CountdownTimer from "../../../components/feature/CountDown";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/api.constant";

export default function OrderPage() {
  const { getTotalCartAmount, token, food_list, cartItems, setCartItems } = useStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const key = searchParams.get("session");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event: React.FormEvent) => {
    event.preventDefault();

    let orderItems: any[] = [];
    food_list.map((item: any) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(`${API_URL}/order/create`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        setCartItems({});
        toast.success(response.data.message);
        navigate("/my-orders");
      } else {
        toast.error("Có lỗi xảy ra khi đặt hàng");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối server");
    }
  };

  if (!key || !key.includes("-")) return null;
  const createdTime = parseInt(key.split("-")[1]);
  const expiryTimestamp = createdTime + 5 * 60 * 1000;

  return (
    <SecretRoute>
      {/* Thêm onSubmit vào form */}
      <form
        onSubmit={placeOrder}
        className="flex md:flex-row flex-col items-start justify-between gap-12.5 mt-25"
      >
        <div className="w-full md:max-w-[max(30%,500px)]">
          <p className="text-[30px] font-semibold mb-12.5">
            Delivery Information
          </p>
          <div className="flex gap-2.5">
            <input
              required
              name="firstName"
              value={data.firstName}
              onChange={onChangeHandler}
              type="text"
              placeholder="First Name"
              className="order-input"
            />
            <input
              required
              name="lastName"
              value={data.lastName}
              onChange={onChangeHandler}
              type="text"
              placeholder="Last Name"
              className="order-input"
            />
          </div>
          <input
            required
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Email"
            className="order-input"
          />
          <input
            required
            name="street"
            value={data.street}
            onChange={onChangeHandler}
            type="text"
            placeholder="Street"
            className="order-input"
          />
          <div className="flex gap-2.5">
            <input
              required
              name="city"
              value={data.city}
              onChange={onChangeHandler}
              type="text"
              placeholder="City"
              className="order-input"
            />
            <input
              required
              name="state"
              value={data.state}
              onChange={onChangeHandler}
              type="text"
              placeholder="State"
              className="order-input"
            />
          </div>
          <div className="flex gap-2.5">
            <input
              required
              name="zipcode"
              value={data.zipcode}
              onChange={onChangeHandler}
              type="text"
              placeholder="Zip code"
              className="order-input"
            />
            <input
              required
              name="country"
              value={data.country}
              onChange={onChangeHandler}
              type="text"
              placeholder="Country"
              className="order-input"
            />
          </div>
          <input
            required
            name="phone"
            value={data.phone}
            onChange={onChangeHandler}
            type="text"
            placeholder="Phone number"
            className="order-input"
          />
        </div>

        <div className="w-full md:max-w-100">
          <div className="flex-1 flex flex-col gap-5">
            <h2 className="text-[30px] font-semibold mb-12.5">Cart Totals</h2>
            <div className="w-full">
              <div className="flex justify-between text-[#555]">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr className="my-2.5" />
              <div className="flex justify-between text-[#555]">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr className="my-2.5" />
              <div className="flex justify-between text-[#555]">
                <b>Total</b> 
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>

            <button
              type="submit"
              disabled={getTotalCartAmount() === 0}
              className="border-none text-white bg-(--color-primary) w-full py-3 rounded-sm cursor-pointer disabled:bg-gray-400"
            >
              ORDER NOW
            </button>

            <div className="mt-4 flex justify-center">
              <CountdownTimer expiryTimestamp={expiryTimestamp} />
            </div>
          </div>
        </div>
      </form>
    </SecretRoute>
  );
}
