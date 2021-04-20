import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Typography } from '@material-ui/core';
import { IProduct } from '~/interfaces';
import Link from 'next/link';
import url from '~/services/url';

const useStyles = makeStyles({
  table: {
    /* maxWidth: '30vw', */
  },
});

interface IProps {
  products: IProduct[];
}

export default function DenseTable({ products }: IProps) {
  const classes = useStyles();

  if (products && products.length) {
    return (
      <TableContainer component={Box}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align="right">Каталог</TableCell>
              <TableCell align="right">Бренд</TableCell>
              <TableCell align="right">Цена</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: IProduct) => {
              return (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    <Link href={url.product(product.slug)}>
                      <a>{product.name}</a>
                    </Link>
                  </TableCell>
                  <TableCell>{product.catNumber}</TableCell>
                  <TableCell>{product.brand.name.toUpperCase()}</TableCell>
                  <TableCell>
                    {product.stocks && product.stocks.length
                      ? product.stocks[0].price
                      : 'Звоните'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <Typography variant="body1">Аналогов нет!</Typography>;
  }
}
