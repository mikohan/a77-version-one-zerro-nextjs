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

interface Props {
  options: ICategoryFilter;
}

function FilterCategory(props: Props) {
  const { options } = props;

  return (
    <div>
      <List>
        {options.value && (
          <li>
            <div style={{ color: 'red', marginBottom: '19px' }}>
              <span>Icon</span>
              <AppLink href={url.products()}>
                Herre goes name of products or categoreis
              </AppLink>
            </div>
          </li>
        )}
        {options.items.map((item) => (
          <React.Fragment key={item.id}>
            {getCategoryParents(item).map((parent) => (
              <li key={parent.id}>
                <div style={{ fontWeight: 'bold' }}>
                  <AppLink href={url.category(parent)}>
                    <ArrowBackIosIcon /> {parent.name + ' ' + 'Parent'}
                  </AppLink>
                </div>
              </li>
            ))}
            <li>
              <AppLink href={url.category(item)}>
                {item.name + ' Currnet Category'}
              </AppLink>
            </li>
            {item.count === 0
              ? ''
              : item.children?.map((child) => (
                  <li key={child.id}>
                    <div style={{ marginLeft: '20px' }}>
                      <AppLink href={url.category(child)}>
                        {child.name + ' Child Category'}
                      </AppLink>
                    </div>
                  </li>
                ))}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default FilterCategory;
