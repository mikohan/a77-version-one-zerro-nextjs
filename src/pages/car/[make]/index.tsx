import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { REVALIDATE } from '~/config';
import { Grid, Hidden } from '@material-ui/core';
import AnimationPage from '~/components/common/AnimationPage';
import CarMakeHead from '~/components/heads/carMakeHead';
import PageHeader from '~/components/product/PageHeader';

import { ICar } from '~/interfaces/ICar';
import { IMake } from '~/interfaces/IMake';
import { getVehiclesByMake, getMake, getMakes } from '~/endpoints/carsEndpoint';
import ShopGrid from '~/components/product/ShopGrid';
import { IBread } from '~/interfaces/IBread';
import { capitalize } from '~/utils';
import { getProductsByMake } from '~/endpoints/productEndpoint';
import { IProductElasticHitsFirst } from '~/interfaces';
import LeftSidebar from '~/components/product/LeftSideBar';
import ModelList from '~/components/product/ModelsList';

interface ICarProps {
  models: ICar[];
  make: IMake;
  products: IProductElasticHitsFirst;
}

function Make(props: ICarProps) {
  const { make, models, products } = props;
  const count = products.total.value;

  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: make.name, path: `/car/${make.slug}` },
  ];
  const makeName = capitalize(make.name);
  const header = `Запчасти для ${makeName}`;

  return (
    <React.Fragment>
      <CarMakeHead make={make} />
      <AnimationPage>
        <Grid container>
          <PageHeader header={header} breads={breads} count={count} />
          <Hidden smDown>
            <Grid item xs={3} style={{ border: '1px solid pink' }}>
              <LeftSidebar>
                <ModelList models={models} />
              </LeftSidebar>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={9}>
            <Grid item xs={12}>
              {<ShopGrid products={products} />}
            </Grid>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug: string = context.params?.make as string;
  const make: IMake = await getMake(slug);

  const models = await getVehiclesByMake(make.slug.toLowerCase());
  const promise = await getProductsByMake(slug);
  const products: IProductElasticHitsFirst = promise.hits;

  return {
    revalidate: REVALIDATE,
    props: {
      models: models,
      make: make,
      products: products,
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
