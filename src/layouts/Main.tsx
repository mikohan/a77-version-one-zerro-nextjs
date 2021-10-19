import React from 'react';
import Head from 'next/head';
/* import AppBar from '~/components/header/AppBar'; */
import '../../styles/MainLayoutStyles.module.scss';

import Header from '~/components/header/Header';

import Footer from '~/components/footer/Footer2';
import theme from '~/theme';

export default function MainLayout(props: any) {
  const { isDark, setIsDark } = props;
  // const isDark = useSelector((state: IState) => state.uiState.isDark);
  const isThemeDark = isDark ? 'dark' : 'light';
  theme.palette.type = isThemeDark;
  return (
    <React.Fragment>
      <Head>
        <title>Angara && | The Best Spares Shop</title>
      </Head>
      <div>
        <Header setIsDark={setIsDark} isDark={isDark} />
      </div>
      <div>{props.children}</div>
      <div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
