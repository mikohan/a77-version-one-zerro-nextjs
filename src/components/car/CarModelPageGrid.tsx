import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemsGrid: {
      display: 'grid',
      gridTemplateColumns: `repeat(4, minmax(20%, 1fr))`,
      gridGap: theme.spacing(1),
      marginBottom: theme.spacing(2),

      '&>*': {
        border: '1px solid blue',
      },
    },
    itemPaper: { padding: theme.spacing(1) },
  })
);
interface IProps {
  items: any[];
}

export default function CarModelGrid({ items }: IProps) {
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
              <Typography variant="subtitle1">{item.name}</Typography>
              {item.children.slice(0, 8).map((subItem: any) => {
                return (
                  <Typography variant="subtitle2">{subItem.name}</Typography>
                );
              })}
            </Paper>
          );
        })}
      </Box>
    </React.Fragment>
  );
}
