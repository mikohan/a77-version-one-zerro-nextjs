import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import FilterCategory from '~/components/filters/FilterCategory';
import { capitalize } from '~/utils';
import FilterCheck from '~/components/filters/FilterCheck';
import FilterSlider from '~/components/filters/FilterSlider';
import { IFilter } from '~/interfaces/filters';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100%',
      borderBottom: `1px solid ${theme.palette.divider}`,
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
  handleChange(e: object, filterName: string, itemName: string): void;
}

function Filter(props: IProps) {
  const classes = useStyles();
  const { filter, value, handleChange } = props;
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  // Start messing around here

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
          {filter.type === 'category' && <FilterCategory options={filter} />}
          {filter.type === 'check' && (
            <FilterCheck
              value={filter.value}
              options={filter}
              handleChange={handleChange}
            />
          )}
          {filter.type === 'range' && (
            <FilterSlider
              value={[400, 5000]}
              options={filter}
              handleChange={handleChange}
            />
          )}
        </Collapse>
      </Box>
    </React.Fragment>
  );
}

export default React.memo(Filter);
