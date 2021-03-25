import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => (event: React.MouseEvent) => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer}>Opne</Button>
        <SwipeableDrawer
          open={openDrawer}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          some list
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
