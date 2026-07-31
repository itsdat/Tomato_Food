import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import StoreContextProvider from "./context/StoreContext.tsx";
import { ToastContainer } from "react-toastify";
import { StoreAdminContextProvider } from "./context/AdminContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContextProvider>
      <StoreAdminContextProvider>
        <App />
      </StoreAdminContextProvider>
      <ToastContainer />
    </StoreContextProvider>
  </StrictMode>,
);
