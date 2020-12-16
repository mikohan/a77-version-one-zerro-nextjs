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

interface Props {
  options: ICategoryFilter;
}

function FilterCategory(props: Props) {
  const { options } = props;

  return (
    <div>
      <List>
        {options.value && (
          <ListItem>
            <AppLink href={url.products()}>
              <ListItemIcon>
                <ArrowBackIosIcon />
                <Typography variant="body2">All Categories</Typography>
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
                      <ArrowBackIosIcon />
                      <Typography variant="body2">
                        {parent.name + ' ' + 'Parent'}
                      </Typography>
                    </ListItemIcon>
                  </AppLink>
                </div>
              </ListItem>
            ))}
            <ListItem className={classes.currentItemCategory}>
              <AppLink href={url.category(item)}>
                <Typography variant="body2">{item.name}</Typography>
              </AppLink>
            </ListItem>
            {item.count === 0
              ? ''
              : item.children?.map((child) => (
                  <ListItem key={child.id}>
                    <div style={{ marginLeft: '20px' }}>
                      <AppLink href={url.category(child)}>
                        <Typography variant="body2">{child.name}</Typography>
                      </AppLink>
                    </div>
                  </ListItem>
                ))}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default FilterCategory;
