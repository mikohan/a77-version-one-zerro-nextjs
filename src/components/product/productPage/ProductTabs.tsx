import React from 'react';
import parser from 'html-react-parser';

import { makeStyles, Theme } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NoSsr from '@material-ui/core/NoSsr';

import { IProduct } from '~/interfaces';

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
    backgroundColor: theme.palette.background.paper,
  },
  tabBar: {
    background: theme.palette.action.selected,
  },
}));

interface IProps {
  product: IProduct;
}

export default function SimpleTabs({ product }: IProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <NoSsr>
        <Tabs
          className={classes.tabBar}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="Описание" {...a11yProps(0)} />
          <Tab label="Характеристики" {...a11yProps(1)} />
          <Tab label="Отзывы" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {product.description ? (
            <Box>{parser(product.description)}</Box>
          ) : (
            <Box>
              <Typography variant="h6" color="secondary">
                Probably needs to set some default description
              </Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cum
              nostrum aliquam minima natus, officiis molestiae labore. Odio odit
              earum cumque voluptatem, quisquam eveniet blanditiis alias
              distinctio ipsam, quod et!
            </Box>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          Характеристики
        </TabPanel>
        <TabPanel value={value} index={2}>
          Отзывы
        </TabPanel>
      </NoSsr>
    </div>
  );
}
