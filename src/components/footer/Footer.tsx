import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: { minHeight: '8rem' },
  /* main: { */
  /*   marginTop: theme.spacing(8), */
  /*   marginBottom: theme.spacing(2), */
  /* }, */
  footer: {},
  mainGridContainer: {
    position: 'absolute',
  },
  gridItem: {
    margin: '3rem',
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Grid container justify="center" className={classes.mainGridContainer}>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid item>Home</Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid item>Contacts</Grid>
              <Grid item>About</Grid>
              <Grid item>Policy</Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid item>Some page</Grid>
              <Grid item>Some other page</Grid>
              <Grid item>Some yet anoter page</Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid item>About Us</Grid>
              <Grid item>Team</Grid>
              <Grid item>Contact Us</Grid>
            </Grid>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}
