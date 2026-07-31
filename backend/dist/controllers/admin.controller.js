import { AdminService } from "../services/admin.service.js";
export const AdminController = {
    async login(req, res) {
        try {
            const user = await AdminService.login(req.body);
            res.status(200).json({
                success: true,
                message: "Welcome back, Admin",
                data: user
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
//# sourceMappingURL=admin.controller.js.map