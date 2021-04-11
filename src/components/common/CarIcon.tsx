import React from 'react';
import { Avatar, Chip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CarIcon from '@material-ui/icons/LocalShipping';
import DoneIcon from '@material-ui/icons/Done';

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
}

export default function MouseOverPopover({ text }: IProps) {
  const classes = useStyles();

  return (
    <div>
      <Chip
        avatar={
          <Avatar src="/images/local/carsAvatar/hd-78.png">
            <CarIcon />
          </Avatar>
        }
        label={text}
        clickable
        color="default"
        onDelete={() => {}}
        deleteIcon={<DoneIcon />}
        variant="outlined"
      />
    </div>
  );
}
