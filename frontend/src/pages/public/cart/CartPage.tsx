import { useNavigate } from "react-router-dom";
import { useStore } from "../../../context/StoreContext";
import { secretRandomKey } from "../../../utils/utils";

export default function CartPage() {
  const { cartItems, removeFromCart, food_list, getTotalCartAmount } =
    useStore();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const timestamp = Date.now();
    const secretKey = `${secretRandomKey}-${timestamp}`;
    navigate(`/order?session=${secretKey}`);
  };

  return (
    <>
      {getTotalCartAmount() > 0 ? (
        <div className="mt-25">
          <div>
            <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-(--color-title) text-[max(1vw,12px)]">
              <p>Items</p>
              <p>Title</p>
              <p>Prices</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>

            <br />
            <hr className="h-px bg-(--color-border) border-none" />

            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[max(1vw,12px)] my-2.5 text-black">
                      <img
                        src={`${item.image}`}
                        alt="img"
                        className="w-12.5 aspect-square object-cover"
                      />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>${item.price * cartItems[item._id]}</p>
                      <p
                        onClick={() => removeFromCart(item._id)}
                        className="cursor-pointer"
                      >
                        X
                      </p>
                    </div>
                    <hr className="h-px bg-(--color-border) border-none" />
                  </div>
                );
              }
            })}
          </div>

          <div className="mt-20 flex flex-col-reverse md:flex-row justify-between gap-[max(12vw,20px)]">
            <div className="flex-1 flex flex-col gap-5">
              <h2>Cart Totals</h2>
              <div>
                <div className="flex justify-between text-[#555]">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr className="my-2.5" />
                <div className="flex justify-between text-[#555]">
                  <p>Delivery Fee</p>
                  <p>${2}</p>
                </div>
                <hr className="my-2.5" />
                <div className="flex justify-between text-[#555]">
                  <b>Total</b>
                  <b>${getTotalCartAmount() + 2}</b>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="border-none text-white bg-(--color-primary) w-[max(15vw,200px)] py-3 rounded-sm cursor-pointer"
              >
                PROCESS TO CHECKOUT
              </button>
            </div>

            <div className="flex-1">
              <p className="text-[#555]">
                If you have a promo code, Enter it here.
              </p>
              <div className="mt-2.5 flex md:justify-between justify-start items-center bg-[#eaeaea] rounded-sm">
                <input
                  type="text"
                  placeholder="promo code"
                  className="bg-transparent border-none outline-none pl-2.5"
                />
                <button className="w-[max(10vw,150px)] py-3 px-1.25 bg-black border-none text-white rounded-r-sm">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-[60vh] text-center animate-fade-fast">
          <div className="w-64 h-64 bg-[url('/empty_cart.png')] bg-contain bg-no-repeat bg-center opacity-80 mb-6" />

          <h2 className="text-2xl font-semibold text-(--color-title) mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-[#555] mb-8 max-w-75">
            Looks like you haven't added anything to your cart yet.
          </p>

          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const menu = document.getElementById("explore-menu");
                menu?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="px-8 py-3 bg-(--color-primary) text-white font-medium rounded-full cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg shadow-(--color-primary)/20"
          >
            Go to Menu
          </button>
        </div>
      )}
    </>
  );
}
