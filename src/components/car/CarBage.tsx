import React from 'react';
import { Avatar, Chip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CarIcon from '@material-ui/icons/LocalShipping';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
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
    <div>
      <Chip
        avatar={
          <Avatar src={carImg}>
            <CarIcon />
          </Avatar>
        }
        label={text}
        color="default"
        variant="outlined"
      />
    </div>
  );
}
