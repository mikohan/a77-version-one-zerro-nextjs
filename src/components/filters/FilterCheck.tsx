import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

interface IProps {
  options: {
    items: any[];
  };
}

export default function CheckboxLabels({ options }: IProps) {
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
    <FormGroup row>
      {items.map((item: any) => {
        return (
          <Box key={item.name}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state[item.name] || false}
                  onChange={() => handleChange(item.name)}
                  name={item.name}
                  color="primary"
                />
              }
              label={item.name}
            />
            <br />
          </Box>
        );
      })}
    </FormGroup>
  );
}
