import mongoose, { Model } from "mongoose";
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tên món ăn không được để trống"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Mô tả món ăn là bắt buộc"]
    },
    price: {
        type: Number,
        required: [true, "Giá tiền phải là một con số cụ thể"],
        min: [0, "Giá tiền không thể âm"] // Báo lỗi nếu nhập số âm
    },
    image: {
        type: String,
        required: [true, "Vui lòng upload hình ảnh cho món ăn"]
    },
    category: {
        type: String,
        required: [true, "Bạn phải chọn danh mục cho món ăn"]
    }
});
const foodModel = mongoose.models.food || mongoose.model('foods', foodSchema);
export default foodModel;
//# sourceMappingURL=food.model.js.map