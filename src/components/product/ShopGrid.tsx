import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IProductElasticHitsSecond } from '~/interfaces/product';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      height: '100%',
    },
    cards: {
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: `repeat(3, 1fr)`,
      gridGap: theme.spacing(3),
      marginBottom: theme.spacing(5),
    },
    card: {
      boxShadow: '3px 1px 10px 5px rgba(0, 0, 0, 0.1)',
    },
    cardImage: {
      width: '100%',
      display: 'block',
    },
    cardContent: {
      lineHeight: '1.5',
      padding: theme.spacing(3),
      background: '#ddd',
    },
    cardInfo: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#eee',
      borderBottom: '1px solid #c0c0c0',
    },
    shoppingCartIcon: {
      fontSize: '2rem',
      color: theme.palette.grey[600],
    },
  })
);

interface IProps {
  products: IProductElasticHitsSecond[];
}

export default function ShopGrid({}: IProps) {
  const classes = useStyles();
  return (
    <div className={classes.cards}>
      <div className={classes.card}>
        <img
          src="https://via.placeholder.com/300/09f/fff.png"
          className={classes.cardImage}
          alt="Some image"
        />
        <div className={classes.cardContent}>
          <Typography variant="h3">
            Lorem ipsum dolor sit amet consectetur
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab facilis
            magnam debitis vero, molestiae quod nesciunt soluta voluptatibus
            necessitatibus explicabo!
          </Typography>
        </div>
        <div className={classes.cardInfo}>
          <Typography variant="h6">$ 450.00</Typography>
          <div>
            <ShoppingCartIcon className={classes.shoppingCartIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
