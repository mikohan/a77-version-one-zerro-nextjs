import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { DIVIER_HEIGTH } from '~/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: '100%',
      height: DIVIER_HEIGTH,
    },
  })
);

export default function Divider() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.container}></div>
    </React.Fragment>
  );
}
