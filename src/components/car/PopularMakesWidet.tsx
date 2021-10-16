import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { IMake } from '~/interfaces';
import { capitalize } from '~/utils';
import { imageServerUrl } from '~/config';
import Image from 'next/image';
import Link from 'next/link';
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
  makes: IMake[];
}

export default function LeftSidePopularWidget({ makes }: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <Paper>
      <Grid className={classes.container} container>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h6">
            Популярные Марки
          </Typography>
          {makes &&
            makes.map((make: IMake) => (
              <Link key={make.slug} href={url.make(make.slug)}>
                <a>
                  <Box className={classes.makeItem}>
                    <Image
                      src={
                        make && make.image
                          ? `${imageServerUrl}${make.image}`
                          : '/images/local/carsAvatar/generic.png'
                      }
                      width={75}
                      height={60}
                    />
                    <Typography className={classes.name} variant="body1">
                      {capitalize(make.name)}
                    </Typography>
                  </Box>
                </a>
              </Link>
            ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
