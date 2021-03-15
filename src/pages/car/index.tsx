import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { vehiclesUrl } from '~/config';
import { List, ListItem } from '@material-ui/core';
import Link from 'next/link';
import { toLoverSpace } from '~/helpers';
import MainLayout from '~/layouts/Main';

import { motion } from 'framer-motion';
import { durationPage } from '~/config';
import { getVehicles } from '~/endpoints/carsEndpoint';

interface ICarProps {
  makes: string[];
}

function Car(props: ICarProps) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: durationPage }}
    >
      <MainLayout>
        <h1>inside all cars list here</h1>
        <List>
          {props.makes.map((make: string) => (
            <Link href={`/car/${toLoverSpace(make)}`} key={make}>
              <a>
                <ListItem>{make}</ListItem>
              </a>
            </Link>
          ))}
        </List>
      </MainLayout>
    </motion.div>
  );
}

export const getStaticProps: GetServerSideProps = async () => {
  const vehicles = await getVehicles();
  let makes: string[] = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (!makes.includes(vehicles[i].make)) {
      makes.push(vehicles[i].make);
    }
  }

  return {
    props: {
      makes: makes,
    },
  };
};

export default Car;
