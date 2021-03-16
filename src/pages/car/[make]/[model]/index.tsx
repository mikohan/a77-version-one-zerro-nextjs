import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { vehiclesUrl } from '~/config';
import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { ICar } from '~/interfaces/ICar';
import { ICategory } from '~/interfaces/category';
import { List, ListItem, Box } from '@material-ui/core';
import Link from 'next/link';
import FilterWidget from '~/components/main/FilterWidget';
import LeftSideBar from '~/components/main/LeftSideBar';
import { REVALIDATE } from '~/config';
import { IFilter } from '~/interfaces/filters';
import { getCategoriesByCar } from '~/endpoints/categories';
import { motion } from 'framer-motion';
import { durationPage } from '~/config';
import { setCurrentCarAction } from '~/store/actions';
import { getVehicle, getVehicles } from '~/endpoints/carsEndpoint';
import { toLoverSpace } from '~/helpers';
import { getProductsByCar } from '~/endpoints/productEndpoint';
import { IAggregationCategory } from '~/interfaces/aggregations';

interface IModelProps {
  model: ICar;
  categories: ICategory[];
}
export interface IBaseFilter<T extends string, V> {
  type: T;
  name: string;
  slug: string;
  value: V;
}

function Model(props: IModelProps) {
  const { model, categories } = props;

  categories.map((cat) => console.log(cat.name));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentCarAction(model));
  }, [model]);

  const filterCategory: IFilter = {
    type: 'category',
    name: 'category',
    slug: 'category',
    value: 'dvigatel',
    items: [],
  };

  const filters = [];
  //filters.push(filterCategory);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: durationPage }}
    >
      <MainLayout>
        <Grid item xs={12} sm={3} style={{ border: '1px solid grey' }}>
          <LeftSideBar>
            <Box>{/* <FilterWidget filters={filters} /> */}</Box>
          </LeftSideBar>
        </Grid>
        <Grid item xs={12} sm={9} style={{ border: '1px solid green' }}>
          <Grid container item>
            <Grid item xs={6}>
              <Typography variant="h1">{model.model}</Typography>
              <pre>{JSON.stringify(model, null, 4)}</pre>
            </Grid>
            <Grid item xs={6}>
              <Box>
                {categories.map((cat: ICategory) => {
                  return (
                    <span key={cat.id}>
                      <Typography variant="h5">
                        First Level - {cat.name} ({cat.count})
                      </Typography>
                      {cat.children?.map((subcat: ICategory) => {
                        return (
                          <div key={subcat.id} style={{ paddingLeft: '2rem' }}>
                            <Typography variant="body1">
                              {subcat.name} ({subcat.count})
                            </Typography>
                          </div>
                        );
                      })}
                    </span>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </MainLayout>
    </motion.div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const modelSlug = context.params?.model as string;
  const vehicle: ICar = await getVehicle(modelSlug);

  // Here will be categories fetcher
  /* const promise = await getProductsByCar(vehicle.slug); */
  /* const categories: ICategory[] = promise.aggregations.categories.buckets; */
  const categories: ICategory = await getCategoriesByCar(vehicle.slug);

  return {
    revalidate: REVALIDATE,
    props: {
      model: vehicle,
      categories: categories,
    },
  };
};

//Get Static Paths
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const models = await getVehicles();
  for (let model of models) {
    paths.push({
      params: {
        make: toLoverSpace(model.make.slug),
        model: toLoverSpace(model.slug),
      },
    });
  }

  return {
    fallback: false,
    paths: paths,
  };
};

export default Model;
