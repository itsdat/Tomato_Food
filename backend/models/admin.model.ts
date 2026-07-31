import mongoose from "mongoose";
import type { IAdmin } from "../interfaces/admin.interface.js";

const adminSchema = new mongoose.Schema<IAdmin>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const adminModel = mongoose.models.admin || mongoose.model<IAdmin>('admin', adminSchema);
export default adminModel;