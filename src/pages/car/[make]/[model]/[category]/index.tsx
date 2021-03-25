import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

import { footerData, SITE_DOMAIN_FULL } from '~/config';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { REVALIDATE } from '~/config';
import { ICar } from '~/interfaces/ICar';
import { getCategoryBySlugGQL } from '~/endpoints/categories';
import { asString } from '~/helpers';
import { IFilter } from '~/interfaces/filters';
import { ICategory, IShopCategory } from '~/interfaces/category';
import AnimationPage from '~/components/common/AnimationPage';
import { getVehicle, getVehicles } from '~/endpoints/carsEndpoint';
import { IAggregationCategory } from '~/interfaces/aggregations';
import { IProductElasticHitsFirst } from '~/interfaces/product';
import { getProductsByCar } from '~/endpoints/productEndpoint';
import { makeTree } from '~/utils';
import ShopGrid from '~/components/product/ShopGrid';
import { Hidden } from '@material-ui/core';
import FilterWidget from '~/components/product/FilterWidget';
import LeftSideBar from '~/components/product/LeftSideBar';

interface CategoryProps {
  category: IShopCategory;
  categoriesForFilter: ICategory[];
  categoryId?: number;
  products: IProductElasticHitsFirst;
  make: string;
  model: ICar;
  updated: Date;
}

export default function Cagetory(props: CategoryProps) {
  const { category, make, model, updated, products } = props;
  const items: IShopCategory[] = [];
  items.push(category);
  const filterCategory: IFilter = {
    type: 'category',
    name: 'category',
    slug: 'category',
    value: 'dvigatel',
    items: items,
  };

  const filters = [];
  filters.push(filterCategory);

  return (
    <React.Fragment>
      <Head>
        <title key="title">About US - History & Team | Angara Parts</title>
        <meta
          key="description"
          name="description"
          content={`Angara 77 | ${footerData.SHOP_PHONE} Information about our
          company and history of establishment. We are open our dors in 2001 first time`}
        />
        <meta
          key="og:title"
          property="og:title"
          content="Get your car in perfect health | Angara Parts | About Us"
        />
        <meta
          key="og:url"
          property="og:url"
          content={`${SITE_DOMAIN_FULL}/about`}
        />
        <meta key="og:image" property="og:image" content="/favicon.png" />
        <meta
          key="og:image:type"
          property="og:image:type"
          content="image/png"
        />
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:hight" property="og:image:hight" content="630" />

        <meta
          key="og:image:alt"
          property="og:image:alt"
          content="Angara 77 logo"
        />
        <link
          rel="canonical"
          key="canonical"
          href={`${SITE_DOMAIN_FULL}/about`}
        />
      </Head>
      <AnimationPage>
        <Grid container>
          <Hidden smDown>
            <Grid item xs={3} style={{ border: '1px solid green' }}>
              <LeftSideBar>
                <FilterWidget filters={filters} />
              </LeftSideBar>
            </Grid>
          </Hidden>
          <Grid style={{ border: '1px solid green' }} item xs={12} md={9}>
            <Typography variant="h1">H1 Goes Here</Typography>
            <ShopGrid products={products} />
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { category, make, model } = context.params!;
  const modelSlug: string = model as string;
  if (!category) {
    return {
      notFound: true,
    };
  }
  const mod: ICar = await getVehicle(modelSlug);

  const slug: string = asString(category);

  // Comment out for building next time here and in static paths
  const cat: ICategory = await getCategoryBySlugGQL(slug);
  const promise = await getProductsByCar(modelSlug, cat.slug);
  const categories: IAggregationCategory[] =
    promise.aggregations.categories.buckets;
  let products: IProductElasticHitsFirst = promise.hits;
  /* const uniqueProducts = distinctArray(products.hits); */
  /* products.hits = uniqueProducts; */
  /* console.log(uniqueProducts); */

  return {
    revalidate: REVALIDATE,
    props: {
      car: {},
      category: cat,
      categoriesForFilter: makeTree(categories),
      products: products,
      make: make,
      model: mod,
      updated: Date.now(),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // here is good place to add whole pages to be generated

  const vehicles = await getVehicles();

  const makeModel = vehicles.map((vehicle: ICar) => {
    return {
      make: vehicle.make.slug,
      model: vehicle.slug,
    };
  });

  // !!!! Getting NOT Empty categories from endpoint
  /* const categories = await getCategoryAllGQL(); */
  // Here is all not empty categories from elastic need to be refactored
  // const categories = await getCategories();

  const paths: {
    params: { make: string; model: string; category: string };
  }[] = [];

  for (let model of makeModel) {
    const promise = await getProductsByCar(model.model);
    const categories: IAggregationCategory[] =
      promise.aggregations.categories.buckets;
    for (let cat of categories) {
      paths.push({
        params: { make: model.make, model: model.model, category: cat.slug },
      });
    }
  }

  return {
    paths: paths,
    fallback: false,
  };
};
