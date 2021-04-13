/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { Grid, Chip, Hidden, Box, SvgIcon } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import DoneIcon from '@material-ui/icons/Done';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { capitalize } from '~/utils';
import { ICar } from '~/interfaces';
import url from '~/services/url';
import SearchBar from '~/components/header/SearchBar';
import CarChooseModal from '~/components/car/CarChooseModal';
import CarIcon from '~/assets/sedan-car-front.svg';

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
  const currentCar: ICar | undefined = useSelector(
    (state: IState) => state.shop.currentCar
  );
  let chipLabel: string = 'Select car';
  if (currentCar && Object.keys(currentCar).length) {
    chipLabel = `${capitalize(currentCar.make.name)} ${capitalize(
      currentCar.model
    )}`;
  }

  // Redirect to car page on click
  function handleCurrentCar() {
    /* if (currentCar && Object.keys(currentCar).length > 0) { */
    /*   router.push({ */
    /*     pathname: url.model(currentCar.make.slug, currentCar.slug), */
    /*   }); */
    /* } */
  }
  function CarIconComponent() {
    return (
      <SvgIcon
        className={classes.carIcon}
        component={CarIcon}
        viewBox="0 0 48.997 48.998"
      ></SvgIcon>
    );
  }

  return (
    <React.Fragment>
      <Grid className={classes.root} container>
        <Hidden smDown>
          <Grid className={classes.container} item md={4} lg={3}>
            {currentCar ? (
              <React.Fragment>
                <Chip
                  icon={<CarIconComponent />}
                  label={chipLabel}
                  onClick={handleCurrentCar}
                  clickable
                  color="default"
                  onDelete={handleCurrentCar}
                  deleteIcon={<DoneIcon />}
                  variant="outlined"
                  classes={{ icon: classes.carIcon }}
                />
                <Box className={classes.carChoiserText}>
                  <CarChooseModal />
                </Box>
              </React.Fragment>
            ) : (
              <CarChooseModal />
            )}
          </Grid>
        </Hidden>
        <Grid item xs={12} md={8} lg={6}>
          <SearchBar />
        </Grid>
        <Hidden mdDown>
          <Grid className={classes.container} item xs={3}></Grid>
        </Hidden>
      </Grid>
    </React.Fragment>
  );
}
