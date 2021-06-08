// Needs to add Schema.org and refactor og
import Head from 'next/head';
import { COMPANY_INFORMATION, SITE_DOMAIN_FULL } from '~/config';
import url from '~/services/url';
import { IBread, IPost } from '~/interfaces';

interface IProps {
  breads: IBread[];
  post: IPost;
}

export default function CarModelHead({ breads, post }: IProps) {
  const breadItems = breads.map((bread: IBread, i: number) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: bread.name,
    item: `${SITE_DOMAIN_FULL}${bread.path}`,
  }));
  return (
    <Head>
      <title key="title">{post.title}</title>
      <meta
        key="description"
        name="description"
        content={`Блог и полезные материалы компании ${COMPANY_INFORMATION.COMPANY_NAME}`}
      />
      <link
        rel="canonical"
        key="canonical"
        href={`${SITE_DOMAIN_FULL}${url.post(post.slug)}`}
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
            mainEntityOfPage: `${SITE_DOMAIN_FULL}${url.post(post.slug)}`,
            headline: post.title,
            alternativeHeadline: post.title,
            image: post.image,
            genre: 'Автомобили ремонт и запчасти',
            keywords: post.tags.join(' '),
            publisher: {
              '@type': 'Organization',
              name: COMPANY_INFORMATION.COMPANY_NAME,
              logo: {
                '@type': 'imageObject',
                url: `${SITE_DOMAIN_FULL}/image/local/logo.png`,
              },
            },
            url: `${SITE_DOMAIN_FULL}${url.post(post.slug)}`,
            datePublished: post.date,
            dateCreated: post.date,
            dateModified: post.date,
            description: post.excerpt,
            articleBody: post.text,
            author: {
              '@type': 'Person',
              name: COMPANY_INFORMATION.COMPANY_NAME,
            },
          }),
        }}
      />
    </Head>
  );
}
