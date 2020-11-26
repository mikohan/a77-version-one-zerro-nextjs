import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import axios from 'axios';
import { getModelsByMakeUrl, vehiclesUrl } from '~/config';
import { List, ListItem } from '@material-ui/core';
import Link from 'next/link';
import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { ICar } from '~/interfaces/ICar';

interface ICarProps {
  models: ICar[];
  make: string;
}

function Make(props: ICarProps) {
  let { make, models } = props;

  return (
    <div>
      <MainLayout>
        <h1>Car Single Make and Models List</h1>
        <List>
          {models.map((model: ICar) => (
            <Link href={`/car/${make}/${model.slug}`} key={model.id}>
              <ListItem>
                <Box>
                  <a>
                    <Typography variant="h1">{model.model}</Typography>
                    <Typography variant="h3">{model.engine}</Typography>
                  </a>
                </Box>
              </ListItem>
            </Link>
          ))}
        </List>
      </MainLayout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const make = context.params?.make;
  const encoded = encodeURI(`${getModelsByMakeUrl}${make}/`);

  const promise = await axios.get(encoded);
  const models = promise.data;

  return {
    props: {
      models: models,
      make: make,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prom = await axios.get(vehiclesUrl);
  const vehicles = await prom.data;
  let makes: string[] = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (!makes.includes(vehicles[i].make)) {
      makes.push(vehicles[i].make);
    }
  }
  const paths = makes.map((make: any) => {
    return { params: { make: make } };
  });

  return {
    fallback: false,
    paths: paths,
  };
};

export default Make;
