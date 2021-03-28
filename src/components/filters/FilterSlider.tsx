import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { IAggregationBucket } from '~/interfaces';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

interface IProps {
  options: {
    min: number;
    max: number;
  };
}

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider({ options }: IProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  console.log(options);

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Temperature range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
