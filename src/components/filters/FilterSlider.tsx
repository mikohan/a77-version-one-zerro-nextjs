import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { IRangeFilter, IRangeFilterValue } from '~/interfaces/filters';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
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
}

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider({ options, value, onChangeValue }: IProps) {
  const classes = useStyles();
  console.log(options.value);
  const [localValue, setLocalValue] = React.useState<number[]>(options.value);

  const handleChange = (event: any, newValue: number | number[]) => {
    setLocalValue(newValue as number[]);
  };

  return (
    <div className={classes.root}>
      <Slider
        classes={{ valueLabel: classes.label }}
        min={options.min}
        max={options.max}
        value={localValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
      <Box className={classes.numbersContainer}>
        <Typography variant="body2">
          &#8381; {options.min} - &#8381; {options.max}
        </Typography>
      </Box>
    </div>
  );
}
