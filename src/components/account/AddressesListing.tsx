import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
    bottomAddress: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    addressBox: {
      padding: theme.spacing(1),
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid',
      borderColor: theme.palette.action.disabled,
      borderRadius: '0.5rem',
    },
    editAddressButtonBox: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(1),
      textAlign: 'center',
    },
  })
);

interface IProps {
  user: IUser;
  handleChangeAddress(event: React.ChangeEvent<HTMLInputElement>): void;
  valueAddress: number;
}

export default function AddressesPaper({
  user,
  valueAddress,
  handleChangeAddress,
}: IProps) {
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

    return (
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
                      label={
                        <Typography variant="body2">{`${address?.city} ${address?.address}`}</Typography>
                      }
                    />
                  </React.Fragment>
                ))}
              </RadioGroup>
            </FormControl>
            <Box className={classes.editAddressButtonBox}>
              <Button
                onClick={handleAddresses}
                variant="contained"
                size="small"
              >
                Изменить Адреса
              </Button>
            </Box>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleAddresses}
          >
            Добавить адрес доставки
          </Button>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <Box className={classes.address}>
        <Box className={classes.bottomAddress}>
          <Typography variant="body2">
            Пока нет ни одного адреса доставки. Создать?
          </Typography>
          <Box className={classes.editAddressButtonBox}>
            <Button onClick={addAddress} variant="contained" size="small">
              Добавить Адрес
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}
