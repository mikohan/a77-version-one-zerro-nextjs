/* eslint-disable no-use-before-define */
import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import SearchBar from '~/components/header/SearchBar';
import CarChooseModal from '~/components/car/CarChooseModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      background: theme.palette.background.paper,
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    myCar: {
      marginRight: theme.spacing(1),
    },
    carChoiserText: {
      marginLeft: theme.spacing(2),
    },
    carIcon: {
      fontSize: '1.5rem',
      marginLeft: theme.spacing(2),
    },
  })
);

export default function SearchBox() {
  const classes = useStyles();

  // Redirect to car page on click

  return (
    <React.Fragment>
      <Grid className={classes.root} container>
        <Hidden smDown>
          <Grid className={classes.container} item md={4} lg={3}>
            <CarChooseModal />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={8} lg={6}>
          <SearchBar />
        </Grid>
        <Hidden mdDown>
          <Grid className={classes.container} item xs={3}>
            Search only for my car
          </Grid>
        </Hidden>
      </Grid>
    </React.Fragment>
  );
}
