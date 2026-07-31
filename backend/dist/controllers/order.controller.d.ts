import type { Request, Response } from "express";
export declare const OrderController: {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    findMulti(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=order.controller.d.ts.map