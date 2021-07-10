import React from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

function Make() {
  return <React.Fragment></React.Fragment>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Make;
