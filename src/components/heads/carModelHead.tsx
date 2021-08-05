// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { footerData, SITE_DOMAIN_FULL, COMPANY_INFORMATION } from '~/config';
import { ICar } from '~/interfaces/ICar';
import { capitalize } from '~/utils';
import url from '~/services/url';
import { IBread } from '~/interfaces';

interface IProps {
  model: ICar;
  breads: IBread[];
}

export default function CarModelHead({ model, breads }: IProps) {
  const mk = capitalize(model.make.name);
  const md = capitalize(model.model);
  const breadItems = breads.map((bread: IBread, i: number) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: bread.name,
    item: `${SITE_DOMAIN_FULL}${bread.path}`,
  }));
  return (
    <Head>
      <title key="title">
        Запчасти {mk} {md} | {COMPANY_INFORMATION.COMPANY_NAME_ENG}
      </title>
      <meta
        key="description"
        name="description"
        content={`Запчасти для ${mk} ${md} с доставкой и со склада в интерет магазине ${COMPANY_INFORMATION.COMPANY_NAME} | Звоните ${footerData.SHOP_PHONE}!`}
      />
      <link
        rel="canonical"
        key="canonical"
        href={`${SITE_DOMAIN_FULL}${url.model(model.make.slug, model.slug)}`}
      />
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
