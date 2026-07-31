import mongoose from "mongoose";
import type { IFood } from "../interfaces/food.interface.js";
declare const foodModel: mongoose.Model<IFood, {}, {}, {}, mongoose.Document<unknown, {}, IFood, {}, mongoose.DefaultSchemaOptions> & IFood & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IFood>;
export default foodModel;
//# sourceMappingURL=food.model.d.ts.map