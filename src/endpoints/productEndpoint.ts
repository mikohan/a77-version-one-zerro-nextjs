import axios from 'axios';
import { backServerUrl, elasticApiUrl, elasticApiSearchUrl } from '~/config';
import { IProductElasticBase } from '~/interfaces/product';
import { IProduct } from '~/interfaces';
import { gql } from '@apollo/client';
import { client } from './apolloClient';
// Comment

export async function getProductsByCar(
  carSlug: string,
  pageFrom: number,
  pageSize: number,
  catSlug?: string
): Promise<IProductElasticBase> {
  let url = `${backServerUrl}/api/product/jsontest?model=${carSlug}&page_from=${pageFrom}&page_size=${pageSize}`;

  if (catSlug) {
    url = `${backServerUrl}/api/product/jsontest?model=${carSlug}&category=${catSlug}&page_from=${pageFrom}&page_size=${pageSize}`;
  }
  const prom = await axios(url);
  return prom.data;
}
export async function getProductsAll(): Promise<any> {
  const prom = await axios(`${backServerUrl}/api/product/jsontest?model=all`);

  return prom.data;
}

export async function getLatestProducts(
  limit: number = 10
): Promise<IProductElasticBase> {
  const url = encodeURI(
    `${backServerUrl}/api/product/latest?q=latest&limit=${limit}`
  );
  const prom = await axios(url);

  return prom.data;
}
export async function getSimilarProductsByModel(
  modelSlug: string,
  query: string
): Promise<IProductElasticBase> {
  const url = encodeURI(
    `${backServerUrl}/api/product/similar?model=${modelSlug}&q=${query}`
  );
  const prom = await axios(url);

  return prom.data;
}

// Getting product by tag for blog or whatever
// May use several words in query
export async function getProductsByTagOrTags(
  query: string,
  limit: number
): Promise<IProductElasticBase> {
  const url = encodeURI(
    `${backServerUrl}/api/product/bytag?q=${query}&limit=${limit}`
  );
  const prom = await axios(url);

  return prom.data;
}

export async function getProductsByMake(
  makeSlug: string,
  page_size: number = 20,
  page_from: number = 0
): Promise<IProductElasticBase> {
  const prom = await axios(
    `${backServerUrl}/api/product/jsontest?make=${makeSlug}&page_size=${page_size}&page_from=${page_from}`
  );

  return prom.data;
}

export async function getProductsByCarModel(
  modelSlug: string
): Promise<IProductElasticBase> {
  const prom = await axios(
    `${backServerUrl}/api/product/jsontest?model=${modelSlug}`
  );

  return prom.data;
}

export async function getProductsByFilters(
  finalUrl: string
): Promise<IProductElasticBase> {
  const url = encodeURI(`${backServerUrl}/api/product/jsontest_v2${finalUrl}`);
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
          dimension {
            width
            height
          }
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
          dimension {
            width
            height
          }
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
          dimension {
            width
            height
          }
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

export async function getProductByOneC(oneCId: number): Promise<IProduct> {
  const query = gql`
    query productOneC($onec: Int!) {
      productOneC(onec: $onec) {
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
      onec: oneCId,
    },
  });
  const data = await promise.data.productOneC;
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
