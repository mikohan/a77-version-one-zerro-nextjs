import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import {
  IProductElasticHitsSecond,
  IProductElasticHitsFirst,
} from '~/interfaces/product';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Box, Grid, Typography, TextField } from '@material-ui/core';
import { prodCardSize } from '~/config';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { SET_SHOP_GRID, SET_SORT_VALUE } from '~/store/types';
import { compareByNameAsc, compareByNameDesc } from '~/utils';
import { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import ProductCardGrid from './ProductCardGrid';

interface IProps {
  products: IProductElasticHitsFirst;
}

export default function ShopGrid({ products }: IProps) {
  const dispatch = useDispatch();
  const sort = useSelector((state: IState) => state.uiState.sortPage);
  const shopGrid = useSelector((state: IState) => state.uiState.shopGrid);
  const theme = useTheme();
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      cards: {
        margin: '0 auto',
        padding: theme.spacing(2),
        display: 'grid',
        gridTemplateColumns:
          shopGrid === 'grid'
            ? `repeat(auto-fill, minmax(${prodCardSize}px, 1fr))`
            : `repeat(auto-fill, 1fr )`,
        gridGap: theme.spacing(4), // padding for cards in the content area
        marginBottom: theme.spacing(5),
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
        cursor: 'pointer',
      },
      iconGrid: {
        color:
          shopGrid === 'grid'
            ? theme.palette.primary.main
            : theme.palette.grey[500],
      },
      iconList: {
        color:
          shopGrid === 'list'
            ? theme.palette.primary.main
            : theme.palette.grey[500],
      },

      selectForm: {
        minWidth: '15rem',
      },
    })
  );

  const classes = useStyles();

  let productsSorted;
  switch (sort) {
    case '1':
      productsSorted = products.hits;
      break;
    case '2':
      /* productsSorted = products.hits.sort(compareByPriceDesc); */
      break;
    case '3':
      /* productsSorted = products.hits.sort(compareByPriceAsc); */
      break;
    case '4':
      productsSorted = products.hits.sort(compareByNameAsc);
      break;
    case '5':
      productsSorted = products.hits.sort(compareByNameDesc);
      break;
    default:
      productsSorted = products.hits;
      break;
  }

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

  const handleGrid = () => {
    dispatch({ type: SET_SHOP_GRID, payload: 'grid' });
  };
  const handleList = () => {
    dispatch({ type: SET_SHOP_GRID, payload: 'list' });
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
            <Box component="span" className={classes.iconGrid}>
              <AppsIcon className={classes.iconItem} onClick={handleGrid} />
            </Box>
            <Box component="span" className={classes.iconList}>
              <MenuIcon className={classes.iconItem} onClick={handleList} />
            </Box>
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
            return <ProductCardGrid key={item._id} product={item} />;
          })}
        </div>
      </Grid>
    </Grid>
  );
}
