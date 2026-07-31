import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { IFood } from "../interfaces/food.interface";
import axios from "axios";
import { API_URL } from "../constants/api.constant";
import type { IOrder } from "../interfaces/order.interface";

interface StoreContextType {
  food_list: IFood[];
  cartItems: Record<string, number>;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  getTotalCartAmount: () => number;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  orders: IOrder[];
}

export const StoreContext = createContext<StoreContextType | null>(null);

interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider = (props: StoreContextProviderProps) => {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [token, setToken] = useState<string>("");
  const [food_list, setFoodList] = useState<IFood[]>([]);
  const [orders, setOrders] = useState<[]>([]);

  const fetchFoodList = async () => {
    const res = await axios.get(`${API_URL}/food/find-all`);
    if (res.data.success) {
      setFoodList(res.data.data);
    }
  };

  const loadCardData = async (token: string) => {
    const res = await axios.get(`${API_URL}/cart/find-multi`, {
      headers: { token },
    });
    setCartItems(res.data.data);
  };

  const fetchUserOrder = async (token: string) => {
    const res = await axios.get(`${API_URL}/order/find-multi`, {
      headers: { token },
    });
    if (res.data.success) {
      setOrders(res.data.data);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token") as string);
        await loadCardData(localStorage.getItem("token") as string);
        await fetchUserOrder(localStorage.getItem("token") as string);
      }
    }

    loadData();
  }, []);

  const addToCart = async (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev: any) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev: any) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        `${API_URL}/cart/update`,
        { itemId },
        { headers: { token } },
      );
    }
  };

  const removeFromCart = async (itemId: string) => {
    setCartItems((prev: any) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${API_URL}/cart/delete`,
        { itemId },
        { headers: { token } },
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += Number(itemInfo?.price) * cartItems[item];
      }
    }

    return totalAmount;
  };

  const contextValue: StoreContextType = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    setToken,
    token,
    orders,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a StoreContextProvider");
  }

  return context;
};
