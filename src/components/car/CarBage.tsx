import React from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CarIcon from '@material-ui/icons/LocalShipping';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerBox: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      border: '1px solid pink',
    },
    carBox: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '95%',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    avatar: {
      height: theme.spacing(7),
      width: theme.spacing(7),
      backgroundColor: theme.palette.action.hover,
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
    <Box className={classes.outerBox}>
      <Box className={classes.carBox}>
        <Avatar className={classes.avatar} src={carImg}></Avatar>
        <Typography variant="h6">Text here</Typography>
      </Box>
    </Box>
  );
}
