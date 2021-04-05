import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Head from 'next/head';
/* import AppBar from '~/components/header/AppBar'; */
import AppBarDense from '~/components/header/Header';
import { createStyles, Theme, makeStyles } from '@material-ui/core';
import '../../styles/MainLayoutStyles.module.scss';
import Footer from '~/components/footer/Footer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      borderBottom: '1px solid',
      borderColor: theme.palette.divider,
    },
  })
);

export default function MainLayout(props: any) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>Angara && | The Best Spares Shop</title>
      </Head>
      <Container maxWidth="xl">
        <div>
          <div>
            <AppBarDense />
            <div className={classes.divider} />
          </div>
          <div>{props.children}</div>
        </div>
      </Container>
      <div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
