import axios from 'axios';
import { IProductElasticBase } from '~/interfaces/product';

export async function getProductsByCar(
  slug: string
): Promise<IProductElasticBase> {
  const prom = await axios(
    `http://localhost:8000/api/product/jsontest?q=${slug}`
  );
  return prom.data;
}
export async function getProductsAll(): Promise<any> {
  const prom = await axios(`http://localhost:8000/api/product/jsontest?q=all`);

  return prom.data;
}
