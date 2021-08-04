import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import { IBread } from '~/interfaces';
import { capitalize } from '~/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'start',
      flexWrap: 'wrap',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    item: {
      padding: '0 0.5rem',
      background: theme.palette.action.hover,
      borderRadius: '0.1rem',
      color: theme.palette.text.secondary,
      fontSize: '0.8rem',
      transition: '0.5s',
      '&:hover': {
        background: theme.palette.action.selected,
      },
    },
    slash: {
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
      color: theme.palette.grey[400],
    },
  })
);

interface IProps {
  breadCrumbs: IBread[];
}

export default function BreadCrumbs({ breadCrumbs }: IProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.container}>
        {breadCrumbs.map((item: IBread, i: number) => (
          <React.Fragment key={item.path}>
            <Box component="span">
              <Link href={item.path}>
                <a>
                  <Typography className={classes.item} variant="body2">
                    {capitalize(item.name)}
                  </Typography>
                </a>
              </Link>
            </Box>
            {breadCrumbs.length !== i + 1 && (
              <Box className={classes.slash} component="span">
                /
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </React.Fragment>
  );
}
