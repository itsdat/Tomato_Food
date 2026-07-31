import type { IUser } from "../interfaces/user.interface.js";
import userModel from "../models/user.model.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id: string) => {
    return jwt.sign({id}, process.env.JWT_SECRET as string)
}

export const userService = {
    async login(data: IUser){
        const user = await userModel.findOne({email: data.email});
        if(!user){
            throw new Error("Incorrect email or password");
        };

        const isMatch = await bcrypt.compare(data.password, user.password);
        if(!isMatch){
            throw new Error("Incorrect email or password");
        };
        
        const token = createToken(user._id as any);
        return token;
    },

    async register(data: IUser){
        const exists = await userModel.findOne({email: data.email});
        if(exists){
            throw new Error("User already exists");
        };

        if(!validator.isEmail(data.email)){
            throw new Error("Please enter a valid email");
        };

        if(data.password as any < 6){
            throw new Error("Please enter strong password");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const newUser = new userModel({
            name: data.name,
            email: data.email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id as any)
        return token;
    },
}