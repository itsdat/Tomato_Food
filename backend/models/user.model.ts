import mongoose, { Model } from "mongoose";
import type { IUser } from "../interfaces/user.interface.js";

const userSchema = new mongoose.Schema<IUser>({
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
},{ minimize: false });

const userModel = mongoose.models.food as Model<IUser> || mongoose.model('users', userSchema);
export default userModel;