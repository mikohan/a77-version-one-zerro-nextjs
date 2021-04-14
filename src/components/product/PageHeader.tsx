import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IBread } from '~/interfaces';
import BreadCrumbs from '~/components/common/BreadCrumbs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageHeader: {
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
    breadsContainer: {
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    productCount: {
      marginLeft: theme.spacing(2),
      color: theme.palette.grey[500],
    },
  })
);

interface IProps {
  header: string;
  breads: IBread[];
  count?: string | number;
}

export default function PageHeader({ header, breads, count }: IProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container>
        <Grid className={classes.breadsContainer} item xs={12}>
          <BreadCrumbs breadCrumbs={breads} />
        </Grid>
        <Grid className={classes.pageHeader} item xs={12}>
          <Typography variant="h1">
            {header}
            <Typography
              className={classes.productCount}
              component="span"
              variant="body1"
            >
              {count && `${count} Запчастей на складе)`}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
