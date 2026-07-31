import { useStore } from "../../../../../context/StoreContext";
import FoodItem from "../food-item/FoodItem";

export default function FoodDisplay({ category }: { category: string }) {
  const { food_list } = useStore();
  return (
    <div className="mt-3.75">
      <h2 className="text-[max(2vw,24px)] font-semibold">
        Top dishes near you
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-3.75 gap-10">
        {food_list &&
          food_list.map((item, index) => {
            if (category === "all" || category === item.category) {
              return <FoodItem key={index} item={item} />;
            }
          })}
      </div>
    </div>
  );
}
