import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
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

interface IProps {}

export default function MouseOverPopover() {
  const classes = useStyles();

  return (
    <div>
      <CarIcon />
    </div>
  );
}
