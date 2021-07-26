import React from 'react';
import { getProductsAll } from '~/endpoints/productEndpoint';
import {
  SITE_DOMAIN_FULL,
  COMPANY_INFORMATION,
  imageServerUrl,
} from '~/config';
import { capitalize } from '~/utils';
import { stripHtml } from '~/utils';

const Sitemap = () => {
  return <div>Yandex page</div>;
};

export const getServerSideProps = async ({ res }: any) => {
  const products = await getProductsAll();

  let count = 0;

  let offer = '';
  for (let [i, prod] of products.hits.hits.entries()) {
    const p = prod._source;

    let brand = p.brand ? stripHtml(p.brand.name) : null;

    if (
      p.images &&
      p.images.length &&
      p.stocks &&
      p.category &&
      p.category.length
    ) {
      if (p.stocks.length) {
        let pictures = '';
        p.images.forEach((img: any) => {
          pictures += '<picture>' + img.img800 + '</picture>\n';
        });
        offer += `<offer id="${p.id}">
                    <name>${p.name} ${capitalize(p.model[0].name)}</name>
                    <url>${SITE_DOMAIN_FULL}/product/${
          p.slug
        }?utm_source=market.yandex.ru</url>
                    <price>${p.stocks[0].price}</price>
                    <currencyId>RUR</currencyId>
                    <categoryId>${
                      p.category[p.category.length - 1].id
                    }</categoryId>
                    ${pictures}
                    <model>${capitalize(p.model[0].name)}</model>
                    <vendor>${brand}</vendor>
                    <vendorCode>${p.cat_number}</vendorCode>
                    <description>${p.description}</description>
                    <delivery>true</delivery>
                    <local_delivery_cost>${
                      COMPANY_INFORMATION.DELIVERY_COST_FROM
                    }</local_delivery_cost>
                </offer>\n`;
        count++;
      }
    }
  }

  const categories = products.aggregations.categories.buckets;
  let cats = '';
  categories.forEach((item: any) => {
    if (!item.parent) {
      cats += `<category id="${item.id}">${item.name}</category>`;
    } else {
      cats += `<category id="${item.id}" parentId="${item.parent}">${item.name}</category>`;
    }
  });
  console.log('Total products in yandex: ', count);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <yml_catalog date="2020-11-22T14:37:38+03:00">
        <shop>
            <name>Ангара</name>
            <company>Запчасти для грузовиков и автобусов</company>
            <url>https://angara77.com</url>
            <currencies>
                <currency id="RUR" rate="1"/>
            </currencies>
            <categories>
            ${cats}
            </categories>
            <delivery-options>
                <option cost="200" days="1"/>
            </delivery-options>
            <offers>
            ${offer}
            </offers>
        </shop>
    </yml_catalog>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
