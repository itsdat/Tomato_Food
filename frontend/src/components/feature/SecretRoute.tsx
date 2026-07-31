import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SecretRoute = ({ children }: { children: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const session = searchParams.get("session");

  useEffect(() => {
    if (!session || !session.includes("-")) {
      navigate("/", { replace: true });
      return;
    }

    // Tách timestamp từ session (đoạn sau dấu gạch nối)
    const createdTime = parseInt(session.split("-")[1]);
    const currentTime = Date.now();
    const limit = 5 * 60 * 1000; // 5 phút

    // 1. Kiểm tra xem session đã hết hạn chưa (so với lúc nó được sinh ra)
    if (currentTime - createdTime > limit) {
      navigate("/", { replace: true });
      return;
    }

    // 2. Nếu chưa hết hạn, thiết lập đếm ngược cho phần thời gian CÒN LẠI
    const timeLeft = limit - (currentTime - createdTime);
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [session, navigate]);

  return <>{children}</>;
};
