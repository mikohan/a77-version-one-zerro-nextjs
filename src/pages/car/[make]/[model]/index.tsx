import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import axios from 'axios';
import { vehiclesUrl } from '~/config';
import { List, ListItem } from '@material-ui/core';
import Link from 'next/link';

export interface ICar {
  id: number;
  year: number[];
  make: string;
  model: string;
  engine: string;
}

interface ICarProps {
  models:{id:};
  make: string;
}

function Model(props: ICarProps) {
  const { model } = props;
  return (
    <div>
      <h1>inside all cars list here</h1>
      {model}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const promise = await axios.get(vehiclesUrl);
  const vehicles = await promise.data;
  let models: string[] = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (!models.includes(vehicles[i].model)) {
      models.push(vehicles[i].model);
    }
  }
  console.log(context.params?.make);

  return {
    props: {
      models: models,
      make: 'hyundai',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: [{ params: { make: 'Hyundai', model: 'Porter 1' } }],
  };
};

export default Model;
