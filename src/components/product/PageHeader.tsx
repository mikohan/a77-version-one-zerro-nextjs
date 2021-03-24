import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import { ICategory } from '~/interfaces/category';
import { ICar } from '~/interfaces/ICar';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerOne: {
      fontSize: '3rem',
    },
  })
);

interface IProps {
  categories?: ICategory[];
  model: ICar;
  totalParts: number;
}

export default function PageHeader({ categories, model, totalParts }: IProps) {
  const classes = useStyles();
  const makeSlug: string = model.make.slug;
  const modelSlug: string = model.slug;

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center" m={4}>
        <Typography variant="h1" className={classes.headerOne}>
          Запчатсти на
          {model.make.name} {model.model}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
