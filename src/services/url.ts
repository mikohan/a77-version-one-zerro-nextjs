import { LinkProps } from 'next/link';

type IAppLinkHref = string | LinkProps;

const url: { [key: string]: any } = {
  cars: () => `/car`,
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

  blog: () => `/blog/category/vse-kategorii/1`,
  blogSearch: (search: string, page: number) => {
    return {
      pathname: `/blog/search`,
      query: {
        search: search,
        page: page,
      },
    };
  },
  post: (slug: string): IAppLinkHref => `/blog/post/${slug}`,
  blogCategory: (slug: string, page: number = 1): IAppLinkHref =>
    `/blog/category/${slug}/${page}`,
  /// Pages

  about: () => `/about`,
  delivery: () => `/delivery`,
  warranty: () => `/warranty`,
  payment: () => `/payment`,
  policy: () => `/policy`,
  contacts: () => `/contacts`,
  // cart and order
  cart: () => `/cart/cart`,
  account: {
    create: () => `/account/create`,
    login: () => `/account/login`,
    dashboard: () => `/account/dashboard`,
  },
};

export default url;
