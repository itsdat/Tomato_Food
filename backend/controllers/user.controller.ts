import type { Request, Response } from "express";
import { userService } from "../services/user.service.js";

export const UserController = {
    async login(req: Request, res: Response){
        try {
            const user = await userService.login(req.body);
            res.status(200).json({
                success: true,
                message: "Login Successfully",
                data: user
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

    async register(req: Request, res: Response){
        try {
            const user = await userService.register(req.body);
            res.status(201).json({
                success: true,
                message: "Register Successfully",
                data: user
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
}