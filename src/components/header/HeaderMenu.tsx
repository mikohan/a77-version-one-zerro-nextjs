import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { IState } from '~/interfaces';
import { logout } from '~/store/users/userAction';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { capitalize } from '~/utils';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    a: {
      width: '100%',
    },
  })
);

interface IProps {
  handleClick(event: React.MouseEvent<HTMLButtonElement>): void;
  handleClose(): void;
  anchorEl: HTMLElement | null;
}

export const CompanyMenu = ({
  anchorEl,
  handleClick,
  handleClose,
  ...props
}: IProps) => {
  const classes = useStyles();
  return (
    <Menu
      id="company"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      {...props}
    >
      <MenuItem onClick={handleClose}>
        <Link href={url.about()}>
          <a className={classes.a}>О Компании</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link href={url.delivery()}>
          <a className={classes.a}>Доставка</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link href={url.warranty()}>
          <a className={classes.a}>Гарантии</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link href={url.payment()}>
          <a className={classes.a}>Оплата</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link href={url.policy()}>
          <a className={classes.a}>Конфиденциальность</a>
        </Link>
      </MenuItem>
    </Menu>
  );
};

export const LoginMenu = ({
  anchorEl,
  handleClick,
  handleClose,
  ...props
}: IProps) => {
  const classes = useStyles();
  const session = useSelector((state: IState) => state.user.access);
  const dispatch = useDispatch();
  const user = useSelector((state: IState) => state.user);
  const router = useRouter();

  function handleSignOut() {
    dispatch(logout());
    handleClose();
    router.push(url.home());
  }
  function handleSignIn() {
    handleClose();
  }
  return (
    <Menu
      id="contact"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      {...props}
    >
      {!session ? (
        <div>
          <MenuItem onClick={handleSignIn}>
            <Link href={url.account.login()}>
              <a>Войти</a>
            </Link>
          </MenuItem>
          <Link href={url.account.register()}>
            <a>
              <MenuItem>Создать Аккаунт</MenuItem>
            </a>
          </Link>
          <Link href={url.placeOrder()}>
            <a>
              <MenuItem>Оформить заказ</MenuItem>
            </a>
          </Link>
          <Link href={url.cart()}>
            <a>
              <MenuItem>Перейти в Корзину</MenuItem>
            </a>
          </Link>
        </div>
      ) : (
        <div>
          <Link href={`${url.account.dashboard()}`}>
            <a>
              <MenuItem onClick={handleClose}>
                <Box>
                  <Avatar
                    src={
                      user.image
                        ? user.image
                        : '/images/local/default-avatar.jpg'
                    }
                  />
                  <Box>
                    <Typography variant="body1">
                      {capitalize(user.username)}
                    </Typography>
                    <Typography variant="body2">{user.email}</Typography>
                  </Box>
                </Box>
              </MenuItem>
            </a>
          </Link>
          <Divider />
          <Link href={`${url.account.dashboard()}`}>
            <a>
              <MenuItem onClick={handleClose}>Мой Аккаунт</MenuItem>
            </a>
          </Link>
          <Divider />
          <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
        </div>
      )}
    </Menu>
  );
};
