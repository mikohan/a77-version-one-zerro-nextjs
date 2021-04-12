/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { Grid, Chip, Typography } from '@material-ui/core';
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
import CarChooseModal from '~/components/car/CarChooseModal';

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
    myCar: {
      marginRight: theme.spacing(1),
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

  const [modalOpen, setModalOpen] = useState(false);

  // Redirect to car page on click
  function handleCurrentCar() {
    /* if (currentCar && Object.keys(currentCar).length > 0) { */
    /*   router.push({ */
    /*     pathname: url.model(currentCar.make.slug, currentCar.slug), */
    /*   }); */
    /* } */
  }

  return (
    <React.Fragment>
      <Grid className={classes.root} container>
        <Grid className={classes.container} item xs={3}>
          {false ? (
            <React.Fragment>
              <Typography className={classes.myCar} variant="subtitle1">
                Моя машина:
              </Typography>
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
            </React.Fragment>
          ) : (
            <CarChooseModal />
          )}
        </Grid>
        <Grid item xs={6}>
          <SearchBar />
        </Grid>
        <Grid className={classes.container} item xs={3}></Grid>
      </Grid>
    </React.Fragment>
  );
}
