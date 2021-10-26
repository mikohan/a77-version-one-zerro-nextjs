import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';

import { IRangeFilter, IRangeFilterValue } from '~/interfaces/filters';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '90%',
    },
    numbersContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      paddingBottom: theme.spacing(1),
    },
    label: {
      fontSize: '0.65rem',
      fontWeight: 500,
    },
  })
);
interface IProps {
  options: IRangeFilter;
  value: IRangeFilterValue;
  onChangeValue?: (event: {
    filter: IRangeFilter;
    value: IRangeFilterValue;
  }) => void;
  handleChange(e: object, filterName: string, filterItem: string): void;
}

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider({ options, handleChange }: IProps) {
  const classes = useStyles();
  const [localValue, setLocalValue] = React.useState<number[]>(options.value);

  const handleLocalChange = (event: any, newValue: number | number[]) => {
    setLocalValue(newValue as number[]);
  };
  const handleRemoteChange = (
    event: object,
    newValue: number | number[]
  ): void => {
    if (Array.isArray(newValue)) {
      const newV = newValue.join('-');
      handleChange(event, options.slug, newV);
    }
  };

  return (
    <div className={classes.root}>
      <Slider
        classes={{ valueLabel: classes.label }}
        min={options.min}
        max={options.max}
        value={localValue}
        onChange={handleLocalChange}
        onChangeCommitted={(e, newValue) => handleRemoteChange(e, newValue)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaLabel={() => 'Minimum distance shift'}
        getAriaValueText={valuetext}
      />
      <Box className={classes.numbersContainer}>
        <Typography variant="body2">
          &#8381; {localValue[0]} - &#8381; {localValue[1]}
        </Typography>
      </Box>
    </div>
  );
}

