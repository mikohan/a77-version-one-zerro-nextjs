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
  ratings: IRating[];
  productId: number;
}

export default function SimpleRating({ ratings, productId }: IProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState<number | null>(0);
  const [quantityState, setQuantityState] = React.useState<number>(0);
  const userId = useSelector((state: IState) => state.shopNew.userId);
  const [userScore, setUserScore] = React.useState<number | null>(0);

  let findUserId = ratings.find((item: IRating) => item.autouser === userId);
  useEffect(() => {
    async function getRemRating() {
      const rating = await getRating(productId, userId);
      setUserScore(parseInt(rating.score));
    }
    getRemRating();
  });

  useEffect(() => {
    let initVal = 0;
    let initQ = 0;
    if (ratings && ratings.length) {
      initVal = ratings.reduce((acc: number, val: IRating) => {
        const avg = (acc + parseInt(val.score)) / ratings.length;
        return avg;
      }, 0);
      initQ = ratings.length;
    }
    const initRating = Math.ceil(initVal);
    let initFindUser = 0;
    if (findUserId) {
      initFindUser = parseInt(findUserId.score);
      setUserScore(initFindUser);
      setValue(initRating);
      setQuantityState(initQ);
    }
  }, []);

  useEffect(() => {
    async function setRating() {
      const rating = await createOrUpdateRatings(
        value as number,
        productId,
        userId
      );
      console.log(rating);
    }
    setRating();
  }, [value]);

  function handleRating(
    event: React.ChangeEvent<{} | null>,
    newValue: number | null
  ) {
    setValue(newValue);
    setUserScore(newValue);
    if (userId !== findUserId?.autouser) {
      setQuantityState(quantityState + 1);
    }
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
      <Typography className={classes.yourScore} variant="body2">
        Ваша оценка {userScore}
      </Typography>
    </div>
  );
}
