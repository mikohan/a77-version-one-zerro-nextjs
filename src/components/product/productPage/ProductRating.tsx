import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    rating: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
    quantity: {
      paddingLeft: theme.spacing(2),
    },
  })
);

interface IProps {
  rating?: number;
  quantity?: number;
}

export default function SimpleRating({ rating, quantity }: IProps) {
  const classes = useStyles();
  let initVal = 0;
  let initQ = 0;
  if (rating) {
    initVal = rating;
    if (quantity) {
      initQ = quantity;
    }
  }
  const [value, setValue] = React.useState<number | null>(initVal);
  const [quantityState, setQuantityState] = React.useState<number>(initQ);

  return (
    <div className={classes.root}>
      <Rating
        className={classes.rating}
        size="small"
        name="simple-controlled"
        value={value}
        onChange={(
          event: React.ChangeEvent<{} | null>,
          newValue: number | null
        ) => {
          setValue(newValue);
          setQuantityState(quantityState + 1);
        }}
      />
      <Typography className={classes.quantity} variant="body2">
        {quantityState} оценок
      </Typography>
    </div>
  );
}
