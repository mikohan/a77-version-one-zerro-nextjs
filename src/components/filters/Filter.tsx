import * as React from 'react';
import { Box } from '@material-ui/core';

import styles from './styles.module.css';
import { IFilter } from '~/interfaces/filters';

interface IProps {
  filter: IFilter;
  value: string;
}

export default function Filter({ filter, value }: IProps) {
  return (
    <Box>
      <p>{filter.name}</p>
      <p>{filter.type}</p>
    </Box>
  );
}
