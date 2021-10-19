import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
/* import AppBar from '~/components/header/AppBar'; */
import '../../styles/MainLayoutStyles.module.scss';

const Header = dynamic(() => import('~/components/header/Header'));

const Footer = dynamic(() => import('~/components/footer/Footer2'));
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
