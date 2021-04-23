import { LinkProps } from 'next/link';

type IAppLinkHref = string | LinkProps;

const url: { [key: string]: any } = {
  model: (make: string, model: string) => `/car/${make}/${model}`,
  make: (make: string) => `/car/${make}`,
  category: (
    make: string,
    model: string,
    categorySlug: string
  ): IAppLinkHref => {
    return `/car/${make}/${model}/${categorySlug}`;
  },
  search: () => `/search`,
  products: (
    make?: string,
    model?: string,
    category?: string,
    filters: Record<string, string> = {}
  ): IAppLinkHref => {
    return {
      href: {
        // pathname: '/catalog/products',
        pathname: `/car/${make}/${model}/${category}`,

        query: {
          ...filters,
        },
      },
    };
  },
  product: (slug: string): IAppLinkHref => `/product/${slug}`,
  about: () => ({
    href: `/about`,
  }),
  post: (slug: string): IAppLinkHref => `/blog/${slug}`,
};

export default url;
