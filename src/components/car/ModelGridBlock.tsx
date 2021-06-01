import React from 'react';
import { ICar, IMake } from '~/interfaces';
import { IModCats } from '~/interfaces/ICar';
import { Box, Typography, Paper } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import url from '~/services/url';
import Image from 'next/image';
import { imageServerUrl } from '~/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: `repeat(4, minmax(20%, 1fr))`,
      gridGap: theme.spacing(1),
    },
    item: {
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-around',
    },
    carBox: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    model: {
      paddingLeft: theme.spacing(1),
    },
    countBox: {
      marginLeft: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    categoryBox: {
      borderTop: '1px solid',
      borderTopColor: theme.palette.action.selected,
      padding: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      '&>*': {
        padding: theme.spacing(0.5),
      },
    },
    catItem: {
      fontWeight: 500,
    },
  })
);
interface ICarProps {
  models: ICar[];
  carCountCat: any;
}

export default function ModelBlockGrid(props: ICarProps) {
  const classes = useStyles();
  const { models, carCountCat } = props;
  const make: IMake = models[0].make;
  let cars: any = [];
  if (carCountCat) {
    cars = carCountCat.aggregations.cars.buckets;
  }
  const perekolbas = cars.map((item: any) => {
    return {
      model: {
        slug: item.key,
      },
      categories: item.cats.buckets.map((i: any) => {
        return {
          name: i.key,
          slug: i.cats.buckets[0].key,
          count: i.doc_count,
        };
      }),
    };
  });

  const newModels: any[] = [];

  for (let model of models) {
    const perekol = perekolbas.find(
      (per: any) => model.slug === per.model.slug
    );
    if (perekol) {
      newModels.push({
        ...model,
        categories: perekol.categories,
      });
    }
  }

  return (
    <React.Fragment>
      <Box className={classes.container}>
        {models &&
          newModels.map((model: ICar) => {
            return (
              <Paper key={model.slug}>
                <Link href={url.model(make.slug, model.slug)}>
                  <a className={classes.item}>
                    <Box className={classes.carBox}>
                      <Image
                        src={
                          model && model.image
                            ? `${imageServerUrl}${model.image}`
                            : `/images/local/carsAvatar/generic.png`
                        }
                        width={50}
                        height={50}
                      />
                      <Typography className={classes.model} variant="body1">
                        {model.model}
                      </Typography>
                    </Box>
                    <Box className={classes.countBox}>
                      <Typography variant="body2">
                        Запчастей ({model.count})
                      </Typography>
                    </Box>
                  </a>
                </Link>
                <Box className={classes.categoryBox}>
                  {model.categories?.map((cat: IModCats) => {
                    return (
                      <Typography
                        className={classes.catItem}
                        variant="subtitle2"
                      >
                        {cat.name} ({cat.count})
                      </Typography>
                    );
                  })}
                </Box>
              </Paper>
            );
          })}
      </Box>
    </React.Fragment>
  );
}
