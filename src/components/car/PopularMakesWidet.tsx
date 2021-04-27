import React, { ReactNode } from 'react';
import { Paper, Grid, Typography, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { IMake, IProduct } from '~/interfaces';
import { capitalize } from '~/utils';
import { imageServerUrl } from '~/config';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
    },
    makeContainer: {
      display: 'flex',
      alignItems: 'center',
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
              <Box key={make.slug} className={classes.makeContainer}>
                <Image
                  src={
                    make && make.image
                      ? `${imageServerUrl}${make.image}`
                      : '/images/local/carsAvatar/generic.png'
                  }
                  width={75}
                  height={60}
                />
                <Box>{capitalize(make.name)}</Box>
              </Box>
            ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
