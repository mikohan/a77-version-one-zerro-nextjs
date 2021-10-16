import React from 'react';
import Moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import url from '~/services/url';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { ICart, ICartItem } from '~/store/cart/cartTypes';
import imgUrlRebuild from '~/services/img';

interface IProps {
  orderNumber: string;
  cart: ICart;
}

export default function OrderTable({ cart, orderNumber }: IProps) {
  const classes = useStyles();
  Moment.locale('ru');
  const today = Moment();
  return (
    <Paper className={classes.paper}>
      <Box className={classes.orderBox}>
        <Typography variant="h6" color="primary">
          Заказ {orderNumber}
        </Typography>
        <Typography variant="body2">
          <span className={classes.dateSpan}>
            Создан {Moment(today).format('d MMM YYYY')}
          </span>
          <span className={classes.sumSpan}>Сумма заказа</span>
          <span className={classes.span}>&#8381; {cart.total}</span>
        </Typography>
      </Box>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align="left">Фото</TableCell>
              <TableCell align="left">Бренд</TableCell>
              <TableCell align="left">Машина</TableCell>
              <TableCell align="left">Кол-во</TableCell>
              <TableCell align="left">Цена</TableCell>
              <TableCell align="left">Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.items.length &&
              cart.items.map((item: ICartItem) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      <Link href={url.product(item.product.slug)}>
                        <a>
                          <Typography
                            className={classes.orderDate}
                            color="primary"
                            variant="body2"
                          >
                            {item.product.name}
                          </Typography>
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Image
                        src={
                          item.product.images.length
                            ? `${imgUrlRebuild(
                                item.product.images[0].img150 as string
                              )}`
                            : '/images/local/defaultParts245.jpg'
                        }
                        width={40}
                        height={40}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Typography className={classes.orderRow} variant="body2">
                        {item.product.brand.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      {item.product.model[0].model}
                    </TableCell>
                    <TableCell align="left">{item.quantity}</TableCell>
                    <TableCell align="left">
                      <Typography variant="body2">
                        &#8381; {item.price}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography className={classes.orderSum} variant="body2">
                        &#8381; {item.total}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.tableTotal}>
        <Typography variant="h6">Сумма заказа</Typography>
        <Typography className={classes.totalSum} variant="h6">
          &#8381; {cart.total}
        </Typography>
      </Box>
    </Paper>
  );
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    left: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    right: {
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(2),
      },
    },
    paper: {
      height: '100%',
      padding: theme.spacing(2),
    },
    ordersGrid: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    orderRow: {
      textDecoration: 'underline',
    },
    orderSum: {
      fontWeight: 700,
    },
    orderDate: {
      fontWeight: 700,
      textDecoration: 'underline',
    },
    span: {
      fontWeight: 700,
    },
    dateSpan: {
      marginRight: theme.spacing(2),
    },
    sumSpan: {
      marginRight: theme.spacing(2),
    },
    tableTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(3),
      paddingLeft: '50%',
    },
    totalSum: {
      fontWeight: 700,
    },
    orderBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.action.selected,
    },
  })
);
