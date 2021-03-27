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
import FilterCategory from '~/components/filters/FilterCategory';
import FilterCategoryTest from '~/components/filters/FilterCategoryTest';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Collapse, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100%',
    },
    nested: {},
    iconBox: {
      display: 'flex',
      justifyItems 'end',
      border: '1px solid grey',
      position: 'relative',
      right: 10,
    },
    collapseButton: {
      height: '0.8rem',
      paddingTop: theme.spacing(1),
    },
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

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.iconBox}>
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
        {filter.type === 'category' && <FilterCategoryTest options={filter} />}
      </Collapse>
    </Box>
  );
}

export default React.memo(Filter);
