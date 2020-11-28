import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { getMakes } from '~/store/actions/categoriesAction';
import { changeCarModel } from '~/store/actions/categoriesAction';

import CarChooseModal from '~/components/header/CarChooseModal';

import { useToggle } from '~/hooks/useToggle';
import { asString } from '~/helpers';
import { MenuItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

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
  // use toggle test
  const [toggle, setToggle] = useToggle(false);

  console.log(toggle);

  // End of use toggle

  const classes = useStyles();
  const router = useRouter();
  const carModel = asString(router.query.model || 'all');
  const carMake = router.query.make || '';
  let carHref = '/';
  if (carModel) {
    carHref = `/car/${carMake}/${carModel}`;
  }
  const dispatch = useDispatch();
  const storeCarModel = useSelector((state: any) => {
    return state.currentCar.carModel;
  });
  console.log('Store car model', storeCarModel);

  useEffect(() => {
    if (carModel !== 'all') {
      dispatch(changeCarModel(carModel));
    }
    dispatch(getMakes());
  }, []);

  return (
    <div className={classes.root}>
      <AppBar elevation={1} color="inherit" position="static">
        <Toolbar variant="dense">
          <Grid container>
            <Grid item xs={1}>
              <Typography variant="h6" className={classes.title}>
                <Link href={carHref}>
                  <a>
                    {storeCarModel
                      ? storeCarModel.toUpperCase()
                      : carModel.toUpperCase()}
                  </a>
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography style={{ flex: 1 }} variant="h6">
                <CarChooseModal currentCar={carModel} />
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
