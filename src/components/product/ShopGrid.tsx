import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  IProductElasticHitsSecond,
  IProductElasticHitsFirst,
} from '~/interfaces/product';
import { Hidden, Box, Grid, TextField } from '@material-ui/core';
import { prodCardSize } from '~/config';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { SET_SHOP_GRID, SET_SORT_VALUE } from '~/store/types';
import { compareByNameAsc, compareByNameDesc } from '~/utils';
import ProductCardGrid from './ProductCardGrid';
import ProductCardList from './ProductCardList';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import FilterDrawer from '~/components/product/FilterDrawer';

interface IProps {
  products: IProductElasticHitsFirst;
}

export default function ShopGrid({ products }: IProps) {
  const dispatch = useDispatch();
  const sort = useSelector((state: IState) => state.uiState.sortPage);
  const shopGrid = useSelector((state: IState) => state.uiState.shopGrid);
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      cards: {
        margin: '0 auto',
        padding: theme.spacing(2),
        display: 'grid',
        gridTemplateColumns:
          shopGrid === 'grid'
            ? `repeat(auto-fill, minmax(${prodCardSize}px, 1fr))`
            : `1fr `,
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
      iconsBoxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
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
        [theme.breakpoints.down('sm')]: {
          maxWidth: '15rem',
        },
        [theme.breakpoints.up('sm')]: {
          maxWidth: '15rem',
        },
      },
      paginationBottom: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(5),
      },
      pageBottomPaginationBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        background: '#fff',
        boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
      },
      filterButton: {
        marginRight: theme.spacing(2),
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
  const FilterIcon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
      <path d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.989.989 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12H14z" />
    </SvgIcon>
  );

  return (
    <React.Fragment>
      <FilterDrawer />
      <Grid container>
        <Grid className={classes.pageBarContainer} item xs={12}>
          <Box className={classes.pageBarBox}>
            <Box className={classes.iconsBoxContainer}>
              <Hidden mdUp>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.filterButton}
                  startIcon={<FilterIcon color="primary" fontSize="large" />}
                >
                  ФИЛЬТРЫ
                </Button>
              </Hidden>
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
            <Hidden mdDown>
              <Box>
                <Pagination count={50} color="primary" />
              </Box>
            </Hidden>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.cards}>
            {products.hits.map((item: IProductElasticHitsSecond) => {
              const elem =
                shopGrid === 'grid' ? (
                  <ProductCardGrid key={item._id} product={item} />
                ) : (
                  <ProductCardList key={item._id} product={item} />
                );

              return elem;
            })}
          </div>
        </Grid>
        <Grid className={classes.paginationBottom} xs={12}>
          <Box className={classes.pageBottomPaginationBox}>
            <Pagination count={50} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
