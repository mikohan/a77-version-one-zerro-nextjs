import React from 'react';
import { Paper, Grid, Chip, Typography, Box, Button } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { IUser } from '~/interfaces';
import { IAddress } from '~/interfaces';
import { useRouter } from 'next/router';
import url from '~/services/url';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
}

export default function AddressesPaper({ user }: IProps) {
  const classes = useStyles();
  const router = useRouter();

  function handleAddresses() {
    router.push(url.account.addresses());
  }
  function addAddress() {
    router.push(url.account.addAddress());
  }
  const addresses = user.address_user || [];

  if (addresses && addresses.length > 0) {
    let defaultAddress = addresses.find(
      (address: IAddress) => address.default === true
    );
    if (!defaultAddress) {
      defaultAddress = addresses[0];
    }
    const [valueAddress, setValueAddress] = React.useState(defaultAddress?.id);
    const handleChangeAddress = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setValueAddress(parseInt(event.target.value));
    };

    return (
      <Box className={classes.address}>
        <React.Fragment>
          {user && Object.keys(user.address_user).length ? (
            <Box className={classes.addressBox}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Выбрать Адрес Доставки</FormLabel>
                <RadioGroup
                  aria-label="addresses"
                  name="addresses"
                  value={valueAddress}
                  onChange={handleChangeAddress}
                >
                  {addresses.map((address: IAddress) => (
                    <React.Fragment key={address.id}>
                      <FormControlLabel
                        value={address.id}
                        control={<Radio />}
                        label={`${address?.city} ${address?.address}`}
                      />
                    </React.Fragment>
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          ) : (
            ''
          )}
          <Box className={classes.editAddressButtonBox}>
            <Button onClick={handleAddresses} variant="contained">
              Изменить Адреса
            </Button>
          </Box>
        </React.Fragment>
      </Box>
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
