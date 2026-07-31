import type { NextFunction, Request, Response } from "express";
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default authMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map