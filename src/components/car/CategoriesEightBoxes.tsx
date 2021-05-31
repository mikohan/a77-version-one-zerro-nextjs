import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import { capitalize } from '~/utils';
import url from '~/services/url';
import Link from 'next/link';
import { ICar } from '~/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemsGrid: {
      display: 'grid',
      gridTemplateColumns: `repeat(4, minmax(20%, 1fr))`,
      gridGap: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    itemPaper: { padding: theme.spacing(2) },
    itemHeader: {
      fontWeight: 700,
    },
    itemBody: {
      paddingBottom: theme.spacing(0.5),
    },
  })
);
interface IProps {
  items: any[];
  car: ICar;
}

export default function CarModelGrid({ items, car }: IProps) {
  const classes = useStyles();
  const catZapEight = items[0].children
    .filter((cat: any) => cat.children.length > 3)
    .slice(0, 8);

  return (
    <React.Fragment>
      <Box className={classes.itemsGrid}>
        {catZapEight.map((item: any) => {
          return (
            <Paper key={item} className={classes.itemPaper}>
              <Typography className={classes.itemHeader} variant="subtitle1">
                {item.name}
              </Typography>
              {item.children.slice(0, 5).map((subItem: any) => {
                return (
                  <Link
                    key={subItem.slug}
                    href={url.category(car.make.slug, car.slug, subItem.slug)}
                  >
                    <a>
                      <Typography
                        className={classes.itemBody}
                        variant="body2"
                        color="primary"
                      >
                        {capitalize(subItem.name)}
                      </Typography>
                    </a>
                  </Link>
                );
              })}
            </Paper>
          );
        })}
      </Box>
    </React.Fragment>
  );
}
