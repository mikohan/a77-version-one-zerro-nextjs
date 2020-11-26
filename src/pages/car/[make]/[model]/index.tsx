import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import axios from 'axios';
import { vehiclesUrl } from '~/config';
import MainLayout from '~/layouts/Main';

import { ICar } from '~/interfaces/ICar';

interface IModelProps {
  model: ICar;
}

function Model(props: IModelProps) {
  const { model } = props;
  return (
    <div>
      <MainLayout>
        <h1>inside all cars list here</h1>
        <pre>{JSON.stringify(model, null, 4)}</pre>
      </MainLayout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const modelSlug = context.params?.model;
  console.log(`${vehiclesUrl}${modelSlug}`);
  const promise = await axios.get(`${vehiclesUrl}${modelSlug}/`);
  const vehicle = await promise.data;

  return {
    props: {
      model: vehicle,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [{ params: { make: 'Hyundai', model: 'Porter 1' } }],
  };
};

export default Model;
