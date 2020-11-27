import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';

export const getStaticProps: GetStaticProps = async (context) => {
  const { category, make, model } = context.params!;
  console.log(category, make, model);

  return {
    props: {
      car: {},
      category: category,
      make: make,
      model: model,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // here is good place to add whole pages to be generated
  return {
    fallback: true,

    paths: [],
  };
};

interface CategoryProps {
  category: string;
  categoryId?: number;
  make: string;
  model: string;
}

export default function Cagetory(props: CategoryProps) {
  const { category, make, model } = props;
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
        <Typography variant="h4">{category}</Typography>
      </MainLayout>
    </div>
  );
}
