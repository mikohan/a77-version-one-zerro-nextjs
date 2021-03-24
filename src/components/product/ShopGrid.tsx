import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  IProductElasticHitsSecond,
  IProductElasticHitsFirst,
} from '~/interfaces/product';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Box, Grid, Typography, TextField } from '@material-ui/core';
import { prodCardSize } from '~/config';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { SET_SORT_VALUE } from '~/store/types';

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
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    pageBarBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      background: '#fff',
      boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
    },
    iconItem: {
      fontSize: '2rem',
      marginRight: theme.spacing(2),
    },
    selectForm: {
      minWidth: '15rem',
    },
  })
);

interface IProps {
  products: IProductElasticHitsFirst;
}

export default function ShopGrid({ products }: IProps) {
  const classes = useStyles();
  /* const [sort, setSort] = useState('default'); */
  const dispatch = useDispatch();
  const sort = useSelector((state: IState) => state.uiState.sortPage);
  const values = [
    { value: 1, label: 'по умолчанию' },
    { value: 2, label: 'цена: сначала дешевые' },
    { value: 3, label: 'цена: сначала дорогие' },
    { value: 4, label: 'название: А - Я' },
    { value: 5, label: 'название: Я - А' },
  ];

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SET_SORT_VALUE, payload: event.target.value });
  };

  const Select = () => (
    <TextField
      id="outlined-select-currency-native"
      select
      label="сортировать"
      value={sort}
      onChange={handleSortChange}
      SelectProps={{
        native: true,
      }}
      variant="outlined"
      size="small"
      fullWidth
    >
      {values.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );

  return (
    <Grid container>
      <Grid className={classes.pageBarContainer} item xs={12}>
        <Box className={classes.pageBarBox}>
          <Box>
            <AppsIcon className={classes.iconItem} />
            <MenuIcon className={classes.iconItem} />
          </Box>
          <Box className={classes.selectForm}>
            <Select />
          </Box>
          <Box>
            <Pagination count={50} color="primary" />
          </Box>
        </Box>
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
