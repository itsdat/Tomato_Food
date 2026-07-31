import adminModel from "../models/admin.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id: string) => {
    return jwt.sign({id}, process.env.JWT_SECRET as string)
}

export const AdminService = {
    async login(data: {email: string, password: string}){
        const admin = await adminModel.findOne({email: data?.email});
        if(!admin){
            throw new Error("Incorrect email or password");
        };

        const isMatch = await bcrypt.compare(data.password, admin.password);
        if(!isMatch){
            throw new Error("Incorrect email or password");
        };
        
        const token = createToken(admin._id as any);
        return token;
    }
}