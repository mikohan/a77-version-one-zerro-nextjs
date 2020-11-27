import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';
import { categoriesUrl, vehiclesUrl } from '~/config';
import { ICar } from '~/interfaces/ICar';
import { ICategory } from '~/interfaces/ICategory';

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
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // here is good place to add whole pages to be generated

  const vehiclesPromise = await axios.get(vehiclesUrl);
  const vehicles = await vehiclesPromise.data;

  const makeModel = vehicles.map((vehicle: ICar) => {
    return {
      make: vehicle.make,
      model: vehicle.model,
    };
  });

  const categoryPromise = await axios.get(categoriesUrl);
  const categories = await categoryPromise.data;

  const paths: any = [];

  categories.forEach((cat: ICategory) => {
    makeModel.forEach((val: { make: string; model: string }) => {
      paths.push({
        params: { make: val.make, model: val.model, category: cat.slug },
      });
    });
  });

  console.log(paths.length);

  return {
    fallback: true,

    paths: paths,
  };
};

interface CategoryProps {
  category: string;
  categoryId?: number;
  make: string;
  model: string;
  updated: Date;
}

export default function Cagetory(props: CategoryProps) {
  const { category, make, model, updated } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Is Loading ....</div>;
  }
  return (
    <div>
      <MainLayout>
        <Typography variant="h1">
          {`${category} for ${make} ${model}`}{' '}
        </Typography>
        <Typography variant="h4">{updated}</Typography>
      </MainLayout>
    </div>
  );
}
