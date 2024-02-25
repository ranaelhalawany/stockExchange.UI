export interface Order {
    id: number;
    userId: string;
    stock_symbol: string;
    quantity: number;
    order_type:string;
    timestamp: Date;
  }
