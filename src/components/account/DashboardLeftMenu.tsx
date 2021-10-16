import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import url from '~/services/url';
import { logout } from '~/store/users/userAction';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
  })
);

export default function SimpleList() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  function handleDashboard() {
    router.push(url.account.dashboard());
  }
  function handleGarage() {
    router.push(url.account.garage());
  }
  function handleProfile() {
    router.push(url.account.profile());
  }
  function handleAddresses() {
    router.push(url.account.addresses());
  }
  function handleOrders() {
    router.push(url.account.orders());
  }

  function handleLogOut() {
    dispatch(logout());
    router.push(url.home());
  }

  function handlePassword() {
    const con: boolean = confirm(
      `Если нажмете ОК, то после смены пароля будет нужно Залогиниться снова!`
    );
    if (con) {
      dispatch(logout());
      router.push(url.account.resetPassword());
    }
  }

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h6">
        Навигация
      </Typography>
      <List>
        <MenuItem>
          <ListItemText primary="Панель управления" onClick={handleDashboard} />
        </MenuItem>
        <MenuItem>
          <ListItemText primary="Гараж" onClick={handleGarage} />
        </MenuItem>
        <MenuItem>
          <ListItemText primary="Заказы" onClick={handleOrders} />
        </MenuItem>
        <MenuItem>
          <ListItemText primary="Профиль" onClick={handleProfile} />
        </MenuItem>
        <MenuItem onClick={handleAddresses}>Мои Адреса</MenuItem>
        <MenuItem>
          <ListItemText primary="Изменить Пароль" onClick={handlePassword} />
        </MenuItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Выйти" onClick={handleLogOut} />
        </ListItem>
      </List>
    </Paper>
  );
}
