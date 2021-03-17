import { GetStaticPaths, GetStaticProps } from 'next';

import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';
import { Grid, Box } from '@material-ui/core';
import { REVALIDATE } from '~/config';
import { ICar } from '~/interfaces/ICar';
import {
  getCategories,
  getCategoryAllGQL,
  getCategoryBySlugGQL,
} from '~/endpoints/categories';
import { asString } from '~/helpers';
import LeftSideBar from '~/components/main/LeftSideBar';
import FilterWidget from '~/components/main/FilterWidget';
import { IFilter } from '~/interfaces/filters';
import { ICategory, IShopCategory } from '~/interfaces/category';
import { motion } from 'framer-motion';
import { durationPage } from '~/config';
import { getVehicles } from '~/endpoints/carsEndpoint';
import { IAggregationCategory } from '~/interfaces/aggregations';
import {
  IProductElasticHitsFirst,
  IProduct,
  IProductElasticHitsSecond,
} from '~/interfaces/product';
import { getProductsByCar } from '~/endpoints/productEndpoint';
import { makeTree } from '~/utils';

interface CategoryProps {
  category: IShopCategory;
  categoriesForFilter: ICategory[];
  categoryId?: number;
  products: IProductElasticHitsFirst;
  make: string;
  model: string;
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
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: durationPage }}
    >
      <MainLayout>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} style={{ border: '1px solid grey' }}>
            <LeftSideBar>
              <Box>{/* <FilterWidget filters={filters} /> */}</Box>
            </LeftSideBar>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Grid item xs={6}>
              <Typography variant="h4">
                Time for ISG checking: {updated}
              </Typography>
              <Typography variant="h1">
                {`${category.name} for ${make} ${model}`}
              </Typography>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
          <Grid item container xs={12}>
            {products.hits.map((product: IProductElasticHitsSecond) => (
              <Grid item xs={4} key={product._id}>
                {JSON.stringify(product, null, 2)}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </MainLayout>
    </motion.div>
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

  const slug: string = asString(category);
  // const categories = await getCategoryBySlug(slug);

  const cat: ICategory = await getCategoryBySlugGQL(slug);
  const promise = await getProductsByCar(modelSlug, cat.slug);
  const categories: IAggregationCategory[] =
    promise.aggregations.categories.buckets;
  const products: IProductElasticHitsFirst = promise.hits;

  return {
    revalidate: REVALIDATE,
    props: {
      car: {},
      category: cat,
      categoriesForFilter: makeTree(categories),
      products: products,
      make: make,
      model: model,
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
  const categories = await getCategories();

  const paths: {
    params: { make: string; model: string; category: string };
  }[] = [];

  for (let cat of categories) {
    for (let val of makeModel) {
      paths.push({
        params: { make: val.make, model: val.model, category: cat.slug },
      });
    }
  }
  return {
    paths: paths,
    fallback: false,
  };
};
