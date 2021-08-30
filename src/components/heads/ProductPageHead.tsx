// Needs to add Schema.org and refactor og
import Head from 'next/head';
import {
  footerData,
  SITE_DOMAIN_FULL,
  imageServerUrl,
  COMPANY_INFORMATION,
} from '~/config';
import { capitalize } from '~/utils';
import { IBread, ICar, IProduct } from '~/interfaces';
import url from '~/services/url';

interface IProps {
  product: IProduct;
  breads: IBread[];
}

export default function ProductPageHead({ product, breads }: IProps) {
  const mod = product.model.map((car: ICar) => car.model);
  const mods = mod.join(' ');
  const mk = `${capitalize(product.name)} для ${mods}`;
  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDay()}`;
  const breadItems = breads.map((bread: IBread, i: number) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: bread.name,
    item: `${SITE_DOMAIN_FULL}${bread.path}`,
  }));
  const image =
    product.images && product.images.length
      ? product.images.map((img) => {
          return `${imageServerUrl}${img.img245}`;
        })
      : [`${SITE_DOMAIN_FULL}/images/local/defaultParts245.jpg`];
  return (
    <Head>
      <title key="title">
        {mk} в наличии | {COMPANY_INFORMATION.COMPANY_NAME_ENG}
      </title>
      <meta
        key="description"
        name="description"
        content={`${mk} с доставкой и со склада в интерет магазине ${COMPANY_INFORMATION.COMPANY_NAME_LOGO} | Звоните ${footerData.SHOP_PHONE}!`}
      />
      <link
        rel="canonical"
        key="canonical"
        href={`${SITE_DOMAIN_FULL}${url.product(product.slug)}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: `${mk}`,
            image: image,
            description: `Запчасти для ${mk} с доставкой и со склада в интерет магазине ${COMPANY_INFORMATION.COMPANY_NAME_ENG} | Звоните ${footerData.SHOP_PHONE}!`,
            sku: product.sku,
            mpn: product.catNumber,
            brand: {
              '@type': 'Brand',
              name: product.brand.name,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating ? product.rating : 0,
              ratingCount: product.ratingCount ? product.ratingCount : 0,
            },
            offers: {
              '@type': 'Offer',
              url: `${url.product(product.slug)}`,
              priceCurrency: 'RUB',
              price: product.stocks[0].price,
              priceValidUntil: date,
              itemCondition: 'https://schema.org/NewCondition',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: `${COMPANY_INFORMATION.COMPANY_NAME}`,
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadItems,
          }),
        }}
      />
    </Head>
  );
}
