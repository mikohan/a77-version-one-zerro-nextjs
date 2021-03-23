import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import data from '~/data/shopData';

export default function About() {
  return (
    <React.Fragment>
      <Head>
        <title key="title">About US - History & Team | Angara Parts</title>
        <meta
          key="description"
          name="description"
          content={`Angara 77 | ${data.SHOP_PHONE} Information about our
          company and history of establishment. We are open our dors in 2001 first time`}
        />
      </Head>
      <AnimationPage>
        <div>
          <h1>About Page</h1>;
        </div>
      </AnimationPage>
    </React.Fragment>
  );
}
