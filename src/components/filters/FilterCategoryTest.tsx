// react
import React from 'react';
// third-party
import AppLink from '~/services/AppLink';
// application
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import url from '~/services/url';
import { getCategoryParents } from '~/services/utils';
import { ICategoryFilter } from '~/interfaces/filters';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { asString } from '~/helpers';
import { IState } from '~/interfaces/IState';
import { getParentCategory } from '~/services/utils';
import Link from 'next/link';

interface Props {
  options: ICategoryFilter;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
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
  const currentCar = useSelector((state: IState) => {
    if (state.shop.currentCar) {
      return state.shop.currentCar.slug;
    } else {
      return undefined;
    }
  });

  const { make, model } = router.query;
  const carMake = asString(make as string);
  const carModel = asString(model as string);

  return (
    <Box className={classes.root}>
      <List dense>
        {options.path?.map((item: ICategory) => (
          <Link href={item.path}>
            <ListItem key={item.id}>{item.name}</ListItem>
          </Link>
        ))}
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
