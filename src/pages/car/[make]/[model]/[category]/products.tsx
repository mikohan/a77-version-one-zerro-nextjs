import React from 'react';
import MainLayout from '~/layouts/Main';
import { Typography, Grid, Box } from '@material-ui/core';
import FilterWidget from '~/components/main/FilterWidget';
import LeftSideBar from '~/components/main/LeftSideBar';

export default function Products() {
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
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </MainLayout>
    </div>
  );
}
