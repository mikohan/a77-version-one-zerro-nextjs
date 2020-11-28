import React from 'react';
import { Grid } from '@material-ui/core';
import Head from 'next/head';
import AppBar from '~/components/header/AppBar';
import AppBarDense from '~/components/header/AppBarDense';
import { createStyles, Theme, makeStyles } from '@material-ui/core';
import '../../styles/MainLayoutStyles.module.scss';
import Footer from '~/components/footer/Footer';
import LeftSideComponent from '~/components/main/LeftSideComponent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    rootGrid: {
      position: 'relative',
      minHeight: '100vh',
    },
    mainGrid: {
      marginTop: theme.spacing(2),
    },
    footerGrid: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      minHeight: 50,
      backgroundColor: theme.palette.primary.main,
    },
  })
);

export default function MainLayout(props: any) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>A77 new life</title>
      </Head>
      <div className={classes.root}>
        <Grid className={classes.rootGrid} container direction="column">
          <Grid item xs={12}>
            <AppBarDense />
          </Grid>
          <Grid item xs={12}>
            <AppBar />
          </Grid>
          <Grid item container>
            <Grid container>
              <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={10}>
                <Grid
                  className={classes.mainGrid}
                  container
                  item
                  xs={12}
                  spacing={1}
                >
                  <Grid item xs={false} sm={2}>
                    <LeftSideComponent />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    {props.children}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={false} sm={1} />
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
