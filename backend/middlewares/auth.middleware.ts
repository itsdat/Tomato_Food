import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    try {
        const token_decode = jwt.verify(token as string, process.env.JWT_SECRET as string) as unknown as DecodedToken;
        
        if (!req.body) {
            req.body = {};
        }
        req.body.userId = token_decode.id
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: 'Error'
        })
    }
}

export default authMiddleware;