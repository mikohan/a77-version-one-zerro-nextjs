// react
import React from 'react';
// third-party
import AppLink from '~/services/AppLink';
// application
import Link from 'next/link';

import url from '~/services/url';
import { getCategoryParents } from '~/services/utils';
import { ICategoryFilter } from '~/interfaces/filters';

interface Props {
  options: ICategoryFilter;
}

function FilterCategory(props: Props) {
  const { options } = props;

  return (
    <div>
      <ul>
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
                <span>Icon</span>

                <AppLink href={url.category(parent)}>
                  {parent.name + ' ' + 'Parent'}
                </AppLink>
              </li>
            ))}
            <li>
              <AppLink href={url.category(item)}>{item.name}</AppLink>
            </li>
            {item.count === 0
              ? ''
              : item.children?.map((child) => (
                  <li key={child.id}>
                    <Link href={url.category(child)}>{child.name}</Link>
                  </li>
                ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default FilterCategory;
