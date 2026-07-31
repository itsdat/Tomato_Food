import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// 1. Định nghĩa kiểu dữ liệu cho các giá trị trong Context
interface StoreContextType {
  token: string;
  setToken: (token: string) => void;
}

// 2. Khởi tạo Context với giá trị mặc định là undefined
// Việc để undefined giúp TS cảnh báo nếu bạn dùng Context bên ngoài Provider
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// 3. Tạo Provider Component
export const StoreAdminContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || "",
  );
  
  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("admin_token")) {
        setToken(localStorage.getItem("admin_token") as string);
      }
    }
    loadData();
  }, []);

  const contextValue: StoreContextType = {
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

// 4. Custom Hook để sử dụng Context nhanh hơn và an toàn hơn
export const useAdminStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreContextProvider");
  }
  return context;
};
