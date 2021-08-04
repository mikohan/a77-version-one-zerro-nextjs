// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { footerData, SITE_DOMAIN_FULL } from '~/config';

export default function HomeHead() {
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
            foundingDate: '2007',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_DOMAIN_FULL}/search?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </Head>
  );
}
