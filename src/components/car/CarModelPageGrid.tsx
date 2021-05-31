import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core';

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

export default function ModelShopList() {
  const classes = useStyles();

  const items = [...Array(8).keys()];

  return (
    <React.Fragment>
      <Box className={classes.itemsGrid}>
        {items.map((item: any) => {
          return (
            <Paper key={item} className={classes.itemPaper}>
              Lorem ipsum dolor sit amet consectetur.
            </Paper>
          );
        })}
      </Box>
    </React.Fragment>
  );
}
