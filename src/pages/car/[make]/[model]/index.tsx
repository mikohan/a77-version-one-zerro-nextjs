import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { categoriesUrl, vehiclesUrl } from '~/config';
import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { ICar } from '~/interfaces/ICar';
import { ICategory, IShopCategory } from '~/interfaces/category';
import { List, ListItem, Box } from '@material-ui/core';
import Link from 'next/link';
import FilterWidget from '~/components/main/FilterWidget';
import LeftSideBar from '~/components/main/LeftSideBar';
import FilterCategory from '~/components/filters/FilterCategory';

interface IModelProps {
  model: ICar;
  categories: IShopCategory[];
}

function Model(props: IModelProps) {
  const { model, categories } = props;
  console.log(categories);

  const filterCategory = (
    <FilterCategory
      options={{
        type: 'category',
        name: 'category',
        slug: 'category',
        value: '',
        items: categories,
      }}
    />
  );

  return (
    <div>
      <MainLayout>
        <Grid item xs={12} sm={3} style={{ border: '1px solid grey' }}>
          <LeftSideBar>
            <Box>
              <FilterWidget options={filterCategory} />
              {filterCategory}
            </Box>
          </LeftSideBar>
        </Grid>
        <Grid item xs={12} sm={9} style={{ border: '1px solid green' }}>
          <Grid container item>
            <Grid item xs={6}>
              <Typography variant="h1">{model.model}</Typography>
              <pre>{JSON.stringify(model, null, 4)}</pre>
            </Grid>
            <Grid item xs={6}>
              <List>
                {categories.map((cat: ICategory) => {
                  return (
                    <ListItem key={cat.id}>
                      <Link
                        href={`/car/${model.make}/${model.slug}/${cat.slug}`}
                      >
                        <Typography variant="body2">{cat.name}</Typography>
                      </Link>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </MainLayout>
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
  const url = `${vehiclesUrl}`;

  const paths = [];
  const res = await axios.get(url);
  for (let model of res.data) {
    paths.push({
      params: {
        make: model.make,
        model: model.slug,
      },
    });
  }

  return {
    fallback: false,
    paths: paths,
  };
};

export default Model;
