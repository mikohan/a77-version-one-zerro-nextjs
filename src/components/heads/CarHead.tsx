// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { COMPANY_INFORMATION, footerData, SITE_DOMAIN_FULL } from '~/config';

export default function CarHead() {
  return (
    <Head>
      <title key="title">
        {' '}
        Запчасти для Коммерческого Транспорта |{' '}
        {COMPANY_INFORMATION.COMPANY_NAME_ENG}
      </title>
      <meta
        key="description"
        name="description"
        content={`${COMPANY_INFORMATION.COMPANY_NAME_ENG} | ${footerData.SHOP_PHONE} Information about our
          company and history of establishment. We are open our dors in 2001 first time`}
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
    </Head>
  );
}
