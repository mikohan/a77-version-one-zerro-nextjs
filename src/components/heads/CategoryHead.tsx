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
