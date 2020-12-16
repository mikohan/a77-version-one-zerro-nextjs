// react
import React from 'react';
// third-party
import classNames from 'classnames';
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
            <span>Icon</span>
            <Link href={url.category()}>
              <div style={{ color: 'red', marginBottom: '19px' }}>
                Herre goes name of products or categoreis
              </div>
            </Link>
          </li>
        )}
        {options.items.map((item) => (
          <React.Fragment key={item.id}>
            {getCategoryParents(item).map((parent) => (
              <li key={parent.id}>
                <span>Icon</span>

                <Link href={url.category(parent)}>
                  {parent.name + ' ' + 'Parent'}
                </Link>
              </li>
            ))}
            <li>
              <Link href={url.category(item)}>{item.name}</Link>
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
