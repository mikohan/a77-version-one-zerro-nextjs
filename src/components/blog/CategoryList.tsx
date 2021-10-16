import React from 'react';
import Link from 'next/link';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

import { IBlogCategory } from '~/interfaces';
import url from '~/services/url';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    categoriesPaper: {
      minHeight: theme.spacing(15),
      padding: theme.spacing(5),
      marginBottom: theme.spacing(2),
    },
    listItem: {
      minWidth: theme.spacing(25),
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

interface IProps extends IAllCatsProps {
  categories: IBlogCategory[];
}

interface IAllCatsProps {
  totalPosts: number;
}

function AllCats({ totalPosts }: IAllCatsProps) {
  const classes = useStyles();
  const slug = 'vse-kategorii';
  const name = 'Все категории';
  return (
    <Link key={slug} href={url.blogCategory(slug, 1)}>
      <a>
        <Badge
          classes={{
            anchorOriginTopRightCircle: classes.bagePosition,
          }}
          badgeContent={totalPosts}
          color="primary"
          overlap="circle"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <ListItem className={classes.listItem} key={slug}>
            <Typography variant="body1">{name}</Typography>
          </ListItem>
        </Badge>
      </a>
    </Link>
  );
}

export default function SimpleList({ categories, totalPosts }: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.categoriesPaper}>
        <List className={classes.list}>
          <AllCats totalPosts={totalPosts} />
          {categories.map((category: IBlogCategory) => (
            <Link key={category.slug} href={url.blogCategory(category.slug, 1)}>
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
      </Paper>
    </div>
  );
}
