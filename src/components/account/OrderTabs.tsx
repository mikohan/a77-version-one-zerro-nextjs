import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { IUser } from '~/interfaces';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, TextField } from '@material-ui/core/';
import AnimationPage from '~/components/common/AnimationPage';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
  paymentOptions: {
    border: '1px solid blue',
    padding: theme.spacing(3),
  },
  beforeButtonBox: {
    flexGrow: 1,
  },
  optionsContainer: {
    height: '100%',
    border: '1px solid pink',
    display: 'flex',
    flexDirection: 'column',
  },
  addressField: {
    marginBottom: theme.spacing(1),
  },
  addressTitle: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  addressRadios: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.action.selected,
  },
  placeOrderButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
  accountButtons: {
    minHeight: '20vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}));

interface IProps {
  access: string;
  user: IUser;
  handlePhone(event: React.ChangeEvent<HTMLInputElement>): void;
  handleCity(event: React.ChangeEvent<HTMLInputElement>): void;
  handleAddress(event: React.ChangeEvent<HTMLInputElement>): void;
}

export default function OrderTabs({
  access,
  user,
  handlePhone,
  handleCity,
  handleAddress,
}: IProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        centered
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Без регистрации" {...a11yProps(0)} />
        <Tab label="Личный кабинет" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AnimationPage id="first-tab">
          <Box className={classes.optionsContainer}>
            <Box className={classes.paymentOptions}>
              {!access ? (
                <NoUserAddress
                  handlePhone={handlePhone}
                  handleCity={handleCity}
                  handleAddress={handleAddress}
                />
              ) : (
                <Box>Some if login</Box>
              )}
            </Box>
            <Box className={classes.paymentOptions}>
              <Typography variant="h6">Оплата</Typography>
              <Box>
                <Typography variant="body2">
                  Оплата наличными курьеру
                </Typography>
                <Typography variant="body2">Доставка Курьером</Typography>
                <Typography variant="body2">Самовывоз</Typography>
              </Box>
              <Box>
                <Typography variant="body2">
                  Оплата наличными курьеру
                </Typography>
                <Typography variant="body2">Доставка Курьером</Typography>
                <Typography variant="body2">Самовывоз</Typography>
              </Box>
            </Box>
            <Box className={classes.beforeButtonBox}>dome</Box>
            <Box className={classes.placeOrderButton}>
              <Button variant="contained" color="primary">
                отправить заказ
              </Button>
            </Box>
          </Box>
        </AnimationPage>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AnimationPage id="second-tab">
          {!access ? (
            <Box className={classes.accountButtons}>
              <Button variant="contained" color="primary">
                Войти в Личный Кабинет
              </Button>
              <Button variant="contained" color="primary">
                Создать Личный Кабинет
              </Button>
            </Box>
          ) : (
            <Box>Registered stuff</Box>
          )}
        </AnimationPage>
      </TabPanel>
    </div>
  );
}

interface INoUserAddressProps {
  handlePhone(event: React.ChangeEvent<HTMLInputElement>): void;
  handleCity(event: React.ChangeEvent<HTMLInputElement>): void;
  handleAddress(event: React.ChangeEvent<HTMLInputElement>): void;
}
function NoUserAddress({
  handlePhone,
  handleCity,
  handleAddress,
}: INoUserAddressProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState('self');
  const [showFields, setShowFields] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setValue(value);
    if (value !== 'kur') {
      setShowFields(true);
    } else {
      setShowFields(false);
    }
  };
  return (
    <Box>
      <Box className={classes.addressRadios}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Способ Доставки</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="self"
              control={<Radio />}
              label="Самовывоз"
            />
            <FormControlLabel
              value="kur"
              control={<Radio />}
              label="Доставка курьером"
            />
            <FormControlLabel
              value="post"
              control={<Radio />}
              label="Доставка Транспортной компанией"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Typography className={classes.addressTitle} variant="subtitle1">
        Введите телефон и адрес Доставки
      </Typography>
      <TextField
        className={classes.addressField}
        label="Телефон"
        id="phone"
        placeholder="Телефон"
        variant="outlined"
        size="small"
        fullWidth
        helperText="Адрес Доставки"
        required
        onChange={handlePhone}
      />
      {showFields && (
        <React.Fragment>
          <AnimationPage id="addressFields">
            <TextField
              className={classes.addressField}
              label="Город Доставки"
              id="City"
              placeholder="Город Доставки"
              variant="outlined"
              size="small"
              fullWidth
              helperText="Город Доставки"
              onChange={handleCity}
            />
            <TextField
              className={classes.addressField}
              label="Адрес"
              id="address"
              placeholder="Адрес Доставки"
              variant="outlined"
              size="small"
              fullWidth
              helperText="Адрес Доставки"
              onChange={handleAddress}
            />
          </AnimationPage>
        </React.Fragment>
      )}
    </Box>
  );
}
