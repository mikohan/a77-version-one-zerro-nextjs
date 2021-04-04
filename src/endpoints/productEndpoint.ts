import axios from 'axios';
import { elasticApiUrl } from '~/config';
import { IProductElasticBase } from '~/interfaces/product';

export async function getProductsByCar(
  carSlug: string,
  pageFrom: number,
  pageSize: number,
  catSlug?: string
): Promise<IProductElasticBase> {
  let url = `http://localhost:8000/api/product/jsontest?model=${carSlug}&page_from=${pageFrom}&page_size=${pageSize}`;

  if (catSlug) {
    url = `http://localhost:8000/api/product/jsontest?model=${carSlug}&category=${catSlug}&page_from=${pageFrom}&page_size=${pageSize}`;
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

export async function getProductsByCarModel(
  modelSlug: string
): Promise<IProductElasticBase> {
  const prom = await axios(
    `http://localhost:8000/api/product/jsontest?model=${modelSlug}`
  );

  return prom.data;
}

export async function getProductsByFilters(
  finalUrl: string
): Promise<IProductElasticBase> {
  const url = encodeURI(`${elasticApiUrl}${finalUrl}`);
  const prom = await axios(url);

  return prom.data;
}
