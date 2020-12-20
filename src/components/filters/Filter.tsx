/*
Plan for filters
1. Needs to store filters values to store redux
2. Needs to store filters to url parameters
3. Restore filters and values from url paramters
4. Handle somehow filters changing
5. Add build filters logic to products, probably will maki it on server side Means API
6. Category filter needs to be collapsed by 5 Items(dont know how to implement this)
7. Add count to category filter items ? or not?
Thats it for filtering
 */

import React, { useCallback } from 'react';

import { Button } from '@material-ui/core';
import { ArrowRoundedDown12x7Svg } from '~/svg';

import { IFilter } from '~/interfaces/filters';
import FilterCategory from '~/components/filters/FilterCategory';
import { ICollapseRenderFn } from '~/components/shared/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Collapse } from '@material-ui/core';

interface IProps {
  filter: IFilter;
  value: string;
}

type RenderFilterFn = ICollapseRenderFn<HTMLDivElement, HTMLDivElement>;

function Filter(props: IProps) {
  const { filter, value } = props;
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  //    const shopSetFilterValue = useShopSetFilterValueThunk();
  /* const shopSetFilterValue = */

  /* const handleValueChange = useCallback(({ filter, value }: ChangeValueEvent) => { */
  /*   shopSetFilterValue( */
  /*       filter.slug, */
  /*       isDefaultFilterValue(filter, value) ? null : serializeFilterValue(filter, value), */
  /*   ).then(); */
  /* }, [shopSetFilterValue]); */

  const chevronFn = (collapsed: boolean) => {
    if (collapsed) {
      return (
        <IconButton color="primary" aria-label="add to shopping cart">
          <KeyboardArrowUpIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton color="primary" aria-label="add to shopping cart">
          <KeyboardArrowDownIcon />
        </IconButton>
      );
    }
  };

  const renderFn: RenderFilterFn = ({ toggle, setItemRef, setContentRef }) => (
    <div className="filter filter--opened" ref={setItemRef}>
      <span onClick={toggle}>{chevronFn(true)}</span>
      <div className="filter__body" ref={setContentRef}>
        <div className="filter__container">
          {filter.type === 'category' && <FilterCategory options={filter} />}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={handleClick}
        color="primary"
        aria-label="add to shopping cart"
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {filter.type === 'category' && <FilterCategory options={filter} />}
      </Collapse>
    </div>
  );

  /* return ( */
  /*   <div> */
  /*     <Collapse toggleClass="filter--opened" render={renderFn} /> */
  /*   </div> */
  /* ); */
}

export default React.memo(Filter);
