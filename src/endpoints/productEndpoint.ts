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
export async function getSimilarProductsByModel(
  modelSlug: string,
  query: string
): Promise<IProductElasticBase> {
  const url = encodeURI(
    `http://localhost:8000/api/product/similar?model=${modelSlug}&q=${query}`
  );
  const prom = await axios(url);

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

// Together products
export async function getTogetherProducts(slug: string): Promise<IProduct[]> {
  const query = gql`
    query togetherProduct($slug: String!) {
      togetherProduct(slug: $slug) {
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
        brand {
          name
          country
        }
        stocks {
          price
        }
        engine {
          name
          id
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
      slug,
    },
  });
  const data = await promise.data.togetherProduct;
  return data;
}

// similar products
export async function getSimilarProducts(
  slug: string,
  quantity: number
): Promise<IProduct[]> {
  const query = gql`
    query similarProducts($slug: String!, $quantity: Int!) {
      similarProducts(slug: $slug, quantity: $quantity) {
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
        brand {
          name
          country
        }
        stocks {
          price
        }
        engine {
          name
          id
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
      slug,
      quantity,
    },
  });
  const data = await promise.data.similarProducts;
  return data;
}

export async function getProductAnalogs(
  catNumber: string,
  productId: number
): Promise<IProduct[]> {
  const query = gql`
    query analogs($catNumber: String!, $productId: Int!) {
      analogs(catNumber: $catNumber, productId: $productId) {
        id
        slug
        name
        fullName
        sku
        catNumber
        bages
        brand {
          name
          country
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
      catNumber,
      productId,
    },
  });
  const data = await promise.data.analogs;
  return data;
}

export async function getPopularProductsByModel(
  slugs: string[],
  quantity: number
): Promise<IProduct[]> {
  const query = gql`
    query popularProducts($slugs: [String], $quantity: Int!) {
      popularProducts(slugs: $slugs, quantity: $quantity) {
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
        brand {
          name
          country
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
      slugs: slugs,
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
        related {
          id
          slug
          name
          catNumber
          model {
            slug
            model
          }
          images {
            img500
            img245
            img150
          }
          stocks {
            price
            store
          }
        }
        brand {
          name
          country
        }
        model {
          slug
          model
        }
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
          dimension {
            width
            height
          }
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
        rating
        ratingCount
        condition
        breads {
          slug
          name
        }
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

export async function getProductRating(productId: number): Promise<IProduct> {
  const query = gql`
    query productRating($productId: Int!) {
      productRating(productId: $productId) {
        rating
        ratingCount
      }
    }
  `;
  const promise = await client.query({
    query: query,
    variables: {
      productId,
    },
  });
  const data = await promise.data.productRating;
  return data;
}
