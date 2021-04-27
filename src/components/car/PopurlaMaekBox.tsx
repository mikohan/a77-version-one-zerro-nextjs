import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { IMake } from '~/interfaces';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface IProps {
  make: IMake;
}

export default function MediaCard({ make }: IProps) {
  const classes = useStyles();

  return <Grid container></Grid>;
}
