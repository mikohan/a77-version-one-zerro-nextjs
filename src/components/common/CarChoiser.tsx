import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createBox: {
      width: '100%',
      height: '5rem',
      background: '#fff',
    },
  })
);

export default function CarChoiser() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.createBox}>some content</div>
    </React.Fragment>
  );
}
