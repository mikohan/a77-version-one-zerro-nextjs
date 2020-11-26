import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { vehiclesUrl } from '~/config';
import { List, ListItem } from '@material-ui/core';
import Link from 'next/link';
import MainLayout from '~/layouts/Main';

interface ICarProps {
  makes: string[];
}

function Car(props: ICarProps) {
  return (
    <div>
      <MainLayout>
        <h1>inside all cars list here</h1>
        <List>
          {props.makes.map((make: string) => (
            <Link href={`/car/${make}`} key={make}>
              <a>
                <ListItem>{make}</ListItem>
              </a>
            </Link>
          ))}
        </List>
      </MainLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const promise = await axios.get(vehiclesUrl);
  const vehicles = await promise.data;
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
