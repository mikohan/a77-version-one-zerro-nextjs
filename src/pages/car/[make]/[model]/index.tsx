import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import {
  categoriesUrl,
  vehiclesUrl,
  getModelsByMakeUrl,
  makesUrl,
} from '~/config';
import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { ICar } from '~/interfaces/ICar';
import { ICategory } from '~/interfaces/category';
import { List, ListItem } from '@material-ui/core';
import Link from 'next/link';

interface IModelProps {
  model: ICar;
  categories: ICategory[];
}

function Model(props: IModelProps) {
  const { model, categories } = props;
  console.log(model);

  return (
    <div>
      <MainLayout></MainLayout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const modelSlug = context.params?.model;
  const promise = await axios.get(`${vehiclesUrl}${modelSlug}/`);
  const vehicle = await promise.data;

  const categoriesPromise = await axios.get(`${categoriesUrl}`);
  const categories = await categoriesPromise.data;

  const filtredCategories = categories.filter((cat: ICategory) => {
    return cat.count !== 0;
  });

  return {
    props: {
      model: vehicle,
      categories: filtredCategories,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const modelUrl = `${makesUrl}`;
  const url = `${getModelsByMakeUrl}hyundai/`;
  console.log(url, ctx);

  const res = await axios.get(url);

  return {
    fallback: true,
    paths: [],
  };
};

export default Model;
