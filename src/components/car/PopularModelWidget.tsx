import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { ICar } from '~/interfaces';
import { capitalize } from '~/utils';
import { imageServerUrl } from '~/config';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    title: {
      paddingLeft: theme.spacing(2),
    },
    makeItem: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        background: theme.palette.action.hover,
      },
    },
    name: {
      fontWeight: 500,
      paddingLeft: theme.spacing(2),
    },
  })
);

interface IProps {
  models: ICar[];
}

export default function LeftSidePopularWidget({ models }: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container>
      <Grid item xs={12}>
        {models &&
          models.map((model: ICar) => (
            <Link
              key={model.slug}
              href={url.model(model.make.slug, model.slug)}
            >
              <a>
                <Box className={classes.makeItem}>
                  <Image
                    src={
                      model && model.image
                        ? `${imageServerUrl}${model.image}`
                        : '/images/local/carsAvatar/generic.png'
                    }
                    width={75}
                    height={60}
                  />
                  <Typography className={classes.name} variant="body1">
                    {capitalize(model.model)}
                  </Typography>
                </Box>
              </a>
            </Link>
          ))}
      </Grid>
    </Grid>
  );
}
