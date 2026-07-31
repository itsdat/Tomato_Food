import { OrderService } from "../services/order.service.js";
export const OrderController = {
    async create(req, res) {
        try {
            const { userId, items, amount, address } = req.body;
            const newOrder = await OrderService.create({
                userId,
                items,
                amount,
                address,
            });
            res.status(200).json({
                success: true,
                message: "Your order has been placed.",
                orderId: newOrder._id
            });
        }
        catch (error) {
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({
                    success: false,
                    message: messages[0]
                });
            }
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async findMulti(req, res) {
        try {
            const orders = await OrderService.findMulti(req.body.userId);
            res.status(200).json({
                success: true,
                message: "Success",
                data: orders
            });
        }
        catch (error) {
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({
                    success: false,
                    message: messages[0]
                });
            }
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async findAll(req, res) {
        try {
            const orders = await OrderService.findAll();
            res.status(200).json({
                success: true,
                message: "Success",
                data: orders
            });
        }
        catch (error) {
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({
                    success: false,
                    message: messages[0]
                });
            }
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async update(req, res) {
        try {
            const updateOrder = await OrderService.update(req.body.orderId, req.body.status);
            res.status(200).json({
                success: true,
                message: "Success",
                data: updateOrder
            });
        }
        catch (error) {
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({
                    success: false,
                    message: messages[0]
                });
            }
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
};
//# sourceMappingURL=order.controller.js.map