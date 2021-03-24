import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IBread } from '~/interfaces';
import BreadCrumbs from '~/components/common/BreadCrumbs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageHeader: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(2),
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
  count: string | number;
}

export default function PageHeader({ header, breads, count }: IProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid className={classes.pageHeader} item xs={12}>
        <Typography variant="h1">
          {header}
          <Typography
            className={classes.productCount}
            component="span"
            variant="body2"
          >
            ({count} Запчастей на складе)
          </Typography>
        </Typography>
        <BreadCrumbs breadCrumbs={breads} />
      </Grid>
    </React.Fragment>
  );
}
