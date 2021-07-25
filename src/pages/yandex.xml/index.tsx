import React from 'react';
import { getProductsAll } from '~/endpoints/productEndpoint';
import { siteUrl } from '~/config';

const Sitemap = () => {
  return <div>Yandex page</div>;
};

export const getServerSideProps = async ({ res }: any) => {
  const products = await getProductsAll();
  console.log(products.hits.hits[0]);

  let offer = '';
  for (let prod of products.hits.hits) {
    `<offer id="${prod.id}">
                    <name>${prod.name} ${prod.model[0]}</name>
                    <url>${siteUrl}/${prod.slug}</url>
                    <price>8990</price>
                    <currencyId>RUR</currencyId>
                    <categoryId>10</categoryId>
                    <delivery>true</delivery>
                    <delivery-options>
                        <option cost="300" days="1" order-before="18"/>
                    </delivery-options>
                    <param name="Цвет">белый</param>
                    <weight>3.6</weight>
                    <dimensions>20.1/20.551/22.5</dimensions>
                </offer>`;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <yml_catalog date="2020-11-22T14:37:38+03:00">
        <shop>
            <name>BestSeller</name>
            <company>Tne Best inc.</company>
            <url>http://best.seller.ru</url>
            <currencies>
                <currency id="RUR" rate="1"/>
            </currencies>
            <categories>
                <category id="1">Бытовая техника</category>
                <category id="10" parentId="1">Мелкая техника для кухни</category>
            </categories>
            <delivery-options>
                <option cost="200" days="1"/>
            </delivery-options>
            <offers>
                <offer id="9012">
                    <name>Мороженица Brand 3811</name>
                    <url>http://best.seller.ru/product_page.asp?pid=12345</url>
                    <price>8990</price>
                    <currencyId>RUR</currencyId>
                    <categoryId>10</categoryId>
                    <delivery>true</delivery>
                    <delivery-options>
                        <option cost="300" days="1" order-before="18"/>
                    </delivery-options>
                    <param name="Цвет">белый</param>
                    <weight>3.6</weight>
                    <dimensions>20.1/20.551/22.5</dimensions>
                </offer>
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
