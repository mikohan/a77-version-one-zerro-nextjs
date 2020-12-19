import { IShopCategory } from '~/interfaces/category';
import Link, { LinkProps } from 'next/link';
import { IProduct } from '~/interfaces/product';
import { ICategory } from '~/interfaces/category';

type IAppLinkHref = string | LinkProps;

const url: { [key: string]: any } = {
  shop: () => '/catalog',
  shopCategory: (category: IShopCategory): IAppLinkHref => ({
    href: `/catalog/[slug]${
      category.layout === 'products' ? '/products' : ''
    }?slug=${category.slug}`,
    as: `/catalog/${category.slug}${
      category.layout === 'products' ? '/products' : ''
    }`,
  }),
  category: (
    category: ICategory,
    make?: string,
    model?: string
  ): IAppLinkHref => {
    if (category.type === 'shop') {
      return url.shopCategory(category);
    }

    return '/';
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
};

export default url;
