import { GetStaticPaths, GetStaticProps } from 'next';

import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';

export const getServerSideProps: GetStaticProps = async (context) => {
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

/* export const getStaticPaths: GetStaticPaths = async (context) => { */
/*   console.log(context); */
/*   return { */
/*     fallback: true, */

/*     paths: [], */
/*   }; */
/* }; */

interface CategoryProps {
  category: string;
  categoryId?: number;
  make: string;
  model: string;
}

export default function Cagetory(props: CategoryProps) {
  const { category, make, model } = props;
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
