import React from 'react';
import { IEngine, IProduct } from '~/interfaces';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Chip,
  Button,
  Typography,
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Hidden,
} from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      /* border: '1px solid', */
      /* borderColor: theme.palette.action.disabledBackground, */
      /* borderRadius: 3, */
    },
    paperOne: {
      height: theme.spacing(20),
    },
    firstRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    priceBox: {
      padding: theme.spacing(2),
    },
    price: {
      color: theme.palette.primary.main,
      fontWeight: 700,
      fontSize: '1.4rem',
      [theme.breakpoints.up('xl')]: {
        fontSize: '1.7rem',
      },
    },
    priceSide: {
      padding: theme.spacing(2),
    },
    middle: {
      paddingBottom: theme.spacing(2),
      flexGrow: 1,
    },
    secondRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: '100%',
      [theme.breakpoints.between('sm', 'md')]: {
        width: '50%',
      },
    },
    chip: {
      background: () =>
        theme.palette.type === 'light' ? lightGreen[100] : lightGreen[700],
      borderColor: () =>
        theme.palette.type === 'light' ? lightGreen[100] : lightGreen[700],
    },
    inStock: {
      color: () =>
        theme.palette.type === 'light' ? lightGreen[700] : lightGreen[100],
    },
    enginesCell: {
      display: 'flext',
      flexWrap: 'wrap',
    },
    engine: {
      marginRight: theme.spacing(1),
    },
    table: {
      '& td': {
        fontSize: '.875rem',
        [theme.breakpoints.up('xl')]: {
          fontSize: '1rem',
        },
        color: theme.palette.text.secondary,
      },
      '& th': {
        fontSize: '.875rem',
        [theme.breakpoints.up('xl')]: {
          fontSize: '1rem',
        },
      },
    },
  })
);
interface IProps {
  product: IProduct;
}

const PriceBox = ({ product }: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Box className={classes.firstRow}>
        <Box className={classes.priceBox}>
          <Typography className={classes.price} variant="h6">
            <span>&#8381;</span> 5967
          </Typography>
        </Box>
        <Box className={classes.priceSide}>
          <Chip
            className={classes.chip}
            label={
              <Typography className={classes.inStock} variant="body2">
                В наличии
              </Typography>
            }
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>
      <Hidden smDown>
        <Box className={classes.middle}>
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell component="th">SKU</TableCell>
                <TableCell>{product.sku}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">Бренд</TableCell>
                <TableCell>{product.brand.name.toUpperCase()}</TableCell>
              </TableRow>
              {product.brand.country && (
                <TableRow>
                  <TableCell component="th">Страна</TableCell>
                  <TableCell>{product.brand.country}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell component="th">Номер</TableCell>
                <TableCell>{product.catNumber}</TableCell>
              </TableRow>
              {product.oemNumber && (
                <TableRow>
                  <TableCell component="th">OEM #</TableCell>
                  <TableCell>{product.oemNumber}</TableCell>
                </TableRow>
              )}
              {product.engine && product.engine?.length > 0 && (
                <TableRow>
                  <TableCell component="th">Двигатель</TableCell>
                  <TableCell className={classes.enginesCell}>
                    {product.engine.map((engine: IEngine) => (
                      <div className={classes.engine} key={engine.id}>
                        {engine.name}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell component="th">Состояние</TableCell>
                <TableCell>{product.condition?.toUpperCase()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Hidden>
      <Box className={classes.secondRow}>
        <Button className={classes.button} variant="contained" color="primary">
          В корзину
        </Button>
      </Box>
    </div>
  );
};

export default PriceBox;