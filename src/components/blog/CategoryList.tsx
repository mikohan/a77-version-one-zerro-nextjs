import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Badge, Typography } from '@material-ui/core';
import { IBlogCategory } from '~/interfaces';
import Link from 'next/link';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    listItem: {
      '&:hover': {
        background: theme.palette.action.hover,
      },
    },
    bagePosition: {
      top: '25%',
      right: '5%',
      background: theme.palette.secondary.light,
      fontWeight: 600,
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

interface IProps {
  categories: IBlogCategory[];
}

export default function SimpleList({ categories }: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {categories.map((category: IBlogCategory) => (
          <Link key={category.slug} href={url.blogCategory(category.slug)}>
            <a>
              <Badge
                classes={{
                  anchorOriginTopRightCircle: classes.bagePosition,
                }}
                badgeContent={category.postsCount || 3}
                color="primary"
                overlap="circle"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <ListItem className={classes.listItem} key={category.slug}>
                  <Typography variant="body1">{category.name}</Typography>
                </ListItem>
              </Badge>
            </a>
          </Link>
        ))}
      </List>
    </div>
  );
}
