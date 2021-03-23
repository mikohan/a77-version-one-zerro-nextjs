import { GetStaticPaths, GetStaticProps } from 'next';

import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';
import { Grid, Box } from '@material-ui/core';
import { REVALIDATE } from '~/config';
import { ICar } from '~/interfaces/ICar';
import { getCategories, getCategoryBySlugGQL } from '~/endpoints/categories';
import { asString } from '~/helpers';
import LeftSideBar from '~/components/main/LeftSideBar';
import FilterWidget from '~/components/main/FilterWidget';
import { IFilter } from '~/interfaces/filters';
import { ICategory, IShopCategory } from '~/interfaces/category';
import AnimationPage from '~/components/common/AnimationPage';
import { getVehicle, getVehicles } from '~/endpoints/carsEndpoint';
import { IAggregationCategory } from '~/interfaces/aggregations';
import {
  IProductElasticHitsFirst,
  IProduct,
  IProductElasticHitsSecond,
} from '~/interfaces/product';
import { getProductsByCar } from '~/endpoints/productEndpoint';
import { makeTree } from '~/utils';
import ProductCard from '~/components/product/ProductCard2';
import PageHeader from '~/components/product/PageHeader';
import { red, green, blue } from '@material-ui/core/colors';

const redColor = red[500];
const greenColor = green[600];

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
    <AnimationPage>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={3} style={{ border: '1px solid grey' }}>
          <LeftSideBar>
            <Box>{/* <FilterWidget filters={filters} /> */}</Box>
          </LeftSideBar>
        </Grid>
        <Grid container item xs={12} sm={9}>
          <Grid item xs={12}>
            <PageHeader model={model} totalParts={products.total.value} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ color: redColor }}>
              Time for ISG checking: {updated}
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            {products.hits.map((product: IProductElasticHitsSecond) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </AnimationPage>
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

  /* for (let cat of categories) { */
  /*   for (let val of makeModel) { */
  /*     paths.push({ */
  /*       params: { make: val.make, model: val.model, category: cat.slug }, */
  /*     }); */
  /*   } */
  /* } */
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
