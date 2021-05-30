export interface IOrderProducts {
  id: number;
  product_name: string;
  product_id: number;
  product_price: string | number;
  product_car: string;
  product_brand: string;
  product_image: string | null;
  product_slug: string;
  qty: number;
}

export interface IOrder {
  order_products: IOrderProducts[];
  id: number | string;
  date: Date;
  number: string;
  user: number | string;
  autouser: string;
  total: number;
  status: string;
  delivery: string;
  payment: string;
  total_front: number | null;
  city: string | null;
  address: string | null;
  phone: string;
  email: string;
}
