import mongoose from "mongoose";
import type { IOrder } from "../interfaces/order.interface.js";
declare const orderModel: mongoose.Model<IOrder, {}, {}, {}, mongoose.Document<unknown, {}, IOrder, {}, mongoose.DefaultSchemaOptions> & IOrder & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IOrder>;
export default orderModel;
//# sourceMappingURL=order.model.d.ts.map