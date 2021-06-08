// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { capitalize } from '~/utils';
import { IProduct } from '~/interfaces';

interface IProps {
  product: IProduct;
}

export default function ProductPageHead({ product }: IProps) {
  const mk = capitalize(product.name);
  console.log(product);
  return (
    <Head>
      <title key="title">Запчасти {mk} в наличии | Angara 77 Parts</title>
      <meta
        key="description"
        name="description"
        content={`Запчасти для ${mk} с доставкой и со склада в интерет магазине АНГАРА77 | Звоните ${footerData.SHOP_PHONE}!`}
      />
      <meta
        key="og:title"
        property="og:title"
        content="Get your car in perfect health | Angara Parts | About Us"
      />
      <meta
        key="og:url"
        property="og:url"
        content={`${SITE_DOMAIN_FULL}/about`}
      />
      <meta key="og:image" property="og:image" content="/favicon.png" />
      <meta key="og:image:type" property="og:image:type" content="image/png" />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:hight" property="og:image:hight" content="630" />

      <meta
        key="og:image:alt"
        property="og:image:alt"
        content="Angara 77 logo"
      />
      <link
        rel="canonical"
        key="canonical"
        href={`${SITE_DOMAIN_FULL}/about`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: 'Example product',
            image: [
              'https://example.com/photos/1x1/photo.jpg',
              'https://example.com/photos/4x3/photo.jpg',
              'https://example.com/photos/16x9/photo.jpg',
            ],
            description:
              'Example product is the best example product out there. Make sure to get the one and only -- the original.',
            sku: '0374984678',
            mpn: '738930',
            brand: {
              '@type': 'Brand',
              name: 'Example',
            },
            review: {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '4',
                bestRating: '5',
              },
              author: {
                '@type': 'Person',
                name: 'Hank Williams',
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.7',
              reviewCount: '1455',
            },
            offers: {
              '@type': 'Offer',
              url: 'https://example.com/product',
              priceCurrency: 'USD',
              price: '49.99',
              priceValidUntil: '2021-11-20',
              itemCondition: 'https://schema.org/NewCondition',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
    </Head>
  );
}
