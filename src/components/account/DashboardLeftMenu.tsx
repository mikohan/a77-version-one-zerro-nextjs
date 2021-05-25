import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Typography, Paper, MenuItem } from '@material-ui/core';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import url from '~/services/url';
import { useDispatch } from 'react-redux';
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

  function handleLogOut() {
    dispatch(logout());
    router.push(url.cars());
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
          <ListItemText primary="Профиль" onClick={handleProfile} />
        </MenuItem>
        <MenuItem onClick={handleAddresses}>Мои Адреса</MenuItem>
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
