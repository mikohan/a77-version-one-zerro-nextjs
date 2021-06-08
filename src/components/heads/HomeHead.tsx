// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { capitalize } from '~/utils';
import { ICar, IProduct } from '~/interfaces';
import url from '~/services/url';

interface IProps {
  product: IProduct;
}

export default function ProductPageHead() {
  return (
    <Head>
      <title key="title">
        Интернет магазин запчастей для коммерческого транспорта | Angara 77
        Parts
      </title>
      <meta
        key="description"
        name="description"
        content={`Запчасти с доставкой и со склада в интерет магазине АНГАРА77 | Звоните ${footerData.SHOP_PHONE}!`}
      />
      <link rel="canonical" key="canonical" href={`${SITE_DOMAIN_FULL}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Organization',
            name: 'Ангара Запчасти',
            url: SITE_DOMAIN_FULL,
            logo: `${SITE_DOMAIN_FULL}/images/local/logo.png`,
            foundingDate: '1985',
            sameAs: [
              'https://www.facebook.com/brand/',
              'https://twitter.com/brand',
              'https://www.instagram.com/brand/',
              'https://www.pinterest.co.uk/brand/',
              'https://www.youtube.com/user/brand',
            ],
          }),
        }}
      />
    </Head>
  );
}
