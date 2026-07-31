import type { Request, Response } from "express";
import { OrderService } from "../services/order.service.js";
import type { IOrder } from "../interfaces/order.interface.js";

export const OrderController = {
    async create(req: Request, res: Response){
        try {
            const { userId, items, amount, address } = req.body;

            const newOrder = await OrderService.create({
                userId,
                items,
                amount,
                address,
            } as IOrder);

            res.status(200).json({
                success: true,
                message: "Your order has been placed.",
                orderId: newOrder._id
            });
        } catch (error: any) {
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((val: any) => val.message);
                return res.status(400).json({ 
                    success: false, 
                    message: messages[0]
                });
            }
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async findMulti(req: Request, res: Response){
        try {
            const orders = await OrderService.findMulti(req.body.userId);
            res.status(200).json({
                success: true,
                message: "Success",
                data: orders
            });
        } catch (error:any) {
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((val: any) => val.message);
                return res.status(400).json({ 
                    success: false, 
                    message: messages[0]
                });
            }
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async findAll(req: Request, res: Response){
        try {
            const orders = await OrderService.findAll();
            res.status(200).json({
                success: true,
                message: "Success",
                data: orders
            });
        } catch (error:any) {
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((val: any) => val.message);
                return res.status(400).json({ 
                    success: false, 
                    message: messages[0]
                });
            }
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async update(req: Request, res: Response){
        try {
            const updateOrder = await OrderService.update(req.body.orderId as string, req.body.status);
            res.status(200).json({
                success: true,
                message: "Success",
                data: updateOrder
            });
        } catch (error:any) {
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((val: any) => val.message);
                return res.status(400).json({ 
                    success: false, 
                    message: messages[0]
                });
            }
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
}