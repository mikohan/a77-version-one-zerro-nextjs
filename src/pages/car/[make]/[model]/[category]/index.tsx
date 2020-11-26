import { GetStaticPaths, GetStaticProps } from 'next';

import MainLayout from '~/layouts/Main';

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context.params);
  const cat = context.params?.category;

  return {
    props: {
      car: {},
      category: cat,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      { params: { make: 'hyundai', model: 'porter', category: 'engine' } },
    ],
  };
};

interface CategoryProps {
  category: string;
  categoryI?: number;
}

export default function Cagetory(props: CategoryProps) {
  return (
    <div>
      <MainLayout>
        <h1> Category page goes here</h1>
        <h3>{props.category}</h3>
      </MainLayout>
    </div>
  );
}
