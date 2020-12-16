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
  console.log(options);

  return (
    <div className="filter-category">
      <ul className="filter-category__list">
        {options.value && (
          <li className="filter-category__item filter-category__item--parent">
            <span className="filter-category__arrow">Icon</span>
            <Link href={url.products()}>
              Herre goes name of products or categoreis
            </Link>
          </li>
        )}
        {options.items.map((item) => (
          <React.Fragment key={item.id}>
            {getCategoryParents(item).map((parent) => (
              <li
                key={parent.id}
                className="filter-category__item filter-category__item--parent"
              >
                {console.log(parent)}
                <span className="filter-category__arrow">Icon</span>

                <Link href={url.category(parent)}>{parent.name}</Link>
              </li>
            ))}
            <li
              className={classNames('filter-category__item', {
                'filter-category__item--current': options.value,
              })}
            >
              <Link href={url.category(item)}>{item.name}</Link>
            </li>
            {item.count === 0
              ? ''
              : item.children?.map((child) => (
                  <li
                    key={child.id}
                    className="filter-category__item filter-category__item--child"
                  >
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
