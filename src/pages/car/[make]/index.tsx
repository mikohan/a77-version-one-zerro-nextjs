import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import axios from 'axios';
import { vehiclesUrl } from '~/config';
import { List, ListItem } from '@material-ui/core';
import Link from 'next/link';

interface ICarProps {
  models: string[];
  make: string;
}

function Make(props: ICarProps) {
  //const { make, models } = props;
  const models: any = [];
  const make = 'hununda';
  return (
    <div>
      <h1>Car Single Make and Models List</h1>
      <List>
        {models.map((model: string) => (
          <Link href={`/car/${make}/${model}`} key={model}>
            <ListItem>{model}</ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  /* const promise = await axios.get(vehiclesUrl); */
  /* const vehicles = await promise.data; */
  /* console.log(vehicles); */
  /* let models: string[] = []; */
  /* for (let i = 0; i < vehicles.length; i++) { */
  /*   if (!models.includes(vehicles[i].model)) { */
  /*     models.push(vehicles[i].model); */
  /*   } */
  /* } */
  /* console.log(context.params?.make); */

  return {
    props: {
      models: ['shome'],
      make: 'hyundai',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: [{ params: { make: 'hyundai', model: 'porter' } }],
  };
};

export default Make;
