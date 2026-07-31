import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
export const OrderService = {
    async create(data) {
        try {
            const orderData = {
                ...data,
                payment: true,
                date: new Date()
            };
            const newOrder = new orderModel(orderData);
            await newOrder.save();
            await userModel.findByIdAndUpdate(data.userId, { cartData: {} });
            return newOrder;
        }
        catch (error) {
            console.error("Create Order Error:", error);
            throw error;
        }
    },
    async findMulti(userId) {
        const orders = await orderModel.find({ userId: userId }).sort({ date: -1 });
        return orders;
    },
    async findAll() {
        const orders = await orderModel.find().sort({ date: -1 });
        return orders;
    },
    async update(orderId, status) {
        const order = await orderModel.findById({ _id: orderId });
        if (!order) {
            throw new Error("Order not found");
        }
        await orderModel.findByIdAndUpdate(orderId, { status: status }, { new: true });
    }
};
//# sourceMappingURL=order.service.js.map