import React, { Context, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Router } from 'next/dist/client/router';
import theme from '~/theme';
import { Provider } from 'react-redux';
import { initializeStore, useStore } from '~/store/store';
import axios from 'axios';
import { vehiclesUrl } from '~/config';

import { GET_ALL_CARS } from '~/store/types';
import { CookiesProvider } from 'react-cookie';
import App from 'next/app';
import { parseCookies } from '~/helpers';

import 'styles/globals.scss';
import { setCurrentCarAction } from '~/store/actions';
import { ICar } from '~/interfaces/ICar';

import { v4 as uuidv4 } from 'uuid';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.remove();
});

function MyApp(props: any) {
  const { Component, pageProps, allCookies } = props;
  const store = useStore(pageProps.initialReduxState);
  console.log(allCookies.currentCar);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(vehiclesUrl);
      const cars = res.data;
      store.dispatch({
        type: GET_ALL_CARS,
        payload: cars,
      });
      // Dispatching currentCar to redux
      let currentCarFromCookies: ICar | undefined;
      if (allCookies.currentCar) {
        currentCarFromCookies = JSON.parse(allCookies.currentCar);
      } else {
        currentCarFromCookies = undefined;
      }

      store.dispatch(setCurrentCarAction(currentCarFromCookies));
    };
    fetchData();
  }, []);

  let userUUID: string = '';

  if (Object.hasOwnProperty('userUUID')) {
    userUUID = allCookies.userUUID;
  } else {
    userUUID = uuidv4();
  }

  useEffect(() => {
    console.log(uuidv4());
  }, [userUUID]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CookiesProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </CookiesProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// It is for server side render of redux

MyApp.getInitialProps = async (context: any) => {
  const reduxStore = await initializeStore({});

  const res = await axios.get(vehiclesUrl);
  const cars = res.data;
  const allCookies = parseCookies(context.ctx.req);

  return {
    ...(await App.getInitialProps(context)),
    cars,
    initialReduxState: reduxStore.getState(),
    allCookies: allCookies,
  };
};

export default MyApp;
