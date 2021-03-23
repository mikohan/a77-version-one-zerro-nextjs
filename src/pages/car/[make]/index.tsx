import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { REVALIDATE } from '~/config';
import { List, ListItem } from '@material-ui/core';
import Link from 'next/link';
import ShopCarGrid from '~/components/product/ShopMakeGrid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Animation from '~/components/common/AnimationPage';

import { ICar } from '~/interfaces/ICar';
import { IMake } from '~/interfaces/IMake';
import { getVehicleByModel, getMake, getMakes } from '~/endpoints/carsEndpoint';

interface ICarProps {
  models: ICar[];
  make: IMake;
}

function Make(props: ICarProps) {
  let { make, models } = props;

  return (
    <Animation>
      <div>
        <ShopCarGrid cars={models} />
      </div>
    </Animation>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug: string = context.params?.make as string;
  const make: IMake = await getMake(slug);

  const models = await getVehicleByModel(make.slug);

  return {
    revalidate: REVALIDATE,
    props: {
      models: models,
      make: make,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const makes: IMake[] = await getMakes();
  const paths = makes.map((make: any) => {
    return { params: { make: make.slug } };
  });

  return {
    fallback: false,
    paths: paths,
  };
};

export default Make;
