import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { ICheckFilterValue } from '~/interfaces/filters';
import { booleanToRus, conditionToRus } from '~/helpers';

// Helper functions need to refactor

interface IProps {
  options: {
    items: any[];
    slug: string;
    name: string;
    value?: string[];
  };
  handleChange(e: object, filterName: string, itemName: string): void;
  value: ICheckFilterValue;
}

export default function CheckboxLabels({
  options,
  value,
  handleChange,
}: IProps) {
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
  if (options.value?.length) {
    for (const key of value) {
      initialValues[key] = true;
    }
  }

  const fName = options.slug;
  const items = options.items;

  return (
    <FormGroup className={classes.container}>
      {items.map((item: any) => {
        let iName = '';
        let lName = '';

        if (typeof item.name !== 'string') {
          iName = item.name.toString();
          if (options.slug === 'has_photo') {
            lName = booleanToRus(iName);
          }
        } else {
          iName = item.name.toLowerCase();
          lName = iName;
        }
        if (options.slug === 'condition') {
          lName = conditionToRus(iName);
        }
        return (
          <Box className={classes.box} key={item.name}>
            <FormControlLabel
              control={
                <Checkbox
                  classes={{ root: classes.input }}
                  className={classes.checkbox}
                  checked={initialValues[iName] || false}
                  onChange={(e) => handleChange(e, fName, iName)}
                  name={iName}
                  color="primary"
                />
              }
              label={
                <Box className={classes.name}>
                  <Typography variant="body2" className={classes.itemName}>
                    {lName.toUpperCase()}
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
