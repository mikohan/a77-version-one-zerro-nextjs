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

export default function TestPage() {
  const router = useRouter();
  let query = router.query || {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* console.log(event.target.value, event.target.checked); */
    const brands = urlBuilder('mobis', event);
    router.push({ pathname: '', query: { brand: brands } }, undefined, {
      shallow: true,
    });
  };
  console.log(query.brand);

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
      </MainLayout>
    </div>
  );
}
