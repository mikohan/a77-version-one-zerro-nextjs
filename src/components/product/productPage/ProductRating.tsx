import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

import { IState } from '~/interfaces/IState';
import { scoreTransformer } from '~/utils';
import { createOrUpdateRatings, getRating } from '~/endpoints/carsEndpoint';

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
  rating?: number | null;
  productId: number;
  ratingCount?: number;
}

export default function SimpleRating({
  rating,
  productId,
  ratingCount,
}: IProps) {
  const classes = useStyles();
  //const initVal = rating ? rating : 0;
  const initQ = ratingCount ? ratingCount : 0;
  const [value, setValue] = React.useState<number | null>(5);
  const [quantityState, setQuantityState] = React.useState<number>(
    initQ as any
  );
  const userId = useSelector((state: IState) => state.shopNew.userId);
  const [userScore, setUserScore] = React.useState<number | null>(0);
  const router = useRouter();

  /* useEffect(() => { */
  /*   async function getUserRatingAsync() { */
  /*     if (productId) { */
  /*       const { rating, ratingCount } = await getProductRating(productId); */
  /*       setValue(rating!); */
  /*       setQuantityState(ratingCount!); */
  /*       setUserScore(0); */
  /*     } */
  /*   } */
  /*   getUserRatingAsync(); */
  /* }, [productId]); */

  /* // Here we trying to get rating by id and set it to state */
  /* useEffect(() => { */
  /*   async function getUserRating(productId: number, userId: string) { */
  /*     const userRating = await getRating(productId, userId); */
  /*     if (userRating) { */
  /*       setUserScore(parseInt(userRating.score)); */
  /*     } */
  /*   } */
  /*   if (userId) { */
  /*     getUserRating(productId, userId); */
  /*   } */
  /* }, [productId, value]); */

  /* // Here we are setting user score to database */
  /* useEffect(() => { */
  /*   async function setServerRating() { */
  /*     let myVal = value; */
  /*     if (value) { */
  /*       const newRating = await createOrUpdateRatings( */
  /*         myVal as number, */
  /*         productId, */
  /*         userId */
  /*       ); */
  /*     } */
  /*   } */
  /*   setServerRating(); */
  /* }, [value]); */
  useEffect(() => {
    async function getUserRating() {
      const userRating = await getRating(productId, userId);
      if (userRating) {
        setUserScore(parseInt(userRating.score));
      } else {
        setUserScore(null);
      }
    }
    try {
      getUserRating();
    } catch (e) {
      console.log(e, 'In trying to get user rating');
    }
  }, [userId, router, productId]);

  function handleRating(
    event: React.ChangeEvent<{} | null>,
    newValue: number | null
  ) {
    setValue(newValue);
    setUserScore(newValue);
    async function setServerRating() {
      if (newValue) {
        const newRating = await createOrUpdateRatings(
          Math.ceil(newValue),
          productId,
          userId
        );
      }
    }
    setServerRating();
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
      {rating && (
        <Typography className={classes.quantity} variant="body2">
          {rating} / 5
        </Typography>
      )}
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
        <Typography className={classes.yourScore} variant="body2">
          Оцените Продукт
        </Typography>
      )}
    </div>
  );
}
