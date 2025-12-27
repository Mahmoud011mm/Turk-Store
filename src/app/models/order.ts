import { CartItem } from "./cart";

export type Order = {
    id: string;
    userId: string;
    total: number;
    items: CartItem[],
    paymentStats: 'success' | 'failure'
}