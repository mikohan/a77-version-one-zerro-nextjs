import React from 'react';
import { Avatar, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CarIcon from '@material-ui/icons/LocalShipping';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carBox: {
      width: '95%',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  })
);

interface IProps {
  text: string;
  carImg: string;
}

export default function MouseOverPopover({ text, carImg }: IProps) {
  const classes = useStyles();

  return (
    <Box className={classes.carBox}>
      <Avatar src={carImg}>
        <CarIcon />
      </Avatar>
    </Box>
  );
}
