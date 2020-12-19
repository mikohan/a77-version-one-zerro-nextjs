import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';

import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';
import { Grid, Box } from '@material-ui/core';
import { REVALIDATE, vehiclesUrl } from '~/config';
import { ICar } from '~/interfaces/ICar';
import { getCategories, getCategoryBySlug } from '~/endpoints/categories';
import { asString } from '~/helpers';
import LeftSideBar from '~/components/main/LeftSideBar';
import FilterWidget from '~/components/main/FilterWidget';
import { IFilter } from '~/interfaces/filters';
import { IShopCategory } from '~/interfaces/category';

interface CategoryProps {
  category: IShopCategory;
  categoryId?: number;
  make: string;
  model: string;
  updated: Date;
}

export default function Cagetory(props: CategoryProps) {
  const { category, make, model, updated } = props;
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
    <div>
      <MainLayout>
        <Grid item xs={12} sm={3} style={{ border: '1px solid grey' }}>
          <LeftSideBar>
            <Box>
              <FilterWidget filters={filters} />
            </Box>
          </LeftSideBar>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid item xs={6}>
            <Typography variant="h1">
              {`${category.name} for ${make} ${model}`}
            </Typography>
            <Typography variant="h4">{updated}</Typography>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </MainLayout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { category, make, model } = context.params!;
  if (!category) {
    return {
      notFound: true,
    };
  }

  const slug: string = asString(category);
  const categories = await getCategoryBySlug(slug);

  return {
    revalidate: REVALIDATE,
    props: {
      car: {},
      category: categories,
      make: make,
      model: model,
      updated: Date.now(),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // here is good place to add whole pages to be generated

  const vehiclesPromise = await axios.get(vehiclesUrl);
  const vehicles = await vehiclesPromise.data;

  const makeModel = vehicles.map((vehicle: ICar) => {
    return {
      make: vehicle.make,
      model: vehicle.slug,
    };
  });

  // Getting NOT Empty categories from endpoint
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
