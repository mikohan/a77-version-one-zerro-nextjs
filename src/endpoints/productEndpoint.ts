import axios from 'axios';
import { elasticApiUrl, elasticApiSearchUrl } from '~/config';
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
export async function getProductsBySearch(
  finalUrl: string
): Promise<IProductElasticBase> {
  const url = encodeURI(`${elasticApiSearchUrl}${finalUrl}`);
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
        stocks {
          price
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

export async function getProduct(slug: string): Promise<IProduct> {
  const query = gql`
    query product($slug: String!) {
      product(slug: $slug) {
        id
        slug
        name
        name2
        fullName
        oneCId
        sku
        active
        unit
        catNumber
        oemNumber
        brand {
          id
          slug
          name
          country
          image
        }
        related
        category {
          id
          name
          slug
          parent
        }
        model {
          id
          model
          slug
          image
          priority
          rusname
          make {
            slug
            name
            id
            country
          }
        }
        engine {
          id
          name
          image
        }
        excerpt
        description
        createdDate
        updatedDate
        hasPhoto
        images {
          img150
          img245
          img500
          img800
          img150x150
          img245x245
          img500x500
          img800x800
          main
        }
        video
        attributes {
          name
          value
        }
        stocks {
          price
          store
        }
        bages
        rating {
          score
          autouser
        }
        condition
      }
    }
  `;
  const promise = await client.query({
    query: query,
    variables: {
      slug: slug,
    },
  });
  const data = await promise.data.product;
  return data;
}
