import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_PAGE } from '~/store/ui/UITypes';
import SearchBox from '~/components/header/SearchBox';
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
  Grid,
  Box,
  Switch,
  FormControlLabel,
  Avatar,
  Typography,
} from '@material-ui/core';

import { HomeOutlined } from '@material-ui/icons';
import { IState } from '~/interfaces/IState';
import { setUIThemeAction } from '~/store/ui/UIActions';
import uselLocalStorage from '~/hooks/useLocalStorage';
import Link from 'next/link';
import { CompanyMenu, LoginMenu } from '~/components/header/HeaderMenu';
import url from '~/services/url';
import NoSsr from '@material-ui/core/NoSsr';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      fontSize: '2rem',
    },
    appbar: {
      width: '100%',
      display: 'flex',
      flexWrap: 'nowrap',
    },
    list: {
      width: 250,
    },
    tab: {
      ...(theme.mixins.toolbar.tab as object),
      minWidth: 10,
      marginLeft: '25px',
    },
    toolBarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    switchLabel: {
      fontSize: '90%',
    },
    tabsGrid: {
      position: 'relative',
    },
    switcherBox: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(1.2),
      right: theme.spacing(2),
    },
    searchBox: {
      paddingTop: theme.spacing(1),
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  })
);

interface IProps {
  setIsDark(value: boolean): void;
  isDark: boolean;
}

export default function Header({ setIsDark, isDark }: IProps) {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const avatar = useSelector((state: IState) => state.user.image);
  const user = useSelector((state: IState) => state.user);

  useEffect(() => {
    try {
      setIsDark(isLocalStorageDark);
      dispatch(setUIThemeAction(isLocalStorageDark));
    } catch (e) {
      console.error('No localstorage set up', e);
    }
  }, []);

  const [isLocalStorageDark, setIsLocalStorageDark] = uselLocalStorage(
    'isDark',
    false
  );
  const activePage = useSelector(
    (state: IState) => state.uiState.activePage
  ) as number;

  function isDarkHandler() {
    setIsDark(!isDark);
    dispatch(setUIThemeAction(!isDark));
    setIsLocalStorageDark(!isDark);
  }

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
  const goBlog = () => {
    router.push({ pathname: '/blog/category/vse-kategorii/1' });
    setDrawerOpen(false);
    dispatch({ type: SET_ACTIVE_PAGE, payload: 4 });
  };

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Menu stuff
  const [
    anchorElCompany,
    setAnchorElCompany,
  ] = React.useState<null | HTMLElement>(null);

  const handleClickCompany = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCompany(event.currentTarget);
  };

  const handleCloseCompany = () => {
    setAnchorElCompany(null);
  };
  // Categories stuff

  const [
    anchorElCategory,
    setAnchorElCategory,
  ] = React.useState<null | HTMLElement>(null);

  const handleClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCategory(event.currentTarget);
  };

  const handleCloseCategory = () => {
    setAnchorElCategory(null);
  };

  const [myAvatar, setMyavatar] = React.useState(
    '/images/local/default-avatar.jpg'
  );
  useEffect(() => {
    if (avatar) {
      setMyavatar(avatar);
    } else {
      setMyavatar('/images/local/default-avatar.jpg');
    }
  }, [avatar]);

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
          <ListItem button onClick={goHome} selected={activePage === 0}>
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText>ANGARA PARTS</ListItemText>
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
      <LoginMenu
        anchorEl={anchorElCategory}
        handleClick={handleClickCategory}
        handleClose={handleCloseCategory}
      />
      <CompanyMenu
        anchorEl={anchorElCompany}
        handleClick={handleClickCompany}
        handleClose={handleCloseCompany}
      />
      <Tabs
        value={activePage}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="ANGARA PARTS" onClick={goHome} />
        <Tab label="Машины" onClick={goCars} />
        <Tab label="Компания" onClick={handleClickCompany} />
        <Tab label="Контакты" onClick={goContacts} />
        <Tab label="Блог" onClick={goBlog} />
        <Tab label="Личный кабинет" onClick={handleClickCategory} />
      </Tabs>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar
          className={classes.appbar}
          position="static"
          color="transparent"
          elevation={0}
        >
          <Toolbar variant="regular">
            <Grid
              className={classes.toolBarContainer}
              justify="space-between"
              container
            >
              <Grid className={classes.tabsGrid} item container>
                {matches ? drawer : tabs}
              </Grid>

              <NoSsr>
                <Box className={classes.switcherBox}>
                  {user.access ? (
                    <Avatar className={classes.avatar} src={myAvatar} />
                  ) : (
                    <Link href={url.account.login()}>
                      <a>
                        <Typography variant="body2">Войти</Typography>
                      </a>
                    </Link>
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        size="small"
                        checked={isDark}
                        onChange={isDarkHandler}
                      />
                    }
                    label={isDark ? 'светлая тема' : 'темная тема'}
                    labelPlacement="start"
                    classes={{ label: classes.switchLabel }}
                  />
                </Box>
              </NoSsr>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
      <Grid container className={classes.searchBox}>
        <Grid item xs={12}>
          <SearchBox />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
