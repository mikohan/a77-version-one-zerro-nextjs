import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IBread } from '~/interfaces';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { capitalize } from '~/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    chipContainer: {
      position: 'absolute',
      top: 20,
      left: -5,
    },
    chip: {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
      color: fade(theme.palette.background.default, 0.8),
      textAlign: 'center',
      lineHeight: 1,
      display: 'inline-block',
      height: '1.4rem',
      fontWeight: 600,
      fontSize: '0.8rem',
      position: 'relative',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(0.5),
      zIndex: 0,
      '&:before': {
        zIndex: -1,
        position: 'absolute',
        content: '""',
        display: 'block',
        background: fade(theme.palette.primary.main, 0.7),
        left: '3.5px',
        right: '3.5px',
        top: 0,
        bottom: 0,
        transform: `skewX(-20deg)`,
        borderRadius: '2.5px',
        transformOrigin: 'center',
      },
    },
  })
);

interface IProps {
  car?: string;
}

export default function ChipContainer({ car }: IProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.container} display="flex" justifyContent="start">
        <div className={classes.chipContainer}>
          <div className={classes.chip}>Подходит {car?.toUpperCase()}</div>
        </div>
      </Box>
    </React.Fragment>
  );
}
