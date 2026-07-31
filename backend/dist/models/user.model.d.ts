import mongoose from "mongoose";
import type { IUser } from "../interfaces/user.interface.js";
declare const userModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default userModel;
//# sourceMappingURL=user.model.d.ts.map