import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { makesAction } from '~/store/actions/categoriesAction';

import CarChooseModal from '~/components/header/CarChooseModal';

import { asString } from '~/helpers';
import Grid from '@material-ui/core/Grid';
import { buildMakes } from '~/helpers';
import { IState } from '~/interfaces/IState';
import { ICar } from '~/interfaces/ICar';
import useLocalStorage from '~/hooks/useLocalStorage';
import { setCurrentCarAction } from '~/store/actions';

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

export default function ButtonAppBar() {
  // hook fo local storage

  const classes = useStyles();
  const router = useRouter();
  const carModel = asString(router.query.model || '');
  let currentCar: ICar;

  //Ligic: lookup current car in localStorage, if not exist look in redux store
  // If in local storage dispatch it to redux
  const dispatch = useDispatch();
  const [localstorage, setLocalstorage] = useLocalStorage('currentCar', {});
  currentCar = localstorage;
  console.log(localstorage);
  if (Object.keys(currentCar).length) {
    currentCar = useSelector((state: IState) => state.shop.currentCar);
  } else {
    dispatch(setCurrentCarAction(currentCar));
  }
  const carMake = router.query.make || '';
  let carHref = '/';
  if (carModel) {
    carHref = `/car/${carMake}/${carModel}`;
  }
  const storeCarModel = useSelector((state: IState) => {
    return state.shop.cars;
  });

  useEffect(() => {
    dispatch(makesAction(buildMakes(storeCarModel)));
  }, [storeCarModel]);

  return (
    <div className={classes.root}>
      <AppBar elevation={0} color="inherit" position="static">
        <Toolbar variant="dense">
          <Grid container>
            <Grid item xs={1}>
              <Typography variant="h6" className={classes.title}>
                <Link href={carHref}>dldl</Link>
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography style={{ flex: 1 }} variant="h6">
                <CarChooseModal />
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
