import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from 'next/link';
import MLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_PAGE } from '~/store/types';
import { IState } from '~/interfaces/IState';
import { Hidden } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Image from 'next/image';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <MLink color="inherit" href="/">
        Your Website
      </MLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  /* main: { */
  /*   marginTop: theme.spacing(8), */
  /*   marginBottom: theme.spacing(2), */
  /* }, */
  commonGrid: {
    minHeight: '10rem',
  },
  footer: {
    width: '100%',
    /* position: 'absolute', */
    /* bottom: 0, */
    background: theme.palette.primary.light,
  },
  mainGridContainer: {},
  socialContainer: {},
  gridItem: {
    border: '1px solid black',
    marginLeft: '6rem',
    marginRight: '6rem',
  },
  link: {},
  icon: {
    width: '2rem',
    hight: '2rem',
    [theme.breakpoints.down('sm')]: {
      width: '1.5rem',
      hight: '1.5rem',
    },
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container className={classes.commonGrid}>
        <Hidden smDown>
          <Grid
            container
            item
            justify="center"
            alignItems="center"
            className={classes.mainGridContainer}
          >
            <Grid item className={classes.gridItem}>
              <Grid container direction="column">
                <Grid item component={Link} href="/">
                  Home
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Grid container direction="column">
                <Grid item component={Link} href="/contacts">
                  Contacts
                </Grid>
                <Grid item component={Link} href="/">
                  About
                </Grid>
                <Grid item component={Link} href="/">
                  Policy
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Grid container direction="column">
                <Grid item component={Link} href="/">
                  Some page
                </Grid>
                <Grid item component={Link} href="/">
                  Some other page
                </Grid>
                <Grid item component={Link} href="/">
                  Some yet anoter page
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Grid container direction="column">
                <Grid
                  className={classes.link}
                  item
                  component={Link}
                  href="/about"
                >
                  About Us
                </Grid>
                <Grid item component={Link} href="/grid">
                  Team
                </Grid>
                <Grid item component={Link} href="/contacts">
                  Contact Us
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid
          className={classes.socialContainer}
          container
          item
          justify="flex-end"
        >
          <Grid
            item
            component={'a'}
            href="https://vk.com/angara772018"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              className={classes.icon}
              src="/images/local/vk.svg"
              alt="VKontakte"
            />
          </Grid>
          <Grid
            item
            component={'a'}
            href="https://ok.ru/group/52962919973041"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              className={classes.icon}
              src="/images/local/ok.svg"
              alt="Odnoklasniki"
            />
          </Grid>
          <Grid
            item
            component={'a'}
            href="https://www.youtube.com/channel/UCJ97RljnqyAdKKmAc8mvHZw"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src="/images/local/yt.svg"
              alt="youtube link"
              className={classes.icon}
            />
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
}
