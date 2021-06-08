// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { capitalize } from '~/utils';
import { ICar, IProduct } from '~/interfaces';
import url from '~/services/url';

interface IProps {
  product: IProduct;
}

export default function ProductPageHead({ product }: IProps) {
  console.log(product.model.map((model: ICar) => model.model));
  const mk = capitalize(product.name);
  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDay()}`;
  return (
    <Head>
      <title key="title">Запчасти {mk} в наличии | Angara 77 Parts</title>
      <meta
        key="description"
        name="description"
        content={`Запчасти для ${mk} с доставкой и со склада в интерет магазине АНГАРА77 | Звоните ${footerData.SHOP_PHONE}!`}
      />
      {/* <meta */}
      {/*   key="og:title" */}
      {/*   property="og:title" */}
      {/*   content="Get your car in perfect health | Angara Parts | About Us" */}
      {/* /> */}
      {/* <meta */}
      {/*   key="og:url" */}
      {/*   property="og:url" */}
      {/*   content={`${SITE_DOMAIN_FULL}/about`} */}
      {/* /> */}
      {/* <meta key="og:image" property="og:image" content="/favicon.png" /> */}
      {/* <meta key="og:image:type" property="og:image:type" content="image/png" /> */}
      {/* <meta key="og:image:width" property="og:image:width" content="1200" /> */}
      {/* <meta key="og:image:hight" property="og:image:hight" content="630" /> */}

      {/* <meta */}
      {/*   key="og:image:alt" */}
      {/*   property="og:image:alt" */}
      {/*   content="Angara 77 logo" */}
      {/* /> */}
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
            image: product.images.map((img: any) => img.img245),
            description: `Запчасти для ${mk} с доставкой и со склада в интерет магазине АНГАРА77 | Звоните ${footerData.SHOP_PHONE}!`,
            sku: product.sku,
            mpn: product.catNumber,
            brand: {
              '@type': 'Brand',
              name: product.brand.name,
            },
            review: {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: product.rating,
                bestRating: '5',
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.ratingCount,
            },
            offers: {
              '@type': 'Offer',
              url: 'https://example.com/product',
              priceCurrency: 'RUB',
              price: product.stocks[0].price,
              priceValidUntil: date,
              itemCondition: 'https://schema.org/NewCondition',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
    </Head>
  );
}
