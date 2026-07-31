import mongoose, { Model } from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tên người dùng không được để trống"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email không được để trống"],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Mật khẩu không được để trống"],
        trim: true,
    },
    cartData: {
        type: Object,
        default: {}
    }
}, { minimize: false });
const userModel = mongoose.models.food || mongoose.model('users', userSchema);
export default userModel;
//# sourceMappingURL=user.model.js.map