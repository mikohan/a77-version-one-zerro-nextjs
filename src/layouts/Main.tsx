import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Head from 'next/head';
/* import AppBar from '~/components/header/AppBar'; */
import Header from '~/components/header/Header';
import { createStyles, Theme, makeStyles } from '@material-ui/core';
import '../../styles/MainLayoutStyles.module.scss';
import Footer from '~/components/footer/Footer';
import { useSelector } from 'react-redux';
import theme from '~/theme';
import { IState } from '~/interfaces/IState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    head: {
      margin: 0,
    },
  })
);

export default function MainLayout(props: any) {
  const { setIsDark } = props;
  const classes = useStyles();
  const isDark = useSelector((state: IState) => state.uiState.isDark);
  const isThemeDark = isDark ? 'dark' : 'light';
  theme.palette.type = isThemeDark;
  return (
    <React.Fragment>
      <Head>
        <title>Angara && | The Best Spares Shop</title>
      </Head>
      <div className={classes.head}>
        <Header setIsDark={setIsDark} />
      </div>
      <div>{props.children}</div>
      <div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
