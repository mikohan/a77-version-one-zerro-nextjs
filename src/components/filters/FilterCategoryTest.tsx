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
    listItemIcon: {
      minWidth: '1.5rem',
    },
    currentItemCategory: {
      color: theme.palette.primary.main,
    },
    childrenItems: {
      color: theme.palette.primary.light,
      marginLeft: 20,
    },
    arrowSize: {
      fontSize: '1rem',
    },
    activeCat: {
      fontWeight: 600,
    },
    arrowBack: {
      fontSize: '1em',
    },
    count: {
      fontSize: '0.9rem',
      color: theme.palette.text.disabled,
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
              <Typography variant="body1">{item.name}</Typography>
            </ListItem>
          </AppLink>
        ))}
        <ListItem>
          <Typography variant="body1" className={classes.activeCat}>
            {capitalize(lastCat?.name)}
          </Typography>
        </ListItem>
      </List>
      <List dense>
        {options.items.map((item: any) => (
          <ListItem key={item.id} className={classes.currentItemCategory}>
            <AppLink href={url.category(make, model, item.slug)}>
              <Typography variant="body1">
                {item.name}{' '}
                <Box className={classes.count} component="span">
                  ({item.count})
                </Box>
              </Typography>
            </AppLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default FilterCategory;
