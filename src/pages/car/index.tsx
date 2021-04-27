import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import ShopCarGrid from '~/components/product/ShopMakeGrid';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import {
  Container,
  List,
  ListItem,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';

import { getVehicles } from '~/endpoints/carsEndpoint';
import { IMake } from '~/interfaces/IMake';
import { getMakes } from '~/endpoints/carsEndpoint';
import { containerMaxWidth } from '~/config';
import CarHead from '~/components/heads/CarHead';
import PopularMakes from '~/components/car/PopularMakesWidet';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftPanel: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
);

interface ICarProps {
  makes: IMake[];
  popularMakes: IMake[];
}

function Car(props: ICarProps) {
  const classes = useStyles();
  const { makes, popularMakes } = props;

  return (
    <React.Fragment>
      <CarHead />
      <AnimationPage>
        <Container maxWidth={containerMaxWidth}>
          <Grid container>
            <Grid xs={12}>
              <Typography variant="h1">
                Интернет магазин запчастей ANGARA PARTS
              </Typography>
            </Grid>
            <Hidden smDown>
              <Grid className={classes.leftPanel} item xs={3}>
                <PopularMakes makes={popularMakes} />
              </Grid>
            </Hidden>
            <Grid style={{ border: '1px solid green' }} item xs={12} md={9}>
              <Typography variant="h1">H1 Goes Here</Typography>
              <ShopCarGrid cars={makes} />
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getStaticProps: GetServerSideProps = async () => {
  const makes: IMake[] = await getMakes();
  const sortedMakes = makes
    .slice()
    .sort((a: IMake, b: IMake) => +b.priority - +a.priority);
  const popularMakes = makes.filter((make: IMake) => {
    if (make && make.priority) {
      const priority =
        typeof make.priority === 'string'
          ? parseInt(make.priority)
          : make.priority;
      return priority > 3;
    }
    return false;
  });

  return {
    props: {
      makes: sortedMakes,
      popularMakes,
    },
  };
};

export default Car;
