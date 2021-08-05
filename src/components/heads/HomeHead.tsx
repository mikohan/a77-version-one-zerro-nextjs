// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { footerData, SITE_DOMAIN_FULL, COMPANY_INFORMATION } from '~/config';

export default function HomeHead() {
  return (
    <Head>
      <title key="title">
        Интернет магазин запчастей для коммерческого транспорта |{' '}
        {COMPANY_INFORMATION.COMPANY_NAME_ENG} - $
        {COMPANY_INFORMATION.COMPANY_WEBSITE}
      </title>
      <meta
        key="description"
        name="description"
        content={`Запчасти с доставкой и со склада в интерет магазине ${COMPANY_INFORMATION.COMPANY_NAME} | Звоните ${footerData.SHOP_PHONE}!`}
      />

      <link rel="canonical" key="canonical" href={`${SITE_DOMAIN_FULL}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Organization',
            name: `${COMPANY_INFORMATION.COMPANY_NAME}`,
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
