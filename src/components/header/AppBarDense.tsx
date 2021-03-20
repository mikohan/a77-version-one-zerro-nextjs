import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import { Tabs, Tab } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
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

  const router = useRouter();
  console.log(router.query);

  const goHome = () => {
    router.push({ pathname: '/' });
  };
  const goMake = () => {
    router.push({ pathname: '/' });
  };
  const goGrid = () => {
    router.push({ pathname: '/grid', query: { count: 1 } });
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab className={classes.tab} label="Home" onClick={goHome} />
            <Tab label="Item Two" onClick={goMake} />
            <Tab label="Item Three" />
            <Tab label="Item Three" />
            <Tab label="Grid Testes" onClick={goGrid} />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}
