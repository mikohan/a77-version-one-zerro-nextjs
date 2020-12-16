import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
import { makeStyles, createStyles } from '@material-ui/core/styles';

export default function TestPage(props: any) {
  const router = useRouter();
  let query = router.query || {};

  const items: IShopCategory[] = [];
  items.push(props.categories);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* console.log(event.target.value, event.target.checked); */
    const brands = urlBuilder('mobis', event);
    router.push({ pathname: '', query: { brand: brands } }, undefined, {
      shallow: true,
    });
  };
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

  return (
    <div>
      <MainLayout>
        <h1> Test Page</h1>
        <Box>
          <Link href="/">To home</Link>
        </Box>
        <Box>
          <form method="get">
            <Checkbox
              onChange={handleChange}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              value="pmc"
              name="brand"
            />
            <Checkbox
              onChange={handleChange}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              value="mobis"
              name="brand"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleChange} value="checkedH" />}
              label="Custom icon"
            />
            <Button type="submit" variant="outlined" color="secondary">
              Submit
            </Button>
          </form>
        </Box>
        <Box>
          <FilterCategory
            options={{
              type: 'category',
              name: 'category',
              slug: 'category',
              value: 'porshnevaja',
              items: items,
            }}
          />
        </Box>
      </MainLayout>
    </div>
  );
}

export const getStaticProps = async () => {
  const slug = 'porshnevaja';
  const queryUrl = `${getCategoryBySlugUrl}${slug}/`;
  const res = await axios.get<ICategory[]>(queryUrl);
  const data = res.data;
  return {
    props: {
      categories: data,
    },
  };
};
