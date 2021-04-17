import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';

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
      color: theme.palette.text.secondary,
    },
    yourScore: {
      paddingLeft: theme.spacing(2),
      color: theme.palette.text.secondary,
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
  const [clicked, setClicked] = React.useState<boolean>(false);

  return (
    <div className={classes.root}>
      <Rating
        className={classes.rating}
        size="small"
        name="simple-controlled"
        value={value}
        readOnly={clicked}
        onChange={(
          event: React.ChangeEvent<{} | null>,
          newValue: number | null
        ) => {
          setValue(newValue);
          setQuantityState(quantityState + 1);
          setClicked(true);
        }}
      />
      {quantity && (
        <Typography className={classes.quantity} variant="body2">
          {quantityState} оценок
        </Typography>
      )}
      {clicked && (
        <Typography className={classes.yourScore} variant="body2">
          Ваша оценка {value}
        </Typography>
      )}
    </div>
  );
}
