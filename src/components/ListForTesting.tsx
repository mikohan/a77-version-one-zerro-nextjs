import React from 'react';
import Link from 'next/link';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';

import { IMake } from '~/interfaces/IMake';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface IListItemProps {
  makes: IMake[];
}

export default function SimpleList({ makes }: IListItemProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {makes.map((make: IMake) => (
          <Link key={make.id} href={`/car/${make.slug}`}>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={make.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}
