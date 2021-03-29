// react
import React from 'react';
// third-party
import AppLink from '~/services/AppLink';
// application
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import url from '~/services/url';
import { ICategoryFilter } from '~/interfaces/filters';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { asString } from '~/helpers';
import { ICategory } from '~/interfaces';
import { capitalize } from '~/utils';

interface Props {
  options: ICategoryFilter;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    listItemParent: {},
    catList: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    listItemIcon: {
      minWidth: '1.5rem',
    },
    activeCat: {
      fontWeight: 600,
    },
    arrowBack: {
      fontSize: '.9em',
    },
    nameCount: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    categoryName: {
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    count: {
      color: theme.palette.text.secondary,
      fontSize: '0.75rem',
    },
  })
);

function FilterCategory(props: Props) {
  const { options } = props;
  const classes = useStyles();
  const router = useRouter();

  const { make, model } = router.query;
  const carMake = asString(make as string);
  const carModel = asString(model as string);
  const parents = options.path ? options.path : [];
  const lastCat = parents[parents.length - 1];

  const exceptLast = [];
  for (let i = 0; i < parents.length; i++) {
    exceptLast.push(parents[i]);
    if (i === parents.length - 2) {
      break;
    }
  }
  return (
    <Box className={classes.root}>
      <List dense>
        {exceptLast.map((item: ICategory) => (
          <AppLink
            key={item.id}
            href={url.category(carMake, carModel, item.slug)}
          >
            <ListItem className={classes.listItemParent} key={item.id}>
              <ListItemIcon className={classes.listItemIcon}>
                <ArrowBackIosIcon className={classes.arrowBack} />
              </ListItemIcon>
              <Typography className={classes.categoryName} variant="body2">
                {item.name}
              </Typography>
            </ListItem>
          </AppLink>
        ))}
        <ListItem>
          <Typography variant="body2" className={classes.activeCat}>
            {capitalize(lastCat?.name)}
          </Typography>
        </ListItem>
      </List>
      <List dense className={classes.catList}>
        {options.items.map((item: any) => (
          <ListItem disableGutters key={item.id}>
            <AppLink
              className={classes.nameCount}
              href={url.category(make, model, item.slug)}
            >
              <Typography className={classes.categoryName} variant="body2">
                {capitalize(item.name)}
              </Typography>
              <Typography variant="body2" className={classes.count}>
                {item.count}
              </Typography>
            </AppLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default FilterCategory;