import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  IProductElasticHitsSecond,
  IProductElasticHitsFirst,
} from '~/interfaces/product';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Typography } from '@material-ui/core';
import { IMake } from '~/interfaces/IMake';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cards: {
      margin: '0 auto',
      padding: theme.spacing(2),
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(125px, 1fr))`,
      gridAutoRows: `minmax(200px, auto)`,
      gridGap: theme.spacing(2), // padding for cards in the content area
      marginBottom: theme.spacing(5),
    },
    card: {
      boxShadow: '1px 1px 7px 1px rgba(0, 0, 0, 0.1)',
      borderRadius: '2px',
      background: 'white',
      transition: '0.5s',
      '&:hover $shoppingCartIcon': {
        color: theme.palette.secondary.main,
        cursor: 'pointer',
      },
    },
    cardContent: {
      padding: theme.spacing(3),
    },
    cardImageLink: {
      display: 'block',
    },
    productName: {
      fontSize: '1.1rem',
      color: theme.palette.grey[700],
    },
    productSku: {
      paddingLeft: theme.spacing(2),
      color: theme.palette.grey[500],
    },
  })
);

interface IProps {
  cars: any;
}

export default function ShopCarGrid({ cars }: IProps) {
  const classes = useStyles();
  return (
    <div className={classes.cards}>
      {cars.map((item: IMake) => {
        return (
          <div key={item.id} className={classes.card}>
            <a className={classes.cardImageLink}></a>
            <div className={classes.cardContent}>
              <Typography className={classes.productName} variant="h6">
                {item.name}
              </Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
}
