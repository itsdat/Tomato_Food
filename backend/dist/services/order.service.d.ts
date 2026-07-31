import type { IOrder } from "../interfaces/order.interface.js";
export declare const OrderService: {
    create(data: IOrder): Promise<import("mongoose").Document<unknown, {}, IOrder, {}, import("mongoose").DefaultSchemaOptions> & IOrder & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findMulti(userId: string): Promise<(import("mongoose").Document<unknown, {}, IOrder, {}, import("mongoose").DefaultSchemaOptions> & IOrder & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, IOrder, {}, import("mongoose").DefaultSchemaOptions> & IOrder & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    update(orderId: string, status: string): Promise<void>;
};
//# sourceMappingURL=order.service.d.ts.map