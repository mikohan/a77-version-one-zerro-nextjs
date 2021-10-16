import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import Pagination from '@material-ui/lab/Pagination';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import { prodCardSize } from '~/config';
import { IState } from '~/interfaces/IState';
import { SET_SHOP_GRID, SET_SORT_VALUE } from '~/store/ui/UITypes';
import ProductCardGrid from './ProductCardGrid';
import ProductCardList from './ProductCardList';
import FilterDrawer from '~/components/product/FilterDrawer';
import { capitalize } from '~/utils';
import Typography from '@material-ui/core/Typography';
import ProductCardGridSkeleton from './ProductCardGridSkeleton';
import ProductCardListSkeleton from './ProductCardListSkeleton';
import url from '~/services/url';
import { asString, conditionToRus } from '~/helpers';
import { transFilter } from '~/config';
import { booleanToRus } from '~/helpers';
import { IProductElasticHitsSecond } from '~/interfaces/product';

interface IProps {
  products: IProductElasticHitsSecond[];
  totalPages?: number;
  filtersResetHandlers: {
    handleDeleteFilter(filter: string, value: string): void;
    handleDeleteFilters(): void;
  };
}

export default function ShopGrid({
  products,
  filtersResetHandlers,
  totalPages = 15,
}: IProps) {
  // Working on capability parts

  const currentCar = useSelector((state: IState) => state.shop.currentCar);

  // Drawer stuff
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  // End drawer stuff
  const dispatch = useDispatch();
  const sort = useSelector((state: IState) => state.uiState.sortPage);
  const shopGrid = useSelector((state: IState) => state.uiState.shopGrid);
  const filters = useSelector((state: IState) => state.shopNew.filters);
  const filtersBarOpen = Object.keys(filters).length ? true : false;
  const loading = useSelector((state: IState) => state.shopNew.productsLoading);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      cards: {
        margin: '0 auto',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        display: 'grid',
        gridTemplateColumns:
          shopGrid === 'grid'
            ? `repeat(auto-fill, minmax(${prodCardSize}px, 1fr))`
            : `1fr `,
        gridGap: theme.spacing(4), // padding for cards in the content area
        marginBottom: theme.spacing(5),
      },
      pageBarContainer: {
        position: 'relative',
      },
      pageBarBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        background: theme.palette.background.paper,
        boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
      },
      iconsBoxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      iconItem: {
        fontSize: '1.7rem',
        marginRight: theme.spacing(2),
        cursor: 'pointer',
      },
      iconGrid: {
        fontSize: '1.7rem',
        marginRight: theme.spacing(2),
        cursor: 'pointer',
        color:
          shopGrid === 'grid'
            ? theme.palette.primary.main
            : theme.palette.action.disabled,
      },
      iconList: {
        fontSize: '1.7rem',
        marginRight: theme.spacing(2),
        cursor: 'pointer',
        color:
          shopGrid === 'list'
            ? theme.palette.primary.main
            : theme.palette.action.disabled,
      },

      selectForm: {
        [theme.breakpoints.down('sm')]: {
          maxWidth: '15rem',
        },
        [theme.breakpoints.up('sm')]: {
          maxWidth: '15rem',
        },
      },
      resize: {
        color: theme.palette.text.secondary,
        padding: '.4rem 14px',
        fontSize: '0.9rem',
      },
      label: {},
      paginationBottom: {
        paddingBottom: theme.spacing(5),
      },
      pageBottomPaginationBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        background: theme.palette.background.paper,
        boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
      },
      filterButton: {
        marginRight: theme.spacing(2),
      },
      filtersBox: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        background: theme.palette.background.paper,
        boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        borderTop: '1px solid',
        borderColor: theme.palette.divider,
      },
      deleteChip: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(0.25),
        marginBottom: theme.spacing(0.25),
      },
      dividerBox: {
        position: 'absolute',
        left: '50%',
        top: '-0.5rem',
        transform: `translateX(-50%)`,
        paddingRight: '1rem',
        paddingLeft: '1rem',
        background: theme.palette.background.paper,
        color: theme.palette.text.disabled,
        [theme.breakpoints.down('xl')]: {
          fontSize: '0.75rem',
        },
        [theme.breakpoints.up('xxl')]: {
          fontSize: '0.85rem',
        },
      },
    })
  );

  const classes = useStyles();

  const values = [
    { value: 1, label: 'по умолчанию' },
    { value: 2, label: 'цена: сначала дешевые' },
    { value: 3, label: 'цена: сначала дорогие' },
    /* { value: 4, label: 'название: А - Я' }, */
    /* { value: 5, label: 'название: Я - А' }, */
  ];

  const handleGrid = () => {
    dispatch({ type: SET_SHOP_GRID, payload: 'grid' });
  };
  const handleList = () => {
    dispatch({ type: SET_SHOP_GRID, payload: 'list' });
  };
  const handleDeleteFilter = filtersResetHandlers.handleDeleteFilter;
  const handleDeleteFilters = filtersResetHandlers.handleDeleteFilters;

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
      InputProps={{
        classes: {
          input: classes.resize,
        },
      }}
      InputLabelProps={{
        classes: {
          root: classes.label,
        },
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

  const router = useRouter();
  const { make, model, category } = router.query;
  const str: string = asString(router.query.page as string);
  const page: number = parseInt(str) || 1;

  let pathname: string;
  if (
    router.query.hasOwnProperty('make') &&
    router.query.hasOwnProperty('model') &&
    router.query.hasOwnProperty('category')
  ) {
    pathname = url.category(make, model, category);
  } else if (
    router.query.hasOwnProperty('make') &&
    router.query.hasOwnProperty('model')
  ) {
    pathname = url.model(make, model, category);
  } else if (router.query.hasOwnProperty('make')) {
    pathname = url.make(make, model, category);
  }
  const currentUrl = Object.assign({}, router.query);
  delete currentUrl.make;
  delete currentUrl.model;
  delete currentUrl.category;

  function paginationHandler(e: object, page: number) {
    router.push({
      pathname,
      query: {
        ...currentUrl,
        page: page,
      },
    });
  }
  /* useEffect(() => { */
  /*   if (router.query.hasOwnProperty('sort_price')) { */
  /*     if (router.query.sort_price === 'asc') { */
  /*       dispatch({ type: SET_SORT_VALUE, payload: '2' }); */
  /*     } else if (router.query.sort_price === 'desc') { */
  /*       dispatch({ type: SET_SORT_VALUE, payload: '3' }); */
  /*     } */
  /*   } */
  /* }, []); */

  const [localSort, setLocalSort] = React.useState('');
  useEffect(() => {
    if (localSort) {
      let srt: string = 'asc';
      if (sort === '3') {
        srt = 'desc';
      } else if (sort === '2') {
        srt = 'asc';
      }
      delete currentUrl.sort_price;
      router.push({
        pathname,
        query: {
          ...currentUrl,
          sort_price: srt,
        },
      });
    }
  }, [localSort]);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SET_SORT_VALUE, payload: event.target.value });
    setLocalSort(event.target.value);
  };

  return (
    <React.Fragment>
      <FilterDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
      <Grid container>
        <Grid item container xs={12}>
          <Hidden smDown>
            <Grid className={classes.pageBarContainer} item xs={12}>
              <Box className={classes.pageBarBox}>
                <Box className={classes.iconsBoxContainer}>
                  <Hidden mdUp>
                    <Button
                      onClick={toggleDrawer}
                      variant="outlined"
                      color="primary"
                      className={classes.filterButton}
                      startIcon={<FilterIcon color="primary" />}
                      aria-label="Фильтры"
                    >
                      ФИЛЬТРЫ
                    </Button>
                  </Hidden>
                  <AppsIcon className={classes.iconGrid} onClick={handleGrid} />
                  <MenuIcon className={classes.iconList} onClick={handleList} />
                </Box>
                <Box className={classes.selectForm}>
                  <Select />
                </Box>
                <Hidden mdDown>
                  <Box>
                    <Pagination
                      onChange={paginationHandler}
                      count={totalPages}
                      page={page}
                      color="primary"
                    />
                  </Box>
                </Hidden>
              </Box>
            </Grid>
          </Hidden>
          {filtersBarOpen && (
            <Grid className={classes.pageBarContainer} item xs={12}>
              <Typography className={classes.dividerBox} variant="body2">
                АКТИВНЫЕ ФИЛЬТРЫ
              </Typography>
              <Box className={classes.filtersBox}>
                {Object.entries(filters)
                  .filter((item: any) => {
                    if (item[0] === 'sort_price') {
                      return false;
                    }
                    return true;
                  })
                  .map((fil: any) => {
                    return fil[1].split(',').map((elem: string) => {
                      if (fil[0] === 'has_photo') {
                        elem = booleanToRus(elem);
                      }
                      if (fil[0] === 'condition') {
                        elem = conditionToRus(elem);
                      }
                      return (
                        <Chip
                          key={elem}
                          className={classes.deleteChip}
                          variant="outlined"
                          size="small"
                          label={`${capitalize(
                            transFilter[fil[0]]
                          )}: ${capitalize(elem)}`}
                          onDelete={() => {
                            handleDeleteFilter(fil[0], elem);
                          }}
                          onClick={() => {
                            handleDeleteFilter(fil[0], elem);
                          }}
                        />
                      );
                    });
                  })}
                <Chip
                  className={classes.deleteChip}
                  variant="outlined"
                  size="small"
                  label="Очистить Все"
                  onDelete={handleDeleteFilters}
                  onClick={handleDeleteFilters}
                />
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <div className={classes.cards}>
            {products.map((item: IProductElasticHitsSecond) => {
              const elem =
                shopGrid === 'grid' ? (
                  <ProductCardGrid
                    key={item._id}
                    product={item}
                    currentCar={currentCar}
                  />
                ) : (
                  <ProductCardList
                    key={item._id}
                    product={item}
                    currentCar={currentCar}
                  />
                );
              const skel =
                shopGrid === 'grid' ? (
                  <ProductCardGridSkeleton key={item._id} />
                ) : (
                  <ProductCardListSkeleton key={item._id} />
                );

              return !loading ? elem : skel;
            })}
          </div>
        </Grid>
        <Grid className={classes.paginationBottom} item xs={12}>
          <Box className={classes.pageBottomPaginationBox}>
            <Pagination
              onChange={paginationHandler}
              count={totalPages}
              page={page}
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
