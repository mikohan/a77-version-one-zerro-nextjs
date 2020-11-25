import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import Head from 'next/head';
import AppBar from '~/components/header/AppBar';
import { createStyles, Theme, makeStyles } from '@material-ui/core';
import '../../styles/MainLayoutStyles.module.scss';
import Footer from '~/components/footer/Footer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    rootGrid: {
      position: 'relative',
      minHeight: '100vh',
    },
    main: {},
    footerGrid: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      minHeight: 50,
      backgroundColor: theme.palette.primary.main,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

export default function MainLayout(props: any) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>A77 new life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.root}>
        <Grid className={classes.rootGrid} container direction="column">
          <Grid item>
            <AppBar />
          </Grid>
          <Grid className={classes.main} item container xs={12} sm={10}>
            <Grid container item xs={12} spacing={2}>
              <Grid item sm={2}>
                Here Side Components Going
              </Grid>
              <Grid item xs={12} sm={10}>
                {' '}
                <Paper>{props.children}</Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.footerGrid} item container>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
