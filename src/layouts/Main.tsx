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
    divider: {
      borderBottom: '1px solid',
      borderColor: theme.palette.divider,
    },
  })
);

export default function MainLayout(props: any) {
  const { setIsDark } = props;
  const classes = useStyles();
  const isDark = useSelector((state: IState) => state.uiState.isDark);
  const isThemeDark = isDark ? 'dark' : 'light';
  theme.palette.type = isThemeDark;
  console.log(theme.palette.type);
  return (
    <React.Fragment>
      <Head>
        <title>Angara && | The Best Spares Shop</title>
      </Head>
      <Container maxWidth="xl">
        <div>
          <div>
            <Header setIsDark={setIsDark} />
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
