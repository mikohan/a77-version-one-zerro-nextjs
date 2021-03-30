import axios from 'axios';
import { IProductElasticBase } from '~/interfaces/product';

export async function getProductsByCar(
  carSlug: string,
  catSlug?: string
): Promise<IProductElasticBase> {
  let url = `http://localhost:8000/api/product/jsontest?model=${carSlug}`;

  if (catSlug) {
    url = `http://localhost:8000/api/product/jsontest?model=${carSlug}&category=${catSlug}`;
  }
  const prom = await axios(url);
  return prom.data;
}
export async function getProductsAll(): Promise<any> {
  const prom = await axios(
    `http://localhost:8000/api/product/jsontest?model=all`
  );

  return prom.data;
}

export async function getProductsByMake(
  makeSlug: string
): Promise<IProductElasticBase> {
  const prom = await axios(
    `http://localhost:8000/api/product/jsontest?make=${makeSlug}`
  );

  return prom.data;
}
export async function getProductsByFilters(
  modelSlug: string,
  catSlug: string,
  brandSlug: string
): Promise<IProductElasticBase> {
  let str = '';
  if (brandSlug) {
    const arr = brandSlug.split(',');
    arr.forEach((brand: string) => {
      str += '&brand=' + brand;
    });
  }
  const url = `http://localhost:8000/api/product/jsontest?model=${modelSlug}&category=${catSlug}${str}`;
  console.log(url);
  const prom = await axios(url);

  return prom.data;
}
