import React from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface IProps {
  size: string;
  text: string;
  carImg: string;
}

export default function MouseOverPopover({ size, text, carImg }: IProps) {
  let avSize = 3;
  if (size === 'lg') {
    avSize = 7;
  } else if (size === 'md') {
    avSize = 4.5;
  } else if (size === 'sm') {
    avSize = 3;
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      outerBox: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      },
      carBox: {
        display: 'flex',
        justifyContent: 'flex-start',
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: '5px',
        alignItems: 'center',
        width: '95%',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
      avatar: {
        marginRight: theme.spacing(1.5),
        height: theme.spacing(avSize),
        width: theme.spacing(avSize),
        backgroundColor: theme.palette.background.default,
      },
      text: {
        color: theme.palette.text.secondary,
      },
    })
  );
  const classes = useStyles();

  return (
    <Box className={classes.outerBox}>
      <Box className={classes.carBox}>
        <Avatar className={classes.avatar} src={carImg}></Avatar>
        <Typography className={classes.text} variant="body2">
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
