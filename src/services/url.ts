import { LinkProps } from 'next/link';

type IAppLinkHref = string | LinkProps;

const url: { [key: string]: any } = {
  home: () => `/`,
  homeOld: () => `http://old.angara77.com`,
  cars: () => `/car`,
  model: (make: string, model: string) => `/cars/${make}/${model}`,
  make: (make: string) => `/cars/${make}`,
  category: (
    make: string,
    model: string,
    categorySlug: string
  ): IAppLinkHref => {
    return `/cars/${make}/${model}/${categorySlug}`;
  },
  autogoodsCategory: (slug: string) => `/autogoods/${slug}`,
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
        pathname: `/cars/${make}/${model}/${category}`,

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
  placeOrder: () => `/cart/order`,
  account: {
    activate: () => `/account/activate`,
    addresses: () => `/account/addresses`,
    addAddress: () => `/account/addresses/new`,
    create: () => `/account/create`,
    dashboard: () => `/account/dashboard`,
    garage: () => `/account/garage`,
    editAddress: (id: number) => `/account/addresses/${id}`,
    login: () => `/account/login`,
    profile: () => `/account/profile`,
    register: () => `/account/register`,
    registerSuccess: () => `/account/register-success`,
    resetPassword: () => `/account/passreset`,
    orders: () => `/account/orders`,
    order: (id: number) => `/account/orders/${id}`,
    orderSuccess: () => `/account/orders/success`,
  },
};

export default url;
