import type { ICommon } from "./common.interface";

export type TOrderStatus = 'Food Processing' | 'Out for delivery' | 'Delivered';

export interface IOrder extends ICommon{
    userId: string;
    items: [],
    amount: number,
    address: Object,
    status: TOrderStatus,
    date: Date,
    payment: boolean
}