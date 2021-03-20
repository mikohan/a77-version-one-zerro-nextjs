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
import { InboxTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    appbar: {
      minHeight: '3rem',
    },
    list: {
      width: 250,
    },
    tab: {
      ...(theme.mixins.toolbar.tab as object),
      minWidth: 10,
      marginLeft: '25px',
    },
  })
);

export default function AppBarDense() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    if (pathname === '/' && value !== 0) {
      setValue(0);
    } else if (pathname === '/cars' && value !== 1) {
      setValue(1);
    } else if (pathname === '/contacts' && value !== 2) {
      setValue(2);
    } else if (pathname === '/about' && value !== 3) {
      setValue(3);
    } else if (pathname === '/contacts' && value !== 4) {
      setValue(4);
    } else if (pathname === '/grid' && value !== 5) {
      setValue(5);
    }
  }, []);

  const goHome = () => {
    router.push({ pathname: '/' });
    setDrawerOpen(false);
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
          <ListItem button onClick={goHome}>
            <ListItemIcon>
              <InboxTwoTone />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick={goContacts}>
            <ListItemIcon>
              <InboxTwoTone />
            </ListItemIcon>
            <ListItemText>Contacts</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Home" onClick={goHome} />
        <Tab label="Cars" onClick={goCars} />
        <Tab label="Item Three" />
        <Tab label="About" onClick={goAbout} />
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
