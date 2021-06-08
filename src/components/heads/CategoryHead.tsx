// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { ICar, IMake, IBread, IProduct, ICategory } from '~/interfaces';
import { capitalize } from '~/utils';
import url from '~/services/url';

interface IProps {
  model: ICar;
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
  const mk = capitalize(model.make.name);
  const md = capitalize(model.model);
  const ct = capitalize(category.name);

  const items = products.map((product: IProduct, i: number) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: url.product(product.slug),
  }));

  const breadItems = breads.map((bread: IBread, i: number) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: bread.name,
    item: `${SITE_DOMAIN_FULL}${bread.path}`,
  }));

  return (
    <Head>
      <title key="title">
        {ct} на {mk} {md} В Наличии | Angara Parts
      </title>
      <meta
        key="description"
        name="description"
        content={`${ct} на ${mk} ${md} В Наличии в Интернет Магазине Ангара 77. Доставка и Самовывоз в Москве | ${footerData.SHOP_PHONE} `}
      />
      <link
        rel="canonical"
        key="canonical"
        href={url.category(model.make.slug, model.slug, category.slug)}
      />
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
