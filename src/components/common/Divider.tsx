import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: '100%',
      height: '5rem',
      border: '1px solid red',
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
