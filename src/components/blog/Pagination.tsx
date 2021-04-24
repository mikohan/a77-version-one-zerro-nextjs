import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';
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
  categorySlug: string;
}

export default function BasicPagination({
  count,
  categorySlug = 'vse-kategorii',
  curPage = 1,
}: IProps) {
  const classes = useStyles();
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  function handleChange(event: any, value: number) {
    setPage(value);
    router.push({
      pathname: url.blogCategory(categorySlug, value),
    });
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
