// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { COMPANY_INFORMATION, footerData, SITE_DOMAIN_FULL } from '~/config';
import { ICar, IBread, IProduct, ICategory } from '~/interfaces';
import { capitalize } from '~/utils';
import url from '~/services/url';

interface IProps {
  model?: ICar;
  category: ICategory;
  products: IProduct[];
  breads: IBread[];
}

export default function CarModelHead({
  model,
  category,
  products,
  breads,
}: IProps) {
  const mk = model ? capitalize(model.make.name) : '';
  const md = model ? capitalize(model.model) : '';
  const na = model ? 'на' : '';
  const ct = capitalize(category.name);

  const items = products.map((product: IProduct, i: number) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_DOMAIN_FULL}${url.product(product.slug)}`,
  }));

  const breadItems = breads.map((bread: IBread, i: number) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: bread.name,
    item: `${SITE_DOMAIN_FULL}${bread.path}`,
  }));
  const uri = model
    ? `${SITE_DOMAIN_FULL}${url.category(
        model.make.slug,
        model.slug,
        category.slug
      )}`
    : `${SITE_DOMAIN_FULL}${url.autogoodsCategory(category.slug)}`;

  return (
    <Head>
      <title key="title">
        {ct} {na} {mk} {md} В Наличии | {COMPANY_INFORMATION.COMPANY_NAME_ENG}
      </title>
      <meta
        key="description"
        name="description"
        content={`${ct} ${na} ${mk} ${md} В Наличии в Интернет Магазине ${COMPANY_INFORMATION.COMPANY_NAME}.
        Доставка и Самовывоз в Москве | ${footerData.SHOP_PHONE} `}
      />
      <link rel="canonical" key="canonical" href={uri} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'ItemList',
            numberOfItems: items.length,
            itemListElement: items,
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
