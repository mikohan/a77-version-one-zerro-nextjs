import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { IUser } from '~/interfaces';
import { IAddress } from '~/interfaces';
import { useRouter } from 'next/router';
import url from '~/services/url';

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
    avatarGrid: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    addressGrid: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(2),
      },
    },
    paper: {
      height: '100%',
    },
    userPaper: {
      minHeight: theme.spacing(30),
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '& > *': {
        marginBottom: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
      },
    },
    avatar: {
      width: 100,
      height: 100,
    },
    address: {
      height: '100%',
      minHeight: theme.spacing(30),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    profileButton: {
      marginTop: theme.spacing(2),
    },
    ordersGrid: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(3),
    },
    orderTitle: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
    addressBox: {
      '&>*': {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
      },
    },
    bottomAddress: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    chipBox: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    addressTitle: {
      paddingBottom: theme.spacing(2),
    },
    editAddressButtonBox: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      textAlign: 'center',
    },
  })
);

interface IProps {
  user: IUser;
  addresses: IAddress[];
}

export default function AddressesPaper({ user, addresses }: IProps) {
  const classes = useStyles();
  const router = useRouter();

  function handleAddresses() {
    router.push(url.account.addresses());
  }
  function addAddress() {
    router.push(url.account.addAddress());
  }
  if (addresses && addresses.length > 0) {
    let address = addresses.find(
      (address: IAddress) => address.default === true
    );
    if (!address) {
      address = addresses[0];
    }

    return (
      <Paper className={classes.address}>
        {Object.keys(user).length ? (
          <React.Fragment>
            <Box className={classes.chipBox}>
              <Typography className={classes.addressTitle} variant="h6">
                Адрес Доставки
              </Typography>
              <Chip size="small" label="Основной" />
            </Box>
            {user && Object.keys(user.address_user).length ? (
              <Box className={classes.addressBox}>
                <Box>
                  <Typography variant="subtitle2">Адрес</Typography>
                  <Typography variant="body1">{address?.address}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Город</Typography>
                  <Typography variant="body1">{address?.city}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Индекс</Typography>
                  <Typography variant="body1">{address?.zip_code}</Typography>
                </Box>
                {Object.keys(user).length && (
                  <Box>
                    <Typography variant="subtitle2">Телефон</Typography>
                    <Typography variant="body1">{user.phone}</Typography>
                  </Box>
                )}
                <Box>
                  <Typography variant="subtitle2">Email</Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Box>
              </Box>
            ) : (
              ''
            )}
            <Box className={classes.editAddressButtonBox}>
              <Button onClick={handleAddresses} variant="contained">
                Редактировать Адреса
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          ''
        )}
      </Paper>
    );
  } else {
    return (
      <Paper className={classes.address}>
        <Box className={classes.bottomAddress}>
          <Box className={classes.chipBox}>
            <Typography className={classes.addressTitle} variant="h6">
              Адрес Доставки
            </Typography>
            <Chip size="small" label="Основной" />
          </Box>
          <Typography variant="h6">
            Пока нет ни одного адреса доставки. Создать?
          </Typography>
          <Box className={classes.editAddressButtonBox}>
            <Button onClick={addAddress} variant="contained">
              Добавить Адрес
            </Button>
          </Box>
        </Box>
      </Paper>
    );
  }
}
