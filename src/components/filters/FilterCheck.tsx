import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    checkedB: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const brands = [
    { id: 1, name: 'Ssang Shing', slug: 'ssang-shing' },
    { id: 2, name: 'YPR', slug: 'ypr' },
    { id: 3, name: 'Stellox', slug: 'stellox' },
  ];

  return (
    <FormGroup row>
      {brands.map((brand: any) => (
        <FormControlLabel
          key={brand.id}
          control={
            <Checkbox
              checked={state.checkedB}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Primary"
        />
      ))}
    </FormGroup>
  );
}
