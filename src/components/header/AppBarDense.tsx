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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

export default function AppBarDense() {
  const classes = useStyles();

  const router = useRouter();

  const goTestPage = () => {
    router.push({ pathname: '/testpage', query: { count: 1 } });
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
          <Typography variant="h6" color="inherit">
            <Link href="/">Главная</Link>
          </Typography>
          <Button color="inherit">Login</Button>
          <Button onClick={goTestPage} color="inherit">
            Test Page
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
