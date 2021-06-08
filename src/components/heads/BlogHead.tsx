// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { COMPANY_INFORMATION, SITE_DOMAIN_FULL } from '~/config';
import url from '~/services/url';
import { IBread } from '~/interfaces';

interface IProps {
  breads: IBread[];
}

export default function CarModelHead({ breads }: IProps) {
  const breadItems = breads.map((bread: IBread, i: number) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: bread.name,
    item: `${SITE_DOMAIN_FULL}${bread.path}`,
  }));
  return (
    <Head>
      <title key="title">
        Блог компании {COMPANY_INFORMATION.COMPANY_NAME}
      </title>
      <meta
        key="description"
        name="description"
        content={`Блог и полезные материалы компании ${COMPANY_INFORMATION.COMPANY_NAME}`}
      />
      <link
        rel="canonical"
        key="canonical"
        href={`${SITE_DOMAIN_FULL}${url.blog()}`}
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
