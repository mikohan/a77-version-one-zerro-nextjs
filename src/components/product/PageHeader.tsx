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
      <Box>
        <Typography variant="h6" align="center">
          Total parts: {totalParts}
        </Typography>
      </Box>
      <Box m={4}>
        {categories?.map((cat: ICategory) => {
          return (
            <span key={cat.id}>
              <Typography variant="h5">
                First Level - {cat.name} ({cat.count})
              </Typography>
              {cat.children?.map((subcat: ICategory) => {
                return (
                  <div key={subcat.id} style={{ paddingLeft: '2rem' }}>
                    <Typography variant="body1">
                      <Link
                        href={url.category(makeSlug, modelSlug, subcat.slug)}
                      >
                        <a>
                          {subcat.name} ({subcat.count})
                        </a>
                      </Link>
                    </Typography>
                  </div>
                );
              })}
            </span>
          );
        })}
      </Box>
    </React.Fragment>
  );
}
