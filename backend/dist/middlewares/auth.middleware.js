import jwt from 'jsonwebtoken';
const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!req.body) {
            req.body = {};
        }
        req.body.userId = token_decode.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: 'Error'
        });
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map