import axios from 'axios';
import { IProductElasticBase } from '~/interfaces/product';

export async function getProductsByCar(
  carSlug: string,
  catSlug?: string
): Promise<IProductElasticBase> {
  let url = `http://localhost:8000/api/product/jsontest?q=${carSlug}`;

  if (catSlug) {
    url = `http://localhost:8000/api/product/jsontest?q=${carSlug}&cat=${catSlug}`;
  }
  const prom = await axios(url);
  return prom.data;
}
export async function getProductsAll(): Promise<any> {
  const prom = await axios(`http://localhost:8000/api/product/jsontest?q=all`);

  return prom.data;
}
