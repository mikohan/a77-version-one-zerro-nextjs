export interface IOrderProducts {
  id: number;
  product_id: number;
  product_price: string | number;
  product_car: string;
  product_brand: string;
  qty: number;
  order: number;
}

export interface IOrder {
  id: number | string;
  date: Date;
  number: string;
  user: number | string;
  total: number;
  autouser: string;
  order_products: IOrderProducts[];
  status: string;
}
