import React from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { IProduct } from '~/interfaces';
import url from '~/services/url';

const useStyles = makeStyles({
  table: {
    /* maxWidth: '30vw', */
  },
  noAnalogs: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
              <TableCell>Каталог</TableCell>
              <TableCell>Бренд</TableCell>
              <TableCell>Цена</TableCell>
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
    return (
      <Box className={classes.noAnalogs}>
        <Typography variant="body1">
          Аналоги еще не завезли! Или не сделали :(
        </Typography>
      </Box>
    );
  }
}
