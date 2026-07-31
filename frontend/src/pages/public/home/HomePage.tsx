import { useState } from "react";
import ExploreMenu from "../../../components/layout/public/home/explore-menu/ExploreMenu";
import Header from "../../../components/layout/public/home/header/Header";
import AppDownLoad from "../../../components/layout/public/home/app-download/AppDownLoad";
import FoodDisplay from "../../../components/layout/public/home/food-display/FoodDisplay";

export default function HomePage() {
  const [category, setCategory] = useState("all");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownLoad />
    </div>
  );
}
