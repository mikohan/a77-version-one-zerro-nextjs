import React, { ReactNode } from 'react';
import { Paper, Grid, Typography, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { IMake, IProduct } from '~/interfaces';
import { capitalize } from '~/utils';
import { imageServerUrl } from '~/config';
import Image from 'next/image';
import Link from 'next/link';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
    },
    makeItem: {
      borderTop: '1px solid red',
      display: 'flex',
      alignItems: 'center',
    },
    name: {
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
          <Typography variant="h6">Популярные Марки</Typography>
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
