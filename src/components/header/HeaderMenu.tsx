import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';
import url from '~/services/url';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Avatar } from '@material-ui/core';

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
  const [session, loading] = useSession();
  function handleSignOut() {
    signOut();
    handleClose();
  }
  function handleSignIn() {
    signIn();
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
        <MenuItem onClick={handleSignIn}>
          <Link href={url.about()}>
            <a>Войти</a>
          </Link>
        </MenuItem>
      ) : (
        <MenuItem>{session.user?.email}</MenuItem>
      )}
      <MenuItem onClick={handleClose}>Мой Аккаунт</MenuItem>
      <Link href={`${url.account.create()}`}>
        <a>
          <MenuItem onClick={handleClose}>Создать Аккаунт</MenuItem>
        </a>
      </Link>
      <Divider />
      <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
    </Menu>
  );
};
