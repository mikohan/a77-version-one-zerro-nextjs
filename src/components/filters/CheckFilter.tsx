import React from 'react';
import { Checkbox, FormControlLabel, Button } from '@material-ui/core';

export default function CheckFilter() {
  const handleChange = () => {
    console.log('change');
  };
  return (
    <form method="get">
      <Checkbox
        onChange={handleChange}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        value="pmc"
        name="brand"
      />
      <Checkbox
        onChange={handleChange}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        value="mobis"
        name="brand"
      />
      <FormControlLabel
        control={<Checkbox onChange={handleChange} value="checkedH" />}
        label="Custom icon"
      />
      <Button type="submit" variant="outlined" color="secondary">
        Submit
      </Button>
    </form>
  );
}
