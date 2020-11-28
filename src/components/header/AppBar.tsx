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
import { fetchCategories } from '~/store/actions/categoriesAction';

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

function asString(query: string | string[]) {
  if (Array.isArray(query)) {
    return query[0];
  }
  return query;
}

export default function ButtonAppBar() {
  const classes = useStyles();
  const router = useRouter();
  const carModel = asString(router.query.model || 'all');
  const carMake = router.query.make || '';
  let carHref = '/';
  if (carModel) {
    carHref = `/car/${carMake}/${carModel}`;
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories(carModel));
  });

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
            <Link href={carHref}>
              <a>Главная</a>
            </Link>
          </Typography>
          <Button color="inherit">{carModel}</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
