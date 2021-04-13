import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Router } from 'next/dist/client/router';
import theme, { darkTheme } from '~/theme';
import { Provider } from 'react-redux';
import { useStore } from '~/store/store';
import { cookiesAge } from '~/config';

import { GET_ALL_CARS } from '~/store/types';
import { CookiesProvider, useCookies } from 'react-cookie';
/* import App from 'next/app'; */
/* import { parseCookies } from '~/helpers'; */

import 'styles/globals.scss';
import { makesAction, setCurrentCarAction } from '~/store/actions';
import { ICar } from '~/interfaces/ICar';
import useLocalStorage from '~/hooks/useLocalStorage';

import { v4 as uuidv4 } from 'uuid';
import { getMakes, getVehicles } from '~/endpoints/carsEndpoint';
import MainLayout from '~/layouts/Main';
import { shopLastCarAction } from '~/store/shop/shopActions';

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
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);
  const [cookies, setCookie] = useCookies(['userUUID']);
  const [localstorage, setLocalstorage] = useLocalStorage('userUUID', '');
  const [isDark, setIsDark] = useState(false);
  /* const useTheme = theme; */

  const useTheme = isDark ? darkTheme : theme;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getVehicles();
      const cars = res;
      store.dispatch({
        type: GET_ALL_CARS,
        payload: cars,
      });

      const makesPromise = await getMakes();
      store.dispatch(makesAction(makesPromise));
      // Dispatching currentCar to redux
      let currentCarFromCookies: ICar | undefined;
      try {
        currentCarFromCookies = JSON.parse(
          window.localStorage.getItem('currentCar') as string
        );
      } catch (e) {
        currentCarFromCookies = undefined;
      }

      store.dispatch(setCurrentCarAction(currentCarFromCookies));
    };
    fetchData();
  }, []);

  useEffect(() => {
    let lastCars: ICar[] = [];
    try {
      lastCars = JSON.parse(window.localStorage.getItem('lastCars') as string);
      console.log(lastCars);
      store.dispatch(shopLastCarAction(lastCars));
    } catch (e) {
      console.error("Can't get lastCars from localstorage", e);
    }
  }, []);

  let userUUID: string = '';

  useEffect(() => {
    // Trying to get user Id from localstorage
    // If not exists try to get from cookies
    // if not exists - set new one
    // Working tested
    if (localstorage) {
      userUUID = localstorage;
    } else {
      if (cookies.hasOwnProperty('userUUID')) {
        userUUID = cookies.userUUID;
        setLocalstorage(userUUID);
      } else {
        userUUID = uuidv4();
        setCookie('userUUID', userUUID, {
          path: '/',
          maxAge: cookiesAge.cookierUserMaxAge,
        });
        setLocalstorage(userUUID);
      }
    }
  });

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  // console.log(cookies.userUUID, 'In _app');

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
          <ThemeProvider theme={useTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <MainLayout setIsDark={setIsDark}>
              <Component {...pageProps} />
            </MainLayout>
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

/* MyApp.getInitialProps = async (context: any) => { */
/*   const { req, res } = context.ctx; */
/*   const isServer = !!req; */
/*   const isBrowser = !req; */
/*   const reduxStore = await initializeStore({}); */

/*   const resp = await axios.get(vehiclesUrl); */
/*   const cars = resp.data; */
/*   //const allCookies = parseCookies(context.ctx.req); */
/*   //if (!('UUID' in allCookies)) { */
/*   //} */

/*   return { */
/*     ...(await App.getInitialProps(context)), */
/*     cars, */
/*     initialReduxState: reduxStore.getState(), */
/*     /1* allCookies: allCookies, *1/ */
/*   }; */
/* }; */

export default MyApp;
