import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Head from 'next/head';
/* import AppBar from '~/components/header/AppBar'; */
import AppBarDense from '~/components/header/Header';
import { createStyles, Theme, makeStyles } from '@material-ui/core';
import '../../styles/MainLayoutStyles.module.scss';
import Footer from '~/components/footer/Footer';
import LeftSideBar from '~/components/main/LeftSideBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      border: '3px solid blue',
    },
    rootGrid: {
      position: 'relative',
      minHeight: '80vh',
      border: '2px solid blue',
    },
    mainGrid: {
      marginTop: theme.spacing(2),
    },
    contentGrid: {
      border: '5px solid pink',
    },
    footerGrid: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      minHeight: '10rem',
      backgroundColor: theme.palette.text.disabled,
    },
    divider: {
      borderBottom: '1px solid #e8e8eb ',
    },
    footerDiv: {},
  })
);

export default function MainLayout(props: any) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>Angara && | The Best Spares Shop</title>
      </Head>
      <Container className={classes.container} maxWidth="xl">
        <Grid className={classes.rootGrid} container direction="column">
          <Grid item xs={12}>
            <AppBarDense />
            <div className={classes.divider} />
          </Grid>
          <Grid className={classes.contentGrid} item container xs={12}>
            {props.children}
          </Grid>
        </Grid>
      </Container>
      <div className={classes.footerDiv}>
        <Footer />
      </div>
    </React.Fragment>
  );
}
