import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import {
  Popover,
  Typography,
  Box,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import url from '~/services/url';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { ICartItem } from '~/store/cart/cartTypes';
import { COMPANY_INFORMATION, imageServerUrl } from '~/config';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '500px',
      padding: theme.spacing(2),
    },
    buttonBox: {
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: theme.spacing(1),
    },
    price: {
      fontWeight: 500,
    },
    list: {
      padding: theme.spacing(2),
    },
    button: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    totalText: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    totalMoney: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  })
);

interface IProps {
  anchorEl: HTMLElement | null;
  setAnchorEl(anchor: HTMLElement | null): void;
  /* handleClick(event: React.MouseEvent<HTMLButtonElement>): void; */
}
export default function SimpleMenu({ anchorEl, setAnchorEl }: IProps) {
  const classes = useStyles();
  const cart = useSelector((state: IState) => state.cart);
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (cart && cart.items.length) {
    return (
      <div>
        <Popover
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box className={classes.root}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Фото</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>Q</TableCell>
                    <TableCell>Сумма</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.items.map((item: ICartItem) => {
                    const img = item.product.images.length
                      ? `${imageServerUrl}${item.product.images[0].img150}`
                      : '/images/local/defaultParts245.jpg';
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Image src={img} width={70} height={60} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            {item.product.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            {item.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            className={classes.price}
                            variant="subtitle1"
                          >
                            &#8381;{item.total}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box className={classes.list}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        className={classes.totalText}
                        variant="subtitle1"
                      >
                        Доставка
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        className={classes.totalMoney}
                        variant="subtitle1"
                      >
                        от &#8381;{COMPANY_INFORMATION.DELIVERY_COST_FROM}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        className={classes.totalText}
                        variant="subtitle1"
                      >
                        Итого:
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        className={classes.totalMoney}
                        variant="subtitle1"
                      >
                        &#8381;{cart.total}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box className={classes.buttonBox}>
              <Link href={url.cart()}>
                <a>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                  >
                    Перейти в Козину
                  </Button>
                </a>
              </Link>
              <Link href={url.placeOrder()}>
                <a>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                  >
                    Оформить Заказ
                  </Button>
                </a>
              </Link>
            </Box>
          </Box>
        </Popover>
      </div>
    );
  } else {
    return (
      <div>
        <Popover
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box className={classes.root}>
            <Typography variant={classes.empty}>Корзина пуста!</Typography>
          </Box>
        </Popover>
      </div>
    );
  }
}
