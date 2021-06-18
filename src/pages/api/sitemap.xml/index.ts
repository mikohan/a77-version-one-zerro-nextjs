import React from 'react';
import {
  getProductsAll,
  getProductsByCarModel,
} from '~/endpoints/productEndpoint';
import {
  getMakes,
  getVehiclesByMake,
  getVehicles,
} from '~/endpoints/carsEndpoint';
import {
  IMake,
  IProduct,
  IProductElasticBase,
  IProductElasticHitsFirst,
  IProductElasticHitsSecond,
  ICar,
  IPost,
} from '~/interfaces';
import { getPosts, getBlogCategories } from '~/endpoints/blogEndpoint';
// import { SitemapStream, streamToPromise } from "sitemap";
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

interface IUrl {
  url: string;
  changefreq: string;
  priority: number;
}

export default async (req: any, res: any) => {
  try {
    // An array with your links
    const links: IUrl[] = [];
    // Cars urls
    const ms = await getMakes();
    ms.map((make: IMake) => {
      links.push({
        url: `/${make.slug}`,
        changefreq: 'daily',
        priority: 0.9,
      });
    });

    for (let make of ms) {
      const mods = await getVehiclesByMake(make.slug);
      mods.map((model: ICar) => {
        links.push({
          url: `/${make.slug}/${model.slug}`,
          changefreq: 'daily',
          priority: 0.9,
        });
      });
    }

    const allModels = await getVehicles();
    for (const vehicle of allModels) {
      const prods: IProductElasticBase = await getProductsByCarModel(
        vehicle.slug
      );
      for (const category of prods.aggregations.categories.buckets) {
        links.push({
          url: `${vehicle.make.slug}/${vehicle.slug}/${category.slug}`,
          changefreq: 'daily',
          priority: 0.7,
        });
      }
    }

    const products: IProductElasticBase = await getProductsAll();
    products.hits.hits.map((item: IProductElasticHitsSecond) => {
      links.push({
        url: `/products/${item._source.slug}`,
        changefreq: 'daily',
        priority: 0.9,
      });
    });

    const blogCats = await getBlogCategories();
    blogCats.map((cat: any) => {
      links.push({
        url: `/blog/category/${cat.slug}`,
        changefreq: 'daily',
        priority: 0.8,
      });
    });
    const posts = await getPosts();
    posts.map((post: IPost) => {
      links.push({
        url: `/blog/post/${post.slug}`,
        changefreq: 'daily',
        priority: 0.9,
      });
    });

    // Add other pages
    const pages = ['/about', '/contact', '/warranty', '/delivery', '/delivery'];
    pages.map((url) => {
      links.push({
        url,
        changefreq: 'daily',
        priority: 0.3,
      });
    });

    // console.log(links.length, 'Lenght of links');

    // Create a stream to write to
    const stream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });

    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data: any) => data.toString());

    res.end(xmlString);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
};
