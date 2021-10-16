import React from 'react';
import Image from 'next/image';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

interface IProps {
  size: string;
  text: string;
  carImg: string;
}

export default function MouseOverPopover({ size, text, carImg }: IProps) {
  let avSize = 3;
  let fontSize = '';
  if (size === 'lg') {
    avSize = 5.6;
    fontSize = '1.26rem';
  } else if (size === 'md') {
    avSize = 4.5;
    fontSize = '1.1rem';
  } else if (size === 'sm') {
    avSize = 4.5;
    fontSize = '0.95rem';
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
        /* borderColor: theme.palette.action.disabled, */
        background: theme.palette.action.disabled,
        '&:hover': {
          borderColor: theme.palette.action.active,
        },
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
        backgroundColor: 'transparent',
      },
      text: {
        color: theme.palette.background.paper,
        fontSize: fontSize,
      },
    })
  );
  const classes = useStyles();

  return (
    <Box className={classes.outerBox}>
      <Box className={classes.carBox}>
        <Avatar className={classes.avatar}>
          <Image src={carImg} alt={text} width={100} height={100} />
        </Avatar>
        <Typography className={classes.text} variant="body2">
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
