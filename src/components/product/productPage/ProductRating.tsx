import React, { useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { IRating } from '~/interfaces';
import { scoreTransformer } from '~/utils';
import { createOrUpdateRatings, getRating } from '~/endpoints/carsEndpoint';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

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
  productId: number;
  ratingCount?: number;
}

export default function SimpleRating({
  rating,
  productId,
  ratingCount,
}: IProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState<number | null>(0);
  const [quantityState, setQuantityState] = React.useState<number>(0);
  const userId = useSelector((state: IState) => state.shopNew.userId);
  const [userScore, setUserScore] = React.useState<number | null>(0);

  // Here we are setting up initial rating of product and total scores
  useEffect(() => {
    if (rating) {
      if (ratingCount) {
        setQuantityState(ratingCount);
      }
      setValue(rating);
    }
  }, []);

  // Here we trying to get rating by id and set it to state
  useEffect(() => {
    async function getUserRating(productId: number, userId: string) {
      const userRating = await getRating(productId, userId);
      setUserScore(parseInt(userRating.score));
      console.log(rating);
    }
    if (userId) {
      getUserRating(productId, userId);
    }
  }, [userId]);

  // Here we are setting user score to database
  useEffect(() => {
    async function setServerRating() {
      const newRating = await createOrUpdateRatings(
        value as number,
        productId,
        userId
      );
    }
    setServerRating();
  }, [value]);

  function handleRating(
    event: React.ChangeEvent<{} | null>,
    newValue: number | null
  ) {
    setValue(newValue);
    setUserScore(newValue);
  }

  return (
    <div className={classes.root}>
      <Rating
        className={classes.rating}
        size="small"
        name="simple-controlled"
        value={value}
        onChange={handleRating}
      />
      {quantityState ? (
        <Typography className={classes.quantity} variant="body2">
          {quantityState} {scoreTransformer(quantityState)}
        </Typography>
      ) : (
        ''
      )}
      {userScore ? (
        <Typography className={classes.yourScore} variant="body2">
          Ваша оценка {userScore}
        </Typography>
      ) : (
        ' test string'
      )}
    </div>
  );
}
