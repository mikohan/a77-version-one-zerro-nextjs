import React from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

function Make() {
  return <React.Fragment></React.Fragment>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let str = context.params;
  let params: string[] = [];
  if (str) {
    params = str.all[0].split('-');
  }
  console.log(params);
  if (params[0] === 'subcat') {
    return {
      redirect: {
        permanent: true,
        destination: '/cars/hyundai/porter2/svechi-nakalivanija',
      },
    };
  }

  return {
    props: {},
  };
};

export default Make;
