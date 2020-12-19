// react
import React from 'react';
// third-party
import AppLink from '~/services/AppLink';
// application
import Link from 'next/link';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import url from '~/services/url';
import { getCategoryParents } from '~/services/utils';
import { ICategoryFilter } from '~/interfaces/filters';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

interface Props {
  options: ICategoryFilter;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    currentItemCategory: {
      color: theme.palette.primary.main,
    },
    childrenItems: {
      color: theme.palette.primary.light,
      marginLeft: 20,
    },
    arrowSize: {
      fontSize: '1.2rem',
    },
  })
);

function FilterCategory(props: Props) {
  const { options } = props;
  const classes = useStyles();
  const router = useRouter();

  const { make, model } = router.query;

  return (
    <div>
      <List>
        {options.value && (
          <ListItem>
            <AppLink href={url.products(make, model)}>
              <ListItemIcon>
                <ArrowBackIosIcon className={classes.arrowSize} />
                <Typography variant="body2">All Categories</Typography>
                <Typography variant="body2">
                  {make} {model}
                </Typography>
              </ListItemIcon>
            </AppLink>
          </ListItem>
        )}
        {options.items.map((item) => (
          <React.Fragment key={item.id}>
            {getCategoryParents(item).map((parent) => (
              <ListItem key={parent.id}>
                <div style={{ fontWeight: 'bold' }}>
                  <AppLink href={url.category(parent)}>
                    <ListItemIcon>
                      <ArrowBackIosIcon className={classes.arrowSize} />
                      <Typography variant="body2">
                        {parent.name + ' ' + 'Parent'}
                      </Typography>
                    </ListItemIcon>
                  </AppLink>
                </div>
              </ListItem>
            ))}
            <ListItem className={classes.currentItemCategory}>
              <AppLink href={url.category(item, make, model)}>
                <Typography variant="body2">{item.name}</Typography>
              </AppLink>
            </ListItem>
            {item.count === 0
              ? ''
              : item.children?.map((child) => (
                  <ListItem className={classes.childrenItems} key={child.id}>
                    <AppLink href={url.category(child, make, model)}>
                      <Typography variant="body2">{child.name}</Typography>
                    </AppLink>
                  </ListItem>
                ))}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default FilterCategory;
