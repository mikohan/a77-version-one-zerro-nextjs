import React, { useCallback } from 'react';

import { Button } from '@material-ui/core';
import { ArrowRoundedDown12x7Svg } from '~/svg';

import { IFilter } from '~/interfaces/filters';
import FilterCategory from '~/components/filters/FilterCategory';
import Collapse, { ICollapseRenderFn } from '~/components/shared/Collapse';

interface IProps {
  filter: IFilter;
  value: string;
}

type RenderFilterFn = ICollapseRenderFn<HTMLDivElement, HTMLDivElement>;

function Filter(props: IProps) {
  const { filter, value } = props;
  //    const shopSetFilterValue = useShopSetFilterValueThunk();
  /* const shopSetFilterValue = */

  /* const handleValueChange = useCallback(({ filter, value }: ChangeValueEvent) => { */
  /*   shopSetFilterValue( */
  /*       filter.slug, */
  /*       isDefaultFilterValue(filter, value) ? null : serializeFilterValue(filter, value), */
  /*   ).then(); */
  /* }, [shopSetFilterValue]); */

  const renderFn: RenderFilterFn = ({ toggle, setItemRef, setContentRef }) => (
    <div className="filter filter--opened" ref={setItemRef}>
      <Button
        startIcon={<ArrowRoundedDown12x7Svg />}
        type="button"
        className="filter__title"
        onClick={toggle}
      >
        {filter.name}
      </Button>
      <div className="filter__body" ref={setContentRef}>
        <div className="filter__container">
          {filter.type === 'category' && <FilterCategory options={filter} />}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Collapse toggleClass="filter--opened" render={renderFn} />
    </div>
  );
}

export default React.memo(Filter);
