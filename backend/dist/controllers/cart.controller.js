import { cartService } from "../services/cart.service.js";
export const CartController = {
    async update(req, res) {
        try {
            const item = await cartService.update(req.body.userId, req.body.itemId);
            res.status(200).json({
                success: true,
                message: "Added to cart",
                data: item
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
    async delete(req, res) {
        try {
            const item = await cartService.delete(req.body.userId, req.body.itemId);
            res.status(200).json({
                success: true,
                message: "Deleted out cart",
                data: item
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
            const carts = await cartService.findMulti(req.body.userId);
            res.status(200).json({
                success: true,
                message: "Success",
                data: carts
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
};
//# sourceMappingURL=cart.controller.js.map