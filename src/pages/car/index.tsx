import React from 'react';
import { GetServerSideProps } from 'next';
import { List, ListItem } from '@material-ui/core';
import Link from 'next/link';

import Animation from '~/components/common/AnimationPage';
import { getVehicles } from '~/endpoints/carsEndpoint';
import { IMake } from '~/interfaces/IMake';
import { getMakes } from '~/endpoints/carsEndpoint';

interface ICarProps {
  makes: IMake[];
}

function Car(props: ICarProps) {
  return (
    <Animation>
      <List>
        {props.makes.map((make: IMake) => (
          <Link href={`/car/${make.slug}`} key={make.id}>
            <a>
              <ListItem>{make.name}</ListItem>
            </a>
          </Link>
        ))}
      </List>
    </Animation>
  );
}

export const getStaticProps: GetServerSideProps = async () => {
  const makes: IMake[] = await getMakes();

  return {
    props: {
      makes: makes,
    },
  };
};

export default Car;
