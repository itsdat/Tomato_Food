import type { ICommon } from "./common.interface";

export interface IFood extends ICommon {
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    imagePublicId?: string;
}