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
  const classes = useStyles();
  const router = useRouter();
  /* const carModel = asString(router.query.model || 'all'); */
  /* const carMake = router.query.make || ''; */
  const dispatch = useDispatch();
  const storeCarModel = useSelector((state: any) => {
    return state.currentCar.carModel;
  });

  let carHref = '/';
  if (storeCarModel) {
    carHref = `/car/${storeCarModel.make}/${storeCarModel.model}`;
  }

  useEffect(() => {
    /* dispatch(changeCarModel(carModel)); */
    dispatch(getMakes());
  }, []);

  return (
    <div className={classes.root}>
      <AppBar elevation={1} color="inherit" position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link href="/car">
              <a>Главная</a>
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link href={carHref}>
              <a>{storeCarModel.toUpperCase()}</a>
            </Link>
          </Typography>
          <Button color="inherit">Some Button</Button>

          <CarChooseModal currentCar={storeCarModel} />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
