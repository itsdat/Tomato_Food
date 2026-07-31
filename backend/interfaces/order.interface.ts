export type TOrderStatus = 'Food Processing' | 'Out for delivery' | 'Delivered';

export interface IOrder extends Document{
    userId: string;
    items: [],
    amount: number,
    address: Object,
    status: TOrderStatus,
    date: Date,
    payment: boolean
}