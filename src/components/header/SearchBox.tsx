/* eslint-disable no-use-before-define */
import React from 'react';
import { Box, Grid, Hidden, Typography, Badge } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import SearchBar from '~/components/header/SearchBar';
import CarChooseModal from '~/components/car/CarChooseModal';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import Link from 'next/link';
import url from '~/services/url';
import { ICar } from '~/interfaces';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MiniCart from '~/components/header/MiniCart';
import { Avatar } from '@material-ui/core';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/client';
import { imageServerUrl } from '~/config';

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
    shoppingCart: {
      fontSize: '1.7rem',
    },
    miniCartButton: {
      cursor: 'pointer',
    },
    loginAvatar: {
      marginLeft: theme.spacing(2),
    },
  })
);

export default function SearchBox() {
  const classes = useStyles();
  const cart = useSelector((state: IState) => state.cart);
  const [session, loading] = useSession();
  let currentCar: ICar = {} as ICar;
  if (typeof window !== 'undefined') {
    currentCar = useSelector((state: IState) => state.shop.currentCar) as ICar;
  }

  // Mini Cart section starts
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClickCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Redirect to car page on click

  return (
    <React.Fragment>
      <MiniCart anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
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
            <Box className={classes.miniCartButton} onClick={handleClickCart}>
              <Badge badgeContent={cart.quantity} color="primary">
                <ShoppingCartOutlinedIcon className={classes.shoppingCart} />
              </Badge>
            </Box>
            {session ? (
              <Box className={classes.loginAvatar}>
                <Avatar>
                  <Image
                    src={`${imageServerUrl}${session.user?.image}`}
                    width={50}
                    height={50}
                  />
                </Avatar>
              </Box>
            ) : (
              <Box className={classes.loginAvatar}>
                <Typography variant="subtitle1" onClick={handleSingIn}>
                  Войти
                </Typography>
              </Box>
            )}
          </Grid>
        </Hidden>
      </Grid>
    </React.Fragment>
  );
}
