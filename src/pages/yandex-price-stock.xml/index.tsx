import React from 'react';
import { getProductsAll } from '~/endpoints/productEndpoint';
import { IProductElasticHitsSecond, IProduct } from '~/interfaces';

const Sitemap = () => {
  return <div>Yandex page</div>;
};

const createCount = (product: IProduct) => {
  let count = 0;
  if (maslo_lst.includes(parseInt(product.one_c_id))) {
    count = 10;
  } else {
    count = product.stocks[0].quantity;
  }
  return count;
};

export const getServerSideProps = async ({ res }: any) => {
  const formatedTimestamp = () => {
    const d = new Date();
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`;
  };
  const current = formatedTimestamp();
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
      p.name.toLowerCase().includes('стекло') &&
      p.name.toLowerCase().includes('лобовое')
    ) {
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
        let quantity = 0;
        try {
          quantity = createCount(p);
          // Changed here check it in future
          if (p.name.toLowerCase().includes('бампер')) {
            quantity = 0;
          }
        } catch (e) {
          quantity = 0;
        }
        const price = p.stocks.length ? p.stocks[0].price : 0;
        if (price < 100) {
          quantity = 0;
        }
        // added some comment
        offer += `<offer id="${p.one_c_id}">
                    <availability>yes</availability>
                    <count>${quantity}</count>
                    <price>${price}</price>
                    <currencyId>RUR</currencyId>
                </offer>\n`;
        count++;
      }
    }
  }
  offer += `<offer id="fedor00001">
                    <availability>yes</availability>
                    <count>20</count>
                    <price>13070</price>
                    <currencyId>RUR</currencyId>
                </offer>\n`;
  offer += `<offer id="fedor00002">
                    <availability>yes</availability>
                    <count>20</count>
                    <price>10895</price>
                    <currencyId>RUR</currencyId>
                </offer>\n`;

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

const maslo_lst = [
  24962, 3226, 25332, 24684, 24700, 16567, 23850, 24352, 16330, 16683, 16674,
  23048, 14569, 24821, 24628, 14567, 24813, 24740, 25469, 22752, 22641, 24644,
  11145, 24549, 23714, 11189, 23715, 15768, 15791, 24260, 23318, 24698, 15803,
  23853, 24194, 3615, 25305, 23704, 24094, 25486, 25087, 25467, 25489, 25487,
  23780, 23781, 25429, 25088, 25482, 25483, 25485, 25484, 25481, 24859, 23463,
  24861, 24862, 25453, 3434,
];
