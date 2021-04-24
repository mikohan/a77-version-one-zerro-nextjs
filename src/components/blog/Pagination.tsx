import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);
interface IProps {
  count: number;
  curPage: number;
}

export default function BasicPagination({ count, curPage = 1 }: IProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination count={count} page={curPage} color="secondary" />
    </div>
  );
}
