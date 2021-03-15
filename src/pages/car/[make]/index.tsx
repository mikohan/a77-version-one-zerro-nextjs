import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import axios from 'axios';
import { getModelsByMakeUrl, REVALIDATE, vehiclesUrl } from '~/config';
import { List, ListItem } from '@material-ui/core';
import Link from 'next/link';
import MainLayout from '~/layouts/Main';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { motion } from 'framer-motion';
import { durationPage } from '~/config';

import { ICar } from '~/interfaces/ICar';
import { getVehicles, getVehicleByModel } from '~/endpoints/carsEndpoint';
import { toLoverSpace } from '~/helpers';

interface ICarProps {
  models: ICar[];
  make: string;
}

function Make(props: ICarProps) {
  let { make, models } = props;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: durationPage }}
    >
      <MainLayout>
        <h1>Car Single Make and Models List</h1>
        <List>
          {models.map((model: ICar) => (
            <Link
              href={`/car/${toLoverSpace(make)}/${model.slug}`}
              key={model.id}
            >
              <a>
                <ListItem>
                  <Box>
                    <p>Slug - {model.slug}</p>
                    <Typography variant="h1">{model.model}</Typography>
                    <Typography variant="h3">{model.engine}</Typography>
                    <div>some text</div>
                  </Box>
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
      </MainLayout>
    </motion.div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const make = toLoverSpace(context.params?.make as string);

  const models = await getVehicleByModel(make);

  return {
    revalidate: REVALIDATE,
    props: {
      models: models,
      make: make,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const vehicles = await getVehicles();
  let makes: string[] = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (!makes.includes(vehicles[i].make)) {
      makes.push(vehicles[i].make);
    }
  }
  const paths = makes.map((make: any) => {
    return { params: { make: toLoverSpace(make) } };
  });

  return {
    fallback: false,
    paths: paths,
  };
};

export default Make;
