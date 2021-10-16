import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery, useTheme } from '@material-ui/core';

import { SET_ACTIVE_PAGE } from '~/store/ui/UITypes';
import SearchBox from '~/components/header/SearchBox';

import { HomeOutlined } from '@material-ui/icons';
import { IState } from '~/interfaces/IState';
import { setUIThemeAction } from '~/store/ui/UIActions';
import uselLocalStorage from '~/hooks/useLocalStorage';
import Link from 'next/link';
import { CompanyMenu, LoginMenu } from '~/components/header/HeaderMenu';
import url from '~/services/url';
import NoSsr from '@material-ui/core/NoSsr';
import { COMPANY_INFORMATION } from '~/config';

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
  const cart = useSelector((state: IState) => state.cart);

  useEffect(() => {
    try {
      setIsDark(isLocalStorageDark);
      dispatch(setUIThemeAction(isLocalStorageDark));
    } catch (e) {
      console.error('No localstorage set up', e);
    }
  }, []);
  useEffect(() => {}, [cart]);

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
          <Link href="/">
            <ListItem onClick={toggleDrawer} button selected={activePage === 0}>
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText>
                {COMPANY_INFORMATION.COMPANY_NAME_LOGO}
              </ListItemText>
            </ListItem>
          </Link>
          <Divider />
          <ListItem button selected={activePage === 3}>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <Link href="/contacts">
              <ListItemText onClick={toggleDrawer}>Контакты</ListItemText>
            </Link>
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
        <Tab
          label={
            <Link href={url.home()}>
              <a>{COMPANY_INFORMATION.COMPANY_NAME_LOGO}</a>
            </Link>
          }
        />
        <Tab
          label={
            <Link href={url.cars()}>
              <a>Машины</a>
            </Link>
          }
        />

        <Tab label="Компания" onClick={handleClickCompany} />
        <Tab
          label={
            <Link href={url.contacts()}>
              <a>Контакты</a>
            </Link>
          }
        />
        <Tab
          label={
            <Link href={url.blogCategory('vse-kategorii', '1')}>Блог</Link>
          }
        />
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
