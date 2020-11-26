import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import axios from 'axios';
import { vehiclesUrl } from '~/config';
import { List, ListItem } from '@material-ui/core';
import Link from 'next/link';
import MainLayout from '~/layouts/Main';

interface ICarProps {
  models: string[];
  make: string;
}

function Make(props: ICarProps) {
  const { make, models } = props;

  return (
    <div>
      <MainLayout>
        <h1>Car Single Make and Models List</h1>
        <List>
          {models.map((model: string) => (
            <Link href={`/car/${make}/${model}`} key={model}>
              <a>
                <ListItem>{model}</ListItem>
              </a>
            </Link>
          ))}
        </List>
      </MainLayout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const promise = await axios.get(vehiclesUrl);
  const vehicles = await promise.data;
  const make = context.params?.make;
  let models: string[] = [];
  const modd = vehicles.filter((vehicle: any) => {
    return vehicle.make === make;
  });

  for (let i = 0; i < modd.length; i++) {
    if (!models.includes(modd[i].model)) {
      models.push(modd[i].model);
    }
  }

  return {
    props: {
      models: models,
      make: make,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [{ params: { make: 'hyundai', model: 'porter' } }],
  };
};

export default Make;
