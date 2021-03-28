import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { capitalize } from '~/utils';
import { ICheckFilterValue } from '~/interfaces/filters';
import { useRouter } from 'next/router';

interface IProps {
  options: {
    items: any[];
  };
  value: ICheckFilterValue;
}

export default function CheckboxLabels({ options, value }: IProps) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        display: 'flex',
        flexDirection: 'column',
      },
      box: {
        '& > label, & > label span:nth-child(2)': {
          width: '100%',
        },
      },
      checkbox: {
        transform: `scale(0.85)`,
      },
      name: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      },
      itemName: {},
      itemCount: {
        color: theme.palette.text.secondary,
        fontSize: '0.75rem',
      },
      input: {
        height: '2rem',
        width: '2rem',
        boxSizing: 'border-box',
      },
    })
  );
  const classes = useStyles();

  const initialValues: { [key: string]: boolean } = {};
  if (value.length) {
    for (const key of value) {
      initialValues[key] = true;
    }
  }

  const [state, setState] = React.useState(initialValues);
  const router = useRouter();

  const handleChange = (itemName: string) => {
    setState({ ...state, [itemName]: !state[itemName] });
    router.push({
      pathname: '/car/hyundai/porter1/zapchasti',
      query: {
        filter_brand: ['angara', 'mobis'],
      },
    });
  };

  const items = options.items;

  return (
    <FormGroup className={classes.container}>
      {items.map((item: any) => {
        return (
          <Box className={classes.box} key={item.name}>
            <FormControlLabel
              control={
                <Checkbox
                  classes={{ root: classes.input }}
                  className={classes.checkbox}
                  checked={state[item.name] || false}
                  onChange={() => handleChange(item.name)}
                  name={item.name}
                  color="primary"
                />
              }
              label={
                <Box className={classes.name}>
                  <Typography variant="body2" className={classes.itemName}>
                    {capitalize(item.name)}
                  </Typography>
                  <Typography variant="body2" className={classes.itemCount}>
                    {item.count}
                  </Typography>
                </Box>
              }
            />
          </Box>
        );
      })}
    </FormGroup>
  );
}
