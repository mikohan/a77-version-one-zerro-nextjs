import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  IProductElasticHitsSecond,
  IProductElasticHitsFirst,
} from '~/interfaces/product';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Box, Grid, Typography } from '@material-ui/core';
import { prodCardSize } from '~/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cards: {
      margin: '0 auto',
      padding: theme.spacing(2),
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${prodCardSize}px, 1fr))`,
      gridGap: theme.spacing(4), // padding for cards in the content area
      marginBottom: theme.spacing(5),
    },
    card: {
      position: 'relative',
      display: 'block',
      boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
      borderRadius: '2px',
      background: 'white',
      transition: '0.5s',
      '&:hover $shoppingCartIcon': {
        transform: `scale(1.3)`,
        color: theme.palette.primary.main,
        cursor: 'pointer',
      },
    },
    cardImage: {
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover', // contain maki it small, cover make it big
    },
    cardContent: {
      minHeight: '8rem',
      lineHeight: '1.5',
      padding: theme.spacing(3),
    },
    cardInfo: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      /* background: theme.palette.grey[200], */
    },
    shoppingCartIcon: {
      fontSize: '2rem',
      color: theme.palette.grey[500],
      transition: '0.2s',
    },
    cardImageLink: {
      display: 'block',
      position: 'relative',
      width: '100%',
      paddingBottom: '100%',
    },
    productName: {
      fontSize: '1.1rem',
      color: theme.palette.grey[700],
    },
    productSku: {
      paddingLeft: theme.spacing(2),
      color: theme.palette.grey[500],
    },
    pageBarContainer: {
      minHeight: '4rem',
    },
    pageBarBox: {
      border: '2px solid blue',
      background: '#fff',
    },
  })
);

interface IProps {
  products: IProductElasticHitsFirst;
}

export default function ShopGrid({ products }: IProps) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid className={classes.pageBarContainer} item xs={12}>
        <Box className={classes.pageBarBox}>page sorting bar</Box>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.cards}>
          {products.hits.map((item: IProductElasticHitsSecond) => {
            const imgPath: string = item._source.images.length
              ? (item._source.images[0].img500 as string)
              : '/images/local/defaultParts500.jpg';
            return (
              <div key={item._id} className={classes.card}>
                <a className={classes.cardImageLink}>
                  <img
                    src={imgPath}
                    className={classes.cardImage}
                    alt="Some image"
                  />
                </a>
                <div className={classes.cardContent}>
                  <Typography className={classes.productName} variant="h6">
                    {item._source.name}
                  </Typography>
                </div>
                <div className={classes.productSku}>
                  <Typography variant="body2">
                    SKU: {item._source.cat_number}
                  </Typography>
                </div>
                <div className={classes.cardInfo}>
                  <Typography variant="h6">$ 450.00</Typography>
                  <div>
                    <ShoppingCartOutlinedIcon
                      className={classes.shoppingCartIcon}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Grid>
    </Grid>
  );
}
