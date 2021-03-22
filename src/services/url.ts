import { IShopCategory } from '~/interfaces/category';
import Link, { LinkProps } from 'next/link';
import { IProduct } from '~/interfaces/product';
import { ICategory } from '~/interfaces/category';

type IAppLinkHref = string | LinkProps;

const url: { [key: string]: any } = {
  shop: (make?: string, model?: string) => `/car/${make}/${model}`,
  category: (
    make: string,
    model: string,
    categorySlug: string
  ): IAppLinkHref => {
    return `/car/${make}/${model}/${categorySlug}`;
  },
  products: (
    make?: string,
    model?: string,
    { filters }: { filters?: Record<string, string> } = {}
  ): IAppLinkHref => {
    return {
      href: {
        // pathname: '/catalog/products',
        pathname: `/car/${make}/${model}`,

        query: {
          ...filters,
        },
      },
    };
  },
  product: (product: IProduct): IAppLinkHref => ({
    href: `/products/[slug]?slug=${product.slug}`,
    as: `/products/${product.slug}`,
  }),
  about: () => ({
    href: `/about`,
  }),
};

export default url;
