import type { Document } from "mongoose";
export interface IFood extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}
//# sourceMappingURL=food.interface.d.ts.map