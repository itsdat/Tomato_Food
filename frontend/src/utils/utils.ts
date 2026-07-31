const generateLongKey = (minLength = 150) => {
  let key = "";
  while (key.length < minLength) {
    key += Math.random().toString(36).substring(2);
  }
  // Thêm một vài ký tự đặc biệt cho giống JWT (có dấu chấm)
  return key.substring(0, minLength);
};

// Sử dụng:
export const secretRandomKey = `${generateLongKey(50)}.${generateLongKey(100)}.${generateLongKey(30)}`;