import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  IProductElasticHitsSecond,
  IProductElasticHitsFirst,
} from '~/interfaces/product';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Typography } from '@material-ui/core';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      height: '100%',
    },
    cards: {
      margin: '0 auto',
      padding: theme.spacing(2),
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
      gridGap: theme.spacing(3), // padding for cards in the content area
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
      minHeight: '10rem',
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
  products: IProductElasticHitsFirst;
}

export default function ShopGrid({ products }: IProps) {
  const classes = useStyles();
  return (
    <div className={classes.cards}>
      {products.hits.map((item: IProductElasticHitsSecond) => {
        const imgPath: string = item._source.images.length
          ? (item._source.images[0].img500 as string)
          : '/images/local/defaultParts245.jpg';
        return (
          <div key={item._id} className={classes.card}>
            <img src={imgPath} className={classes.cardImage} alt="Some image" />
            <div className={classes.cardContent}>
              <Typography variant="h5">{item._source.name}</Typography>
            </div>
            <div className={classes.cardInfo}>
              <Typography variant="h6">$ 450.00</Typography>
              <div>
                <ShoppingCartIcon className={classes.shoppingCartIcon} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
