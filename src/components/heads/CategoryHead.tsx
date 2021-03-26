// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { ICar, IMake, ICategory } from '~/interfaces';
import { capitalize } from '~/utils';
import url from '~/services/url';

interface IProps {
  model: ICar;
  category: ICategory;
}

export default function CarModelHead({ model, category }: IProps) {
  const mk = capitalize(model.make.name);
  const md = capitalize(model.model);
  const ct = capitalize(category.name);
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
      <meta
        key="og:title"
        property="og:title"
        content={`{ct} на {mk} {md} В Наличии | Angara Parts`}
      />
      {/* needs to be redone*/}
      <meta key="og:url" property="og:url" content={`${SITE_DOMAIN_FULL}/`} />
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
        href={url.category(model.make.slug, model.slug, category.slug)}
      />
    </Head>
  );
}
