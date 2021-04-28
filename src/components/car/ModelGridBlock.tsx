import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { containerMaxWidth, REVALIDATE } from '~/config';
import { Grid, Hidden, Typography } from '@material-ui/core';
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
import { Container, Paper } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    blockPaper: {
      padding: theme.spacing(2),
    },
    blockGrid: {
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
);
interface ICarProps {
  models: ICar[];
}

export default function ModelBlockGrid(props: ICarProps) {
  const classes = useStyles();
  const { models } = props;

  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: 'Name', path: `/car/${models[0].make.slug}` },
  ];

  return (
    <React.Fragment>
      <Box>
        {models &&
          models.map((model: ICar) => (
            <React.Fragment>
              <Typography variant="h6">{model.model}</Typography>
            </React.Fragment>
          ))}
      </Box>
    </React.Fragment>
  );
}
