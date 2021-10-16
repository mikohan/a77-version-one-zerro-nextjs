import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
      cursor: 'pointer',
    },
  })
);

interface IProps {
  openDrawer: boolean;
  toggleDrawer(): void;
  filters?: any; //IFilters[];
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
            <HighlightOffIcon
              className={classes.closeIcon}
              onClick={toggleDrawer}
            />
          </Box>
          <List className={classes.list}>
            <ListItem>
              <ListItemText>Here will go filtes</ListItemText>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
