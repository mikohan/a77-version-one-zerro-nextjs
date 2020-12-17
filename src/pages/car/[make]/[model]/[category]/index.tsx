import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';

import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { categoriesUrl, vehiclesUrl } from '~/config';
import { ICar } from '~/interfaces/ICar';

interface CategoryProps {
  category: string;
  categoryId?: number;
  make: string;
  model: string;
  updated: Date;
}

export default function Cagetory(props: CategoryProps) {
  const { category, make, model, updated } = props;

  return (
    <div>
      <MainLayout>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h1">
              {`${category} for ${make} ${model}`}
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

  return {
    props: {
      car: {},
      category: category,
      make: make,
      model: model,
      updated: Date.now(),
    },
    revalidate: 20,
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

  const categoryPromise = await axios.get(categoriesUrl);
  const categories = await categoryPromise.data;

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
