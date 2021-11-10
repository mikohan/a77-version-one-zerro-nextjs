import React from 'react';
import { getProductsAll } from '~/endpoints/productEndpoint';
import { IProductElasticHitsSecond } from '~/interfaces';

const Sitemap = () => {
  return <div>Yandex page</div>;
};
const formatedTimestamp = () => {
  const d = new Date();
  const date = d.toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return `${date} ${time}`;
};
const current = formatedTimestamp();

export const getServerSideProps = async ({ res }: any) => {
  const products = await getProductsAll();

  let offer = '';
  let prod: IProductElasticHitsSecond;
  let i: number;
  let count = 0;
  for ([i, prod] of products.hits.hits.entries()) {
    /* console.log(prod[0], prod[1]); */
    const p = prod._source;
    if (!p) {
      continue;
    }

    if (
      p.images &&
      p.images.length &&
      p.stocks &&
      p.category &&
      p.category.length
    ) {
      if (p.stocks.length && p.stocks[0].price) {
        let quantity = 1;
        try {
          quantity = p.stocks[0].quantity;
        } catch (e) {
          quantity = 1;
        }
        const price = p.stocks.length ? p.stocks[0].price : 0;
        if (quantity == 0) {
          quantity = 1;
        }
        quantity = quantity + 20;
        offer += `<offer id="${p.one_c_id}">
                    <count>${quantity}</count>
                    <price>${price}</price>
                    <currencyId>RUR</currencyId>
                </offer>\n`;
        count++;
      }
    }
  }

  console.log('Total products in yandex: ', count);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <yml_catalog date="${current}">
        <shop>
            <name>Ангара</name>
            <company>Запчасти для грузовиков и автобусов</company>
            <url>https://angara77.com</url>
            <currencies>
                <currency id="RUR" rate="1"/>
            </currencies>
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

