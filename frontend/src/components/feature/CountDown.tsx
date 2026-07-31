import { useEffect, useState } from "react";

const CountdownTimer = ({ expiryTimestamp }: { expiryTimestamp: number }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expiryTimestamp - now) / 1000));
      setTimeLeft(diff);
    };

    // Tính toán ngay lần đầu
    calculateTime();

    // Cập nhật mỗi giây
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [expiryTimestamp]);

  // Định dạng hiển thị mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </>
  );
};

export default CountdownTimer;
