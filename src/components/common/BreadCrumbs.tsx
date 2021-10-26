import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import { IBread } from '~/interfaces';
import { capitalize } from '~/utils';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      flexWrap: 'wrap',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    item: {
      padding: '0 0.5rem',
      background: theme.palette.action.hover,
      borderRadius: '0.1rem',
      color: theme.palette.primary.main,
      fontSize: '0.8rem',
      transition: '0.5s',
      '&:hover': {
        background: theme.palette.action.selected,
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
      },
    },
    slash: {
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
      color: theme.palette.grey[400],
    },
    cursor: {
      cursor: 'pointer',
      fontSize: '1.1rem',
    },
  })
);

interface IProps {
  breadCrumbs: IBread[];
}

export default function BreadCrumbs({ breadCrumbs }: IProps) {
  const classes = useStyles();
  const router = useRouter();
  /* const last_element = breadCrumbs[breadCrumbs.length - 1]; */
  const goBack = () => {
    router.back();
  };

  return (
    <React.Fragment>
      <Box className={classes.container}>
        <Tooltip title="Назад">
          <ArrowBackIcon onClick={goBack} className={classes.cursor} />
        </Tooltip>
        <Box className={classes.slash} component="span">
          /
        </Box>
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

