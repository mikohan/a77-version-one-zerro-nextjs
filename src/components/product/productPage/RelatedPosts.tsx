import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { IPost } from '~/interfaces';
import Link from 'next/link';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      /* maxWidth: '30vw', */
    },
  })
);

interface IProps {
  posts: IPost[];
}

export default function DenseTable({ posts }: IProps) {
  const classes = useStyles();

  return <Box>{posts && <Box className={classes.container}>lslsl</Box>}</Box>;
}
