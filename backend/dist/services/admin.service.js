import adminModel from "../models/admin.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};
export const AdminService = {
    async login(data) {
        const admin = await adminModel.findOne({ email: data?.email });
        if (!admin) {
            throw new Error("Incorrect email or password");
        }
        ;
        const isMatch = await bcrypt.compare(data.password, admin.password);
        if (!isMatch) {
            throw new Error("Incorrect email or password");
        }
        ;
        const token = createToken(admin._id);
        return token;
    }
};
//# sourceMappingURL=admin.service.js.map