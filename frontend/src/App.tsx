import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/public/home/HomePage.tsx";
import CartPage from "./pages/public/cart/CartPage.tsx";
import OrderPage from "./pages/public/order/OrderPage.tsx";
import { useState } from "react";
import LoginPopup from "./components/layout/public/login-popup/LoginPopup.tsx";
import AnimationLayout from "./components/feature/AnimationLayout.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AddFood from "./pages/admin/add-food/AddFood.tsx";
import FoodList from "./pages/admin/food-list/FoodList.tsx";
import OrderList from "./pages/admin/order-list/OrderList.tsx";
import NotFound from "./components/layout/NotFound.tsx";
import ScrollToTop from "./components/feature/ScrollToTop.tsx";
import MyOrder from "./pages/public/my-order/MyOrder.tsx";
import AdminLogin from "./pages/admin/admin-login/AdminLogin.tsx";
import { useAdminStore } from "./context/AdminContext.tsx";

export default function App() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const { token } = useAdminStore();
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

        <Routes>
          <Route element={<AnimationLayout setShowLogin={setShowLogin} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/my-orders" element={<MyOrder />} />
          </Route>

          <Route
            path="/admin"
            element={
              token ? <Navigate to="/admin/food-list" /> : <AdminLogin />
            }
          />
          <Route element={<AdminLayout />}>
            <Route path="/admin/add-food" element={<AddFood />} />
            <Route path="/admin/food-list" element={<FoodList />} />
            <Route path="/admin/order-list" element={<OrderList />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
