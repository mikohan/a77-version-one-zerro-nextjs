// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { COMPANY_INFORMATION, SITE_DOMAIN_FULL } from '~/config';
import url from '~/services/url';
import { IBread, IPost } from '~/interfaces';

interface IProps {
  breads: IBread[];
  post: IPost;
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
        Блог компании ${COMPANY_INFORMATION.COMPANY_NAME}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: '14 Ways Json Can Improve Your SEO',
            alternativeHeadline: 'and the women who love them',
            image: 'http://example.com/image.jpg',
            award: 'Best article ever written',
            editor: 'John Doe',
            genre: 'search engine optimization',
            keywords: 'seo sales b2b',
            wordcount: '1120',
            publisher: 'Book Publisher Inc',
            url: 'http://www.example.com',
            datePublished: '2015-09-20',
            dateCreated: '2015-09-20',
            dateModified: '2015-09-20',
            description: 'We love to do stuff to help people and stuff',
            articleBody:
              'You can paste your entire post in here, and yes it can get really really long.',
            author: {
              '@type': 'Person',
              name: 'Steve',
            },
          }),
        }}
      />
    </Head>
  );
}
