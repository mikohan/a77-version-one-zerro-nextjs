/* eslint-disable no-use-before-define */
import React from 'react';
import { Grid, Chip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import CarIcon from '@material-ui/icons/DriveEtaRounded';
import DoneIcon from '@material-ui/icons/Done';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { capitalize } from '~/utils';
import { ICar } from '~/interfaces';
import url from '~/services/url';
import SearchBar from '~/components/header/SearchBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      background: theme.palette.background.paper,
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  })
);

export default function SearchBox() {
  const classes = useStyles();
  const router = useRouter();
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
    if (currentCar && Object.keys(currentCar).length > 0) {
      router.push({
        pathname: url.model(currentCar.make.slug, currentCar.slug),
      });
    }
  }

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.container} item xs={3}>
        <Chip
          icon={<CarIcon />}
          label={chipLabel}
          onClick={handleCurrentCar}
          clickable
          color="default"
          onDelete={handleCurrentCar}
          deleteIcon={<DoneIcon />}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <SearchBar />
      </Grid>
      <Grid className={classes.container} item xs={3}></Grid>
    </Grid>
  );
}
