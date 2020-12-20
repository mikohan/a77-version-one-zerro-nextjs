import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';
import MainLayout from '~/layouts/Main';
import { useState } from 'react';
import { asString } from '~/helpers';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { urlBuilder } from '~/helpers';
import FilterCategory from '~/components/filters/FilterCategory';
import axios from 'axios';
import { getCategoryBySlugUrl } from '~/config';
import { ICategory, IShopCategory } from '~/interfaces/category';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import LeftSideBar from '~/components/main/LeftSideBar';
import FilterWidget from '~/components/main/FilterWidget';
import { motion } from 'framer-motion';
import { durationPage } from '~/config';
import { getCategories } from '~/endpoints/categories';
import { IFilter } from '~/interfaces/filters';
import WidgetCategoriesList from '~/components/shared/WidgetCategoriesList';
import TestListWidget from '~/components/shared/TestListWidget';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function TestPage(props: any) {
  const { categories } = props;
  const classes = useStyles();

  // UseRef and UseCallback stuff

  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = useCallback(
    (param: any) => {
      console.log(param, 'In colabck param');
      if (inputEl.current) {
        inputEl.current.style.height = '50px';
        console.log(inputEl.current?.value);
      }
    },
    [inputEl]
  );

  //Router stuff

  const items: IShopCategory[] = [];
  items.push(categories);
  const filterCategory: IFilter = {
    type: 'category',
    name: 'category',
    slug: 'category',
    value: 'dvigatel',
    items: items,
  };

  const filters = [];
  filters.push(filterCategory);

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
        <Grid item xs={12} sm={9}>
          <Grid item xs={6}>
            <Typography variant="h1">Some H1</Typography>
            <Typography variant="h4">
              <input ref={inputEl} type="text" />
              <Button onClick={onButtonClick}>ClickMe</Button>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TestListWidget categories={categories} />
          </Grid>
        </Grid>
      </MainLayout>
    </motion.div>
  );
}

export const getStaticProps = async () => {
  const slug = 'dvigatel';
  const categories = await getCategories({ depth: 1 });
  return {
    props: {
      categories: categories,
    },
  };
};
