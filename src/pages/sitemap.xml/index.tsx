import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import {
  ICategory,
  IMake,
  IProduct,
  ICar,
  IBlogCategory,
  IPost,
} from '~/interfaces';
import { getProductsAll, getProductsByCar } from '~/endpoints/productEndpoint';
import url from '~/services/url';
import { SITE_DOMAIN_FULL } from '~/config';
import { getMakes, getVehicles } from '~/endpoints/carsEndpoint';
import { getBlogCategories, getPosts } from '~/endpoints/blogEndpoint';

const Sitemap = () => {
  return <div>Yandex page</div>;
};

interface ISitemap {
  loc: string;
  lastmod: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const promise = await getProductsAll();
  const products = promise.hits.hits;
  const categories = promise.aggregations.categories.buckets;
  const prodUrls: any = [];
  const fields: ISitemap[] = [];

  const makes = await getMakes();
  makes.forEach((make: IMake) => {
    fields.push({
      loc: `${SITE_DOMAIN_FULL}${url.make(make.slug)}`, // Absolute url
      lastmod: new Date().toISOString(),
    });
  });

  const models = await getVehicles();
  models.forEach((model: ICar) => {
    fields.push({
      loc: `${SITE_DOMAIN_FULL}${url.model(model.make.slug, model.slug)}`, // Absolute url
      lastmod: new Date().toISOString(),
    });
  });

  for (let model of models) {
    const catsProm = await getProductsByCar(model.slug, 1, 20);
    const cats = catsProm.aggregations.categories.buckets;
    cats.forEach((item: ICategory) => {
      fields.push({
        loc: `${SITE_DOMAIN_FULL}${url.category(
          model.make.slug,
          model.slug,
          item.slug
        )}`, // Absolute url
        lastmod: new Date().toISOString(),
      });
    });
  }

  // Createing categories for non car parts
  categories.forEach((cat: ICategory) => {
    fields.push({
      loc: `${SITE_DOMAIN_FULL}${url.autogoodsCategory(cat.slug)}`, // Absolute url
      lastmod: new Date().toISOString(),
    });
  });

  products.forEach((item: any) => {
    const product: IProduct = item._source;
    fields.push({
      loc: `${SITE_DOMAIN_FULL}/product/${product.slug}`, // Absolute url
      lastmod: new Date().toISOString(),
    });
  });

  const blogCats = await getBlogCategories();
  blogCats.forEach((item: IBlogCategory) => {
    fields.push({
      loc: `${SITE_DOMAIN_FULL}${url.blogCategory(item.slug)}`, // Absolute url
      lastmod: new Date().toISOString(),
    });
  });
  const posts = await getPosts();
  posts.forEach((item: IPost) => {
    fields.push({
      loc: `${SITE_DOMAIN_FULL}${url.post(item.slug)}`, // Absolute url
      lastmod: new Date().toISOString(),
    });
  });
  // console.log(fields.length);

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default Sitemap;
