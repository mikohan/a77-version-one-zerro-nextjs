import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_PAGE } from '~/store/ui/UITypes';
import {
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { InboxTwoTone, HomeOutlined } from '@material-ui/icons';
import { IState } from '~/interfaces/IState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      fontSize: '2rem',
    },
    appbar: {
      minHeight: '4rem',
    },
    list: {
      width: 250,
    },
    listItem: {},
    tab: {
      ...(theme.mixins.toolbar.tab as object),
      minWidth: 10,
      marginLeft: '25px',
    },
  })
);

export default function AppBarDense() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const activePage = useSelector(
    (state: IState) => state.uiState.activePage
  ) as number;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    // setValue(newValue);
    dispatch({ type: SET_ACTIVE_PAGE, payload: newValue });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const pages: string[] = ['/', '/car', '/about', '/contacts', '/grid'];

  const router = useRouter();
  const { pathname } = router;

  const cur = pages.findIndex((item: string) => item === pathname);
  // Needs to be refactored later
  if (cur < 0) {
    dispatch({ type: SET_ACTIVE_PAGE, payload: 0 });
  }
  useEffect(() => {
    dispatch({ type: SET_ACTIVE_PAGE, payload: cur });
  }, [activePage, pathname]);

  const goHome = () => {
    router.push({ pathname: '/' });
    setDrawerOpen(false);
    dispatch({ type: SET_ACTIVE_PAGE, payload: 0 });
  };
  const goCars = () => {
    router.push({ pathname: '/car' });
    setDrawerOpen(false);
  };
  const goAbout = () => {
    router.push({ pathname: '/about' });
    setDrawerOpen(false);
  };
  const goContacts = () => {
    router.push({ pathname: '/contacts' });
    setDrawerOpen(false);
  };
  const goGrid = () => {
    router.push({ pathname: '/grid' });
    setDrawerOpen(false);
    dispatch({ type: SET_ACTIVE_PAGE, payload: 4 });
  };

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        open={drawerOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <List className={classes.list}>
          <ListItem
            button
            onClick={goHome}
            selected={activePage === 0}
            className={classes.listItem}
          >
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick={goContacts} selected={activePage === 3}>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText>Contacts</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        <MenuIcon className={classes.menuButton} />
      </IconButton>
    </React.Fragment>
  );

  const tabs = (
    <React.Fragment>
      <Tabs
        value={activePage}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Home" onClick={goHome} />
        <Tab label="Cars" onClick={goCars} />
        <Tab label="About" onClick={goAbout} />
        <Tab label="Contacts" onClick={goContacts} />
        <Tab label="Grid Testes" onClick={goGrid} />
      </Tabs>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className={classes.appbar} variant="regular">
          {matches ? drawer : tabs}
        </Toolbar>
      </AppBar>
    </div>
  );
}
