import * as React from 'react';
import { Box } from '@material-ui/core';

import { IFilter } from '~/interfaces/filters';
import FilterCategory from '~/components/filters/FilterCategory';

interface IProps {
  filter: IFilter;
  value: string;
}

export default function Filter({ filter, value }: IProps) {
  return (
    <Box>
      {filter.type === 'category' && <FilterCategory options={filter} />}
    </Box>
  );
}
