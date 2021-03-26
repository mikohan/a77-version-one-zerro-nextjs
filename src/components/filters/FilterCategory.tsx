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
      <List>
        {options.value && (
          <ListItem>
            <AppLink href={url.products(make, model)}>
              <ListItemIcon>
                <ArrowBackIosIcon className={classes.arrowSize} />
                <Typography variant="body2">
                  Все Категории {carModel && carModel.toUpperCase()}
                </Typography>
              </ListItemIcon>
            </AppLink>
          </ListItem>
        )}
        {options.items.map((item) => (
          <React.Fragment key={item.id}>
            {getCategoryParents(item).map((parent, i) => {
              console.log('Parent in filter', parent);
              return (
                <ListItem key={i}>
                  <div style={{ fontWeight: 'bold' }}>
                    <AppLink href={url.category(parent, make, model)}>
                      <ListItemIcon>
                        <ArrowBackIosIcon className={classes.arrowSize} />
                        <Typography variant="body2">{parent.name}</Typography>
                      </ListItemIcon>
                    </AppLink>
                  </div>
                </ListItem>
              );
            })}
            <ListItem className={classes.currentItemCategory}>
              <AppLink href={url.category(make, model, item.slug)}>
                <Typography variant="body2">{item.name}</Typography>
              </AppLink>
            </ListItem>
            {item.count === 0
              ? ''
              : item.children?.map((child) => (
                  <ListItem className={classes.childrenItems} key={child.id}>
                    <AppLink href={url.category(make, model, child.slug)}>
                      <Typography variant="body2">{child.name}</Typography>
                    </AppLink>
                  </ListItem>
                ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default FilterCategory;
