import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { vehiclesUrl } from '~/config';
import { List, ListItem } from '@material-ui/core';
import Link from 'next/link';
import MainLayout from '~/layouts/Main';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { getMakes } from '~/store/actions/categoriesAction';
import { changeCarModel } from '~/store/actions/categoriesAction';
import { asString } from '~/helpers';

interface ICarProps {
  makes: string[];
}

function Car(props: ICarProps) {
  const router = useRouter();
  const carModel = asString(router.query.model || 'all');
  const carMake = router.query.make || '';
  let carHref = '/';
  if (carModel) {
    carHref = `/car/${carMake}/${carModel}`;
  }
  const dispatch = useDispatch();
  const storeCarModel = useSelector((state: any) => {
    return state.currentCar.carModel;
  });
  console.log('Store car model', storeCarModel);

  useEffect(() => {
    dispatch(changeCarModel(carModel));
    dispatch(getMakes());
  }, []);

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

export const getStaticProps: GetServerSideProps = async () => {
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
