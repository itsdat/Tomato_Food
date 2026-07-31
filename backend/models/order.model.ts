import mongoose, { Model, Schema } from "mongoose";
import type { IOrder } from "../interfaces/order.interface.js";

const orderSchema = new Schema<IOrder>({
    userId: { 
        type: String, 
        required: true,
    },
    items: {
        type: [Object],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "Food Processing",
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    payment: {
        type: Boolean,
        default: false
    }
});

const orderModel = (mongoose.models.order as Model<IOrder>) || mongoose.model<IOrder>('order', orderSchema);

export default orderModel;