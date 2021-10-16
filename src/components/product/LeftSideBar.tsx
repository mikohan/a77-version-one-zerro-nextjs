import React, { ReactNode } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    whiteBox: {
      padding: theme.spacing(2),
      width: '100%',
      background: theme.palette.background.paper,
    },
    children: {},
  })
);

interface IProps {
  children?: ReactNode;
}

export default function FiltersWidget({ children }: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container>
      <Box className={classes.whiteBox}>
        <Grid item xs={12}>
          <Box className={classes.children}>{children}</Box>
        </Grid>
      </Box>
    </Grid>
  );
}
