/*
2. Save current car on choser
3. Save user id and currentCar to server endpoint
4. Make garage of cars based on user id in cookies
5. When wisiting car page suggest change car or not?
6. Split car chooser to select from garage or from all cars
7. Make JWT authorization for saving orders and so on
8. Make product selector based on car and filters
9. Make filters builder according to product properties
10.Make related product widget
11. Make analogs product widget
12. Make all categories on car page list
13. Make related category widget
14. Make blog
15. Make related post widget
16. Make main page with widgets
17. Make search widget
18. Make search logic by car or all products or category with that products
19. Make shopping cart widget
20. Make rating widet
21. Make static pages
22. Make rewiew logic and put under the products


aa. Cookies making done, needs to be tested
ab. UUID done also needs to be checked
ac. Needs make endpoint for UUID and post and get it from server

ad. Needs to add to redux user id and suggest stuff by user id
some comment
 */

import React, { /*Context*/ useEffect } from 'react';

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
import { vehiclesUrl, cookiesAge } from '~/config';

import { GET_ALL_CARS } from '~/store/types';
import { CookiesProvider, useCookies } from 'react-cookie';
/* import App from 'next/app'; */
/* import { parseCookies } from '~/helpers'; */

import 'styles/globals.scss';
import { setCurrentCarAction } from '~/store/actions';
import { ICar } from '~/interfaces/ICar';
import useLocalStorage from '~/hooks/useLocalStorage';

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
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);
  const [cookies, setCookie] = useCookies(['userUUID']);
  const [localstorage, setLocalstorage] = useLocalStorage('userUUID', '');

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
      /* if (cookies.currentCar) { */
      /*   currentCarFromCookies = cookies.currentCar; */
      /* } else { */
      /*   currentCarFromCookies = undefined; */
      /* } */
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
  console.log(cookies.userUUID, 'In _app');

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
