import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import { IBread } from '~/interfaces';
import { capitalize } from '~/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    item: {
      padding: '0.2rem 0.5rem',
      background: theme.palette.grey[200],
      borderRadius: '2px',
      color: theme.palette.grey[500],
      transition: '0.5s',
      '&:hover': {
        backgiwund: theme.palette.grey[200],
        color: theme.palette.grey[600],
        fontWeight: 500,
      },
    },
    slash: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
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
      <Box className={classes.container} display="flex" justifyContent="start">
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