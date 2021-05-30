export interface IOrderProducts {
  product_name: string;
  product_id: number;
  product_price: string | number;
  product_car: string;
  product_brand: string;
  product_image: string | null | undefined;
  product_slug: string;
  qty: number;
}

export interface IOrder {
  id?: number | string;
  date?: Date;
  total?: number;
  order_products: IOrderProducts[];
  number: string;
  user: number | string | null;
  autouser: string;
  status: string;
  delivery: string;
  payment: string;
  total_front: number | null;
  city: string | null | undefined;
  address: string | null | undefined;
  phone: string;
  email: string;
}
