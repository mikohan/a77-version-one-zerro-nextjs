import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { IRangeFilter, IRangeFilterValue } from '~/interfaces/filters';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { shopSetFilterVlue } from '~/store/shop/shopActions';

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
  const [localValue, setLocalValue] = React.useState<number[]>(options.value);
  const filters: any = useSelector((state: IState) => state.shopNew.filters);
  const dispatch = useDispatch();

  const handleDispatch = (event: any, newValue: number | number[]) => {
    const nv = newValue as number[];
    const string = nv.join(',');
    dispatch(shopSetFilterVlue('price', string));
  };

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
        onChangeCommitted={handleDispatch}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
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
