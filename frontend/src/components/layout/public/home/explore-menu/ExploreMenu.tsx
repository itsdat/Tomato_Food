import { menu_list } from "../../../../../assets";

export default function ExploreMenu({
  setCategory,
  category,
}: {
  setCategory: (value: string | ((prev: string) => string)) => void;
  category: string;
}) {
  return (
    <div id="explore-menu" className="flex flex-col gap-5">
      <h1 className="text-(--color-title) font-medium">Explore our menu</h1>
      <p className="max-w-full md:max-w-[60%] text-(--color-text) text-[14px] md:text-[16px]">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your cravings and elevate your dining experience, one
        delicious meal at a time.
      </p>
      <div className="flex justify-between items-center gap-2 md:gap-7.5 text-center my-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {menu_list.map((item, index) => (
          <div key={index} className="group shrink-0">
            <div
              className={`${
                category === item.menu_name
                  ? "border-4 border-(--color-primary)"
                  : "border-4 border-transparent"
              } w-[7.5vw] min-w-20 aspect-square overflow-hidden rounded-full p-1 cursor-pointer transition-all duration-300`}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "all" : item.menu_name,
                )
              }
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="mt-2.5 text-(--color-lable) text-[max(1.4vw,16px)] cursor-pointer group-hover:text-(--color-primary) transition-all duration-200">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>

      <hr className="my-2.5 h-0.5 bg-(--color-border) border-none" />
    </div>
  );
}
