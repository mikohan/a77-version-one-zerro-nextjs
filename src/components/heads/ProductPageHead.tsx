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
    </Head>
  );
}
