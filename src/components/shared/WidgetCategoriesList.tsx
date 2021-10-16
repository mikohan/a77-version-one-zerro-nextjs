import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import AppLink from '~/services/AppLink';
import Collapse, { ICollapseRenderFnData } from '~/components/shared/Collapse';
import url from '~/services/url';
import { ArrowDown9x6Svg } from '~/svg';
import { ICategory } from '~/interfaces/category';

type RenderFnData = ICollapseRenderFnData<HTMLLIElement, HTMLUListElement>;
type RenderFn = (data: RenderFnData, category: ICategory) => React.ReactNode;

interface Props {
  categories: ICategory[];
}

function WidgetCategoriesList(props: Props) {
  const { categories } = props;
  const { make, model } = { make: 'hyundai', model: 'porter-2' };

  const renderCategory: RenderFn = (
    { toggle, setItemRef, setContentRef },
    category: ICategory
  ) => {
    const subs: ICategory[] = category.children || [];

    return (
      <ListItem ref={setItemRef}>
        <AppLink href={url.category(category, make, model)}>
          {
            category.name
            // Big Category
          }
        </AppLink>

        {subs.length > 0 && (
          <List>
            {subs.slice(0, subs.length > 6 ? 5 : 6).map((sub, subIdx) => (
              <ListItem key={subIdx}>
                <AppLink href={url.category(sub, make, model)}>
                  {
                    sub.name // Sub Category
                  }
                </AppLink>
              </ListItem>
            ))}
          </List>
        )}

        {subs.length > 6 && (
          <React.Fragment>
            <List ref={setContentRef}>
              {subs.slice(5).map((sub, subIdx) => (
                <ListItem key={subIdx}>
                  <AppLink href={url.category(sub, make, model)}>
                    {
                      sub.name // Hidden Sub Category
                    }
                  </AppLink>
                </ListItem>
              ))}
            </List>
            <button type="button" onClick={toggle}>
              <span>Show More</span>
              <span>Show Less</span>
              <span>
                <ArrowDown9x6Svg />
              </span>
            </button>
          </React.Fragment>
        )}
      </ListItem>
    );
  };

  return (
    <div>
      <div>
        <List className="widget-categories-list__root">
          {categories.map((category, categoryIdx) => (
            <Collapse<HTMLLIElement, HTMLUListElement>
              key={categoryIdx}
              toggleClass="widget-categories-list--open"
              render={(args) => renderCategory(args, category)}
            />
          ))}
        </List>
      </div>
    </div>
  );
}

export default WidgetCategoriesList;
