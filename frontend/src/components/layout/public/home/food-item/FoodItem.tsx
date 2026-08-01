import { assets } from "../../../../../assets";
import type { IFood } from "../../../../../interfaces/food.interface";
import { useStore } from "../../../../../context/StoreContext";
import { toast } from "react-toastify";

export default function FoodItem({ item }: { item: IFood }) {
  const { cartItems, addToCart, removeFromCart, token } = useStore();

  const handleAddToCart = () => {
    if (!token) {
      toast.warning("Please login to add items to cart.");
      return;
    }
    addToCart(item._id);
  };

  return (
    <div className="w-full mx-auto rounded-[15px] shadow-lg transition-all duration-300 animate-fade-fast">
      <div className="w-full rounded-[15px] relative">
        <img
          src={`${item.image}`}
          alt={item.name}
          className="w-full rounded-t-[15px] aspect-[1/0.7] object-cover"
        />
        {!cartItems?.[item._id] ? (
          <img
            src={assets.add_icon_white}
            alt="add_btn"
            className="w-8.75 absolute bottom-3.75 right-3.75 cursor-pointer rounded-full"
            onClick={handleAddToCart}
          />
        ) : (
          <div className="absolute bottom-3.75 right-3.75 flex items-center gap-2.5 p-1.5 rounded-full bg-white">
            <img
              src={assets.remove_icon_red}
              alt="btn"
              onClick={() => removeFromCart(item._id)}
              className="w-7.5"
            />
            <p>{cartItems?.[item._id]}</p>
            <img
              src={assets.add_icon_green}
              alt="btn"
              onClick={() => addToCart(item._id)}
              className="w-7.5"
            />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[20px] font-medium">{item.name}</p>
          <img src={assets.rating_starts} alt="rating" className="w-17.5" />
        </div>

        <p className="text-(--color-desc) text-[12px] line-clamp-3">
          {item.description}
        </p>
        <p className="text-(--color-primary) text-[22px] font-medium mt-2.5">
          ${item.price}
        </p>
      </div>
    </div>
  );
}
