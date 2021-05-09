/* eslint-disable no-use-before-define */
import React from 'react';
import { Box, Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import SearchBar from '~/components/header/SearchBar';
import CarChooseModal from '~/components/car/CarChooseModal';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import Link from 'next/link';
import url from '~/services/url';
import { ICar } from '~/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
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
    carButtons: {
      minWidth: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    goTo: {
      fontSize: '0.8rem',
      color: theme.palette.text.secondary,
    },
  })
);

export default function SearchBox() {
  const classes = useStyles();
  let currentCar: ICar = {} as ICar;
  if (typeof window !== 'undefined') {
    currentCar = useSelector((state: IState) => state.shop.currentCar) as ICar;
  }

  // Redirect to car page on click

  return (
    <React.Fragment>
      <Grid className={classes.root} container>
        <Hidden smDown>
          <Grid className={classes.container} item md={4} lg={3}>
            <Box className={classes.carButtons}>
              {currentCar &&
              Object.keys(currentCar).length &&
              currentCar.constructor === Object ? (
                <Link href={url.model(currentCar?.make.slug, currentCar?.slug)}>
                  <a>
                    <Typography className={classes.goTo} variant="body2">
                      Перейти в {currentCar?.model}
                    </Typography>
                  </a>
                </Link>
              ) : (
                ''
              )}
              <CarChooseModal />
            </Box>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={8} lg={6}>
          <SearchBar />
        </Grid>
        <Hidden mdDown>
          <Grid className={classes.container} item xs={3}>
            <Link href={url.cart()}>
              <a>Cart</a>
            </Link>
          </Grid>
        </Hidden>
      </Grid>
    </React.Fragment>
  );
}
