import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import url from '~/services/url';

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
  search: string;
}

export default function BasicPagination({
  count,
  search,
  curPage = 1,
}: IProps) {
  const classes = useStyles();
  const router = useRouter();
  function handleChange(event: any, value: number) {
    router.push(url.blogSearch(search, value));
  }
  return (
    <div className={classes.root}>
      <Pagination
        count={count}
        page={curPage}
        color="secondary"
        onChange={handleChange}
      />
    </div>
  );
}
