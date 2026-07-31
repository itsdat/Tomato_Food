import bcrypt from "bcrypt";
import adminModel from "../models/admin.model.js";
const createInitAdmin = async () => {
    try {
        const adminExists = await adminModel.findOne();
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(`${process.env.ADMIN_PASSWORD}`, 10);
            const admin = new adminModel({
                email: `${process.env.ADMIN_EMAIL}`,
                password: hashedPassword,
            });
            await admin.save();
            console.log("Created Admin ✅");
        }
        else {
            console.log("Init Admin: True ✅");
        }
    }
    catch (error) {
        console.error("❌ Lỗi khi kiểm tra/tạo Admin:", error);
    }
};
export default createInitAdmin;
//# sourceMappingURL=initConfig.database.js.map