import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 350,
    },
    fullList: {
      width: 'auto',
    },
    closeBox: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: theme.spacing(3),
      color: theme.palette.grey[500],
    },
    closeIcon: {
      fontSize: '2rem',
    },
  })
);

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
          <Box className={classes.closeBox}>
            <HighlightOffIcon className={classes.closeIcon} />
          </Box>
          <List className={classes.list}>
            <ListItem>
              <ListItemText>TEXT</ListItemText>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
