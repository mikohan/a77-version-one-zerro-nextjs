import React from 'react';
import { Grid } from '@material-ui/core';
import Head from 'next/head';
import AppBar from '~/components/header/AppBar';
import { createStyles, Theme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
        <Grid container direction="column">
          <Grid item>
            <AppBar />
          </Grid>
          <Grid item container>
            <Grid item xs={false} sm={2} />
            <Grid item xs={12} sm={6}>
              {props.children}
            </Grid>
          </Grid>
          <footer></footer>
        </Grid>
      </div>
    </React.Fragment>
  );
}
