import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
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
import { Button, Divider, TextField } from '@material-ui/core/';
import AnimationPage from '~/components/common/AnimationPage';
import AddressesListing from '~/components/account/AddressesListing';
import { useRouter } from 'next/router';
import url from '~/services/url';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ height: '100%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
  beforeButtonBox: {
    paddingBottom: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  optionsContainer: {
    height: '100%',
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
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  placeOrderButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  orderBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(2),
  },
  accountButtons: {
    minHeight: '20vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  divider: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
}));

interface IProps {
  access: string;
  user: IUser;
  handlePhone(event: React.ChangeEvent<HTMLInputElement>): void;
  handleCity(event: React.ChangeEvent<HTMLInputElement>): void;
  handleAddress(event: React.ChangeEvent<HTMLInputElement>): void;
  handleChangePayment(event: React.ChangeEvent<HTMLInputElement>): void;
  valuePayment: string;
  handleChangeDelivery(event: React.ChangeEvent<HTMLInputElement>): void;
  valueDelivery: string;
  showFields: boolean;
  showPayment: boolean;
  showOnlinePayment: boolean;
  handleChangeAddress(event: React.ChangeEvent<HTMLInputElement>): void;
  valueAddress: number;
  handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>): void;
  emailError: boolean;
  phoneError: boolean;
}

export default function OrderTabs({
  access,
  user,
  handlePhone,
  handleCity,
  handleAddress,
  handleChangePayment,
  valuePayment,
  valueDelivery,
  handleChangeDelivery,
  showFields,
  showPayment,
  showOnlinePayment,
  handleChangeAddress,
  valueAddress,
  handleChangeEmail,
  emailError,
  phoneError,
}: IProps) {
  const classes = useStyles();
  const router = useRouter();
  let initTab = 0;
  if (access && user && Object.keys(user).length) {
    initTab = 1;
  }
  const [value, setValue] = React.useState(initTab);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  function goLogin() {
    router.push(url.account.login());
  }
  function goRegister() {
    router.push(url.account.register());
  }

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
          <Box>
            <NoUserAddress
              user={user}
              handlePhone={handlePhone}
              handleCity={handleCity}
              handleAddress={handleAddress}
              valueDelivery={valueDelivery}
              handleChangeDelivery={handleChangeDelivery}
              showFields={showFields}
              handleChangeEmail={handleChangeEmail}
              handleChangeAddress={handleChangeAddress}
              valueAddress={valueAddress}
              emailError={emailError}
              phoneError={phoneError}
            />
          </Box>
          <Box>
            <Box className={classes.addressRadios}>
              <Divider className={classes.divider} />
              <FormControl component="fieldset">
                <FormLabel component="legend">Споcоб оплаты</FormLabel>
                {showPayment ? (
                  <RadioGroup
                    aria-label="payment"
                    name="payment"
                    value={valuePayment}
                    onChange={handleChangePayment}
                  >
                    <FormControlLabel
                      value="onGet"
                      control={<Radio />}
                      label="Оплата при получении"
                    />
                    <FormControlLabel
                      value="onLine"
                      control={<Radio />}
                      label="Оплата картой онлайн"
                    />
                  </RadioGroup>
                ) : (
                  <Typography variant="body2">
                    Уточнтите способ оплаты у менеджера
                  </Typography>
                )}
              </FormControl>
            </Box>
          </Box>
          <Box className={classes.beforeButtonBox}>
            {showOnlinePayment && (
              <Button variant="contained">Оплатить Картой</Button>
            )}
          </Box>
        </AnimationPage>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AnimationPage id="second-tab">
          {access ? (
            <React.Fragment>
              <Box>
                <NoUserAddress
                  user={user}
                  handlePhone={handlePhone}
                  handleCity={handleCity}
                  handleAddress={handleAddress}
                  valueDelivery={valueDelivery}
                  handleChangeDelivery={handleChangeDelivery}
                  showFields={showFields}
                  handleChangeEmail={handleChangeEmail}
                  handleChangeAddress={handleChangeAddress}
                  valueAddress={valueAddress}
                  emailError={emailError}
                  phoneError={phoneError}
                />
              </Box>
              <Box>
                <Box className={classes.addressRadios}>
                  <Divider className={classes.divider} />
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Споcоб оплаты</FormLabel>
                    {showPayment ? (
                      <RadioGroup
                        aria-label="payment"
                        name="payment"
                        value={valuePayment}
                        onChange={handleChangePayment}
                      >
                        <FormControlLabel
                          value="onGet"
                          control={<Radio />}
                          label="Оплата при получении"
                        />
                        <FormControlLabel
                          value="onLine"
                          control={<Radio />}
                          label="Оплата картой онлайн"
                        />
                      </RadioGroup>
                    ) : (
                      <Typography variant="body2">
                        Уточнтите способ оплаты у менеджера
                      </Typography>
                    )}
                  </FormControl>
                </Box>
              </Box>
              <Box className={classes.beforeButtonBox}>
                {showOnlinePayment && (
                  <Button variant="contained">Оплатить Картой</Button>
                )}
              </Box>
            </React.Fragment>
          ) : (
            <Box className={classes.accountButtons}>
              <Button variant="contained" color="primary" onClick={goLogin}>
                Войти в Личный Кабинет
              </Button>
              <Button variant="contained" color="primary" onClick={goRegister}>
                Создать Личный Кабинет
              </Button>
            </Box>
          )}
        </AnimationPage>
      </TabPanel>
    </div>
  );
}

interface INoUserAddressProps {
  user: IUser;
  handlePhone(event: React.ChangeEvent<HTMLInputElement>): void;
  handleCity(event: React.ChangeEvent<HTMLInputElement>): void;
  handleAddress(event: React.ChangeEvent<HTMLInputElement>): void;
  handleChangeDelivery(event: React.ChangeEvent<HTMLInputElement>): void;
  valueDelivery: string;
  showFields: boolean;
  handleChangeAddress(event: React.ChangeEvent<HTMLInputElement>): void;
  valueAddress: number;
  handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>): void;
  emailError: boolean;
  phoneError: boolean;
}
function NoUserAddress({
  user,
  handlePhone,
  handleCity,
  handleAddress,
  valueDelivery,
  handleChangeDelivery,
  showFields,
  handleChangeEmail,
  handleChangeAddress,
  valueAddress,
  emailError,
  phoneError,
}: INoUserAddressProps) {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.addressRadios}>
        <FormControl id="delivery" component="fieldset">
          <FormLabel component="legend">Способ Доставки</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={valueDelivery}
            onChange={handleChangeDelivery}
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
        helperText="Поле обязательно"
        required
        onChange={handlePhone}
        defaultValue={user.phone || ''}
        error={phoneError}
      />
      <TextField
        className={classes.addressField}
        label="Email"
        id="email2"
        placeholder="Email"
        variant="outlined"
        size="small"
        fullWidth
        helperText="Поле обязательно"
        required
        onChange={handleChangeEmail}
        defaultValue={user.email || ''}
        error={emailError}
        type="email"
      />
      {showFields && (
        <React.Fragment>
          {Object.keys(user).length ? (
            <div>
              <AddressesListing
                user={user}
                handleChangeAddress={handleChangeAddress}
                valueAddress={valueAddress}
              />
            </div>
          ) : (
            <div>
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
            </div>
          )}
        </React.Fragment>
      )}
    </Box>
  );
}
