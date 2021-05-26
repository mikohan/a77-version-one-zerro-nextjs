import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';
import url from '~/services/url';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '~/interfaces';
import { logout } from '~/store/users/userAction';

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
          <a>О Компании</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link href={url.delivery()}>
          <a>Доставка</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link href={url.warranty()}>
          <a>Гарантии</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link href={url.payment()}>
          <a>Оплата</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link href={url.policy()}>
          <a>Конфиденциальность</a>
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
  const session = useSelector((state: IState) => state.user.access);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(logout());
    handleClose();
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
        </div>
      ) : (
        <div>
          <Link href={`${url.account.dashboard()}`}>
            <a>
              <MenuItem onClick={handleClose}>Мой Аккаунт</MenuItem>
            </a>
          </Link>
          <Link href={`${url.account.register()}`}>
            <a>
              <MenuItem onClick={handleClose}>Empty</MenuItem>
            </a>
          </Link>
          <Divider />
          <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
        </div>
      )}
    </Menu>
  );
};
