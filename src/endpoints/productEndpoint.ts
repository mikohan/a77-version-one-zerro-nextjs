import axios from 'axios';
import { elasticApiUrl } from '~/config';
import { IProductElasticBase } from '~/interfaces/product';
import { ICar } from '~/interfaces/ICar';
import { IProduct } from '~/interfaces';
import { gql } from '@apollo/client';
import { IMake } from '~/interfaces/IMake';
import { client } from './apolloClient';

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

export async function getPopularProductsByModel(
  slug: string,
  quantity: number
): Promise<IProduct> {
  const query = gql`
    query vehicle($slug: String!, $quantity: Int!) {
      popularProducts(slug: $slug, quantity: $quantity) {
        id
        slug
        name
        fullName
        sku
        catNumber
        bages
        images {
          img150
          img245
          img500
          img150x150
          img245x245
          img500x500
          main
        }
        model {
          slug
          model
          make {
            slug
            name
          }
        }
      }
    }
  `;
  const promise = await client.query({
    query: query,
    variables: {
      slug: slug,
      quantity: quantity,
    },
  });
  const data = await promise.data.popularProducts;
  return data;
}
