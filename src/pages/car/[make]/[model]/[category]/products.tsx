import React from 'react';
import MainLayout from '~/layouts/Main';
import { Typography, Grid, Box, ListItem, List } from '@material-ui/core';
import FilterWidget from '~/components/main/FilterWidget';
import LeftSideBar from '~/components/main/LeftSideBar';
import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { categoriesUrl, productUrl, vehiclesUrl } from '~/config';
import { asString } from '~/helpers';
import { IProduct } from '~/interfaces/product';

interface IProps {
  products: IProduct[];
}

export default function Products({ products }: IProps) {
  console.log(products);
  return (
    <div>
      <MainLayout>
        <Grid item xs={12} sm={3} style={{ border: '1px solid grey' }}>
          <LeftSideBar>
            <Box>here goes filter widget</Box>
          </LeftSideBar>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid item xs={6}>
            <Typography variant="h1">Here some text</Typography>
            <List></List>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </MainLayout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const categorySlug = asString(context?.params?.category as string);
  const url = `${productUrl}${categorySlug}/`;
  const res = await axios.get(url);

  return {
    props: {
      products: res.data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  /* const res = await axios.get(a); */
  const makeRes = await axios.get(vehiclesUrl);
  const productsRes = await axios.get(productUrl);
  const catRes = await axios.get(categoriesUrl);

  const paths = [];
  for (let vehicle of makeRes.data) {
    for (let cat of catRes.data) {
      for (let prod of productsRes.data) {
        paths.push({
          params: {
            make: vehicle.make,
            model: vehicle.slug,
            category: cat.slug,
            product: prod.slug,
          },
        });
      }
    }
  }

  return {
    fallback: true,
    paths: paths,
  };
};
