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
    width: 350,
  },
  fullList: {
    width: 'auto',
  },
});

interface IProps {
  openDrawer: boolean;
  toggleDrawer(): void;
}

export default function SwipeableTemporaryDrawer({
  openDrawer,
  toggleDrawer,
}: IProps) {
  const classes = useStyles();

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          open={openDrawer}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          <List className={classes.list}>
            <ListItem>some content </ListItem>
          </List>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
