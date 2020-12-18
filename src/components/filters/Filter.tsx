import * as React from 'react';
import { Box } from '@material-ui/core';
import { ArrowRoundedDown12x7Svg } from '~/svg';

import { IFilter } from '~/interfaces/filters';
import FilterCategory from '~/components/filters/FilterCategory';

interface IProps {
  filter: IFilter;
  value: string;
}

export default function Filter({ filter, value }: IProps) {
  return (
    <Box>
      <Box>
        <button type="button" className="filter__title">
          {filter.name}
          <span className="filter__arrow">
            <ArrowRoundedDown12x7Svg />
          </span>
        </button>
      </Box>
      {filter.type === 'category' && <FilterCategory options={filter} />}
    </Box>
  );
}
