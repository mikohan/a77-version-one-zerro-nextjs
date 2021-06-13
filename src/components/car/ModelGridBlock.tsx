// This component used for main model also for not main models
import React from 'react';
import { ICar, IMake } from '~/interfaces';
import { IModCats } from '~/interfaces/ICar';
import { Box, Typography, Paper, Grid } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import url from '~/services/url';
import Image from 'next/image';
import { imageServerUrl } from '~/config';
import imgUrl from '~/services/img';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: `repeat(4, minmax(20%, 1fr))`,
      gridGap: theme.spacing(1),
    },
    containerSily: {
      display: 'grid',
      gridTemplateColumns: `repeat(4, minmax(20%, 1fr))`,
      gridGap: theme.spacing(1),
    },
    item: {
      padding: theme.spacing(1),
    },
    itemSily: {
      padding: theme.spacing(1),
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    nameMainBox: {
      paddingLeft: theme.spacing(1),
    },
    carBox: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
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
    },
    catItem: {
      color:
        theme.palette.type === 'light' ? theme.palette.primary.main : 'inherit',
    },
  })
);
interface ICarProps {
  models: ICar[];
  carCountCat: any;
  isMainCars: boolean;
}

export default function ModelBlockGrid(props: ICarProps) {
  const classes = useStyles();
  const { models, carCountCat, isMainCars } = props;
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

  const silyModels: any[] = [];
  const mainModels: ICar[] = [];

  for (let model of models) {
    const perekol = perekolbas.find(
      (per: any) => model.slug === per.model.slug
    );
    if (perekol) {
      if (parseInt(model.priority) > 2) {
        mainModels.push({
          ...model,
          categories: perekol.categories,
        });
      } else {
        silyModels.push({
          ...model,
          categories: perekol.categories,
        });
      }
    }
  }
  let retModels = !isMainCars ? silyModels : mainModels;

  if (isMainCars) {
    return (
      <React.Fragment>
        <Box className={classes.container}>
          {models &&
            retModels.map((model: ICar, i: number) => {
              return (
                <Paper key={`${i}-${model.slug}`}>
                  <Link href={url.model(make.slug, model.slug)}>
                    <a className={classes.item}>
                      <Box className={classes.carBox}>
                        <Image
                          src={
                            model && model.image
                              ? `${imgUrl(model.image as string)}`
                              : `/images/local/carsAvatar/generic.png`
                          }
                          width={100}
                          height={100}
                        />
                        <Box className={classes.nameMainBox}>
                          <Typography variant="body1">{model.model}</Typography>
                          <Typography variant="body2">
                            Запчастей ({model.count})
                          </Typography>
                        </Box>
                      </Box>
                    </a>
                  </Link>
                  <Box className={classes.categoryBox}>
                    {model.categories?.map((cat: IModCats, i: number) => {
                      return (
                        <Link
                          href={url.category(make.slug, model.slug, cat.slug)}
                          key={`${cat.slug}-${i}`}
                        >
                          <a>
                            <Typography
                              className={classes.catItem}
                              variant="body2"
                            >
                              {cat.name} ({cat.count})
                            </Typography>
                          </a>
                        </Link>
                      );
                    })}
                  </Box>
                </Paper>
              );
            })}
        </Box>
      </React.Fragment>
    );
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.containerSily}>
            {silyModels.map((model: ICar, i: number) => (
              <Link
                key={`${i}-${model.slug}`}
                href={url.model(make.slug, model.slug)}
              >
                <a>
                  <Paper className={classes.itemSily}>
                    <Image
                      src={
                        model && model.image
                          ? `${imgUrl(model.image as string)}`
                          : `/images/local/carsAvatar/generic.png`
                      }
                      width={100}
                      height={100}
                    />
                    <Box>
                      <Typography variant="body1">{model.model}</Typography>
                      <Typography variant="body2">
                        Запчастей ({model.count})
                      </Typography>
                    </Box>
                  </Paper>
                </a>
              </Link>
            ))}
          </Box>
        </Grid>
      </Grid>
    );
  }
}
