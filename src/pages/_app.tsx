import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

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
import { shopSetUserId } from '~/store/shop/shopActions';
import { createOrUpdateUser } from '~/endpoints/carsEndpoint';
// import SimpleReactLightbox from 'simple-react-lightbox';
import * as gtag from '~/services/gtag';

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
  const [userId, setUserId] = useState('');

  const isProduction = process.env.NODE_ENV === 'production';

  /* const useTheme = theme; */

  const useTheme = isDark ? darkTheme : theme;
  const router = useRouter();
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

        store.dispatch(setCurrentCarAction(currentCarFromCookies));
      } catch (e) {
        currentCarFromCookies = undefined;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    let lastCars: ICar[] = [];
    try {
      lastCars = JSON.parse(window.localStorage.getItem('lastCars') as string);
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
      store.dispatch(shopSetUserId(userUUID));
    } else {
      if (cookies.hasOwnProperty('userUUID')) {
        userUUID = cookies.userUUID;
        setLocalstorage(userUUID);
        store.dispatch(shopSetUserId(userUUID));
      } else {
        userUUID = uuidv4();
        setCookie('userUUID', userUUID, {
          path: '/',
          maxAge: cookiesAge.cookierUserMaxAge,
        });
        store.dispatch(shopSetUserId(userUUID));
        setLocalstorage(userUUID);
      }
    }
    setUserId(userUUID);
    async function updateUser() {
      await createOrUpdateUser(userUUID);
    }

    updateUser();
  }, []);

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
            <CssBaseline />
            <MainLayout isDark={isDark} setIsDark={setIsDark}>
              <Component {...pageProps} userUUID={userUUID} />
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

export default MyApp;
