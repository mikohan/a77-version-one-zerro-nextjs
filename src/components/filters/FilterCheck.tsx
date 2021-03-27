import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

interface IProps {
  options: {
    items: any[];
  };
}

export default function CheckboxLabels({ options }: IProps) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        display: 'flex',
        flexDirection: 'column',
      },
      box: {},
      checkbox: {
        transform: `scale(0.85)`,
      },
      label: {},
    })
  );
  const classes = useStyles();
  const initState: { [key: string]: boolean } = {};
  const [state, setState] = React.useState(initState);

  const handleChange = (itemName: string) => {
    setState({ ...state, [itemName]: !state[itemName] });
  };

  /* const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { */
  /*   if (event.target.checked && !value.includes(event.target.value)) { */
  /*     updateValue([...value, event.target.value]); */
  /*   } */
  /*   if (!event.target.checked && value.includes(event.target.value)) { */
  /*     updateValue(value.filter((x) => x !== event.target.value)); */
  /*   } */
  /* }; */

  const items = options.items;

  return (
    <FormGroup className={classes.container}>
      {items.map((item: any) => {
        return (
          <Box className={classes.box} key={item.name}>
            <FormControlLabel
              className={classes.label}
              control={
                <Checkbox
                  className={classes.checkbox}
                  checked={state[item.name] || false}
                  onChange={() => handleChange(item.name)}
                  name={item.name}
                  color="primary"
                />
              }
              label={<Typography variant="body2">{item.name}</Typography>}
            />
          </Box>
        );
      })}
    </FormGroup>
  );
}
