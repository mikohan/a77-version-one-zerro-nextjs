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
      gridGap: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    itemPaper: { padding: theme.spacing(2) },
    itemHeader: {
      fontWeight: 700,
    },
    itemBody: {
      paddingBottom: theme.spacing(0.5),
      color:
        theme.palette.type === 'light' ? theme.palette.primary.main : 'inherit',
    },
  })
);
interface IProps {
  items: any[];
  car: ICar;
  parts: boolean;
}

function flatten(items: any): any {
  let flat: any = [];
  items.forEach((item: any) => {
    if (item.children.length) {
      flat.push(...flatten(item.children));
      flat.push();
    } else {
      flat.push(item);
    }
  });
  return flat;
}

export default function CarModelGrid({ items, car, parts }: IProps) {
  const classes = useStyles();
  let catZapEight: any = [];
  if (parts) {
    catZapEight = items[0].children
      .filter((cat: any) => cat.children.length > 3)
      .slice(0, 8);
  } else {
    catZapEight = items.slice(1).map((item: any) => {
      const cats = flatten(item.children);
      return {
        name: item.name,
        slug: item.slug,
        children: cats,
      };
    });
  }

  return (
    <React.Fragment>
      <Box className={classes.itemsGrid}>
        {catZapEight.map((item: any) => {
          return (
            <Paper key={item.slug} className={classes.itemPaper}>
              <Typography className={classes.itemHeader} variant="subtitle1">
                {item.name}
              </Typography>
              {item.children &&
                item.children.slice(0, 5).map((subItem: any) => {
                  return (
                    <Link
                      key={subItem.slug}
                      href={url.category(car.make.slug, car.slug, subItem.slug)}
                    >
                      <a>
                        <Typography
                          className={classes.itemBody}
                          variant="body2"
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
