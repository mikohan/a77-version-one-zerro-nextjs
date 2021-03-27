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

import React from 'react';

import { IFilter } from '~/interfaces/filters';
import FilterCategoryTest from '~/components/filters/FilterCategoryTest';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Collapse, Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { capitalize } from '~/utils';
import FilterCheck from '~/components/filters/FilterCheck';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100%',
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    filterName: {
      fontWeight: 600,
    },
    iconBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    collapseButton: {},
  })
);

interface IProps {
  filter: IFilter;
  value: string;
}

function Filter(props: IProps) {
  const classes = useStyles();
  const { filter, value } = props;
  const [open, setOpen] = React.useState(true);
  const handleValueChange = () => {};

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Box className={classes.iconBox}>
          <Typography className={classes.filterName} variant="body1">
            {capitalize(filter.name)}
          </Typography>
          <IconButton
            className={classes.collapseButton}
            onClick={handleClick}
            color="primary"
            aria-label="add to shopping cart"
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {filter.type === 'category' && (
            <FilterCategoryTest options={filter} />
          )}
          {filter.type === 'check' && <FilterCheck options={filter} />}
        </Collapse>
      </Box>
    </React.Fragment>
  );
}

export default React.memo(Filter);
