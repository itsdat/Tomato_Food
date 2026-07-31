import type { Request, Response } from "express";
import { AdminService } from "../services/admin.service.js";

export const AdminController = {
    async login(req: Request, res: Response){
        try {
            const user = await AdminService.login(req.body);
            res.status(200).json({
                success: true,
                message: "Welcome back, Admin",
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
    }
}