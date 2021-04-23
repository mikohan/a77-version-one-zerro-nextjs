import { ICar, ICategory } from '~/interfaces';
import React from 'react';
import { Hidden, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper, Typography, Chip } from '@material-ui/core';
import LeftSidePopularWidget from '~/components/product/LeftSidePopularWidet';

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Link from 'next/link';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 240,
      flexGrow: 1,
      maxWidth: 400,
    },
    container: {
      display: 'grid',
      gridTemplateColumns: '3fr 1fr 1fr 1fr',
    },
    firstItem: {
      gridColumn: '1/5',
    },
    item: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    catTitle: {
      minWidth: '100%',
      textAlign: 'center',
      paddingBottom: theme.spacing(1),
    },
    chip: {
      marginBottom: theme.spacing(0.3),
      marginRight: theme.spacing(1),
      fontSize: '0.7rem',
    },
  })
);

interface IProps {
  categories?: ICategory[];
  model: ICar;
}

interface IPropsBox extends IProps {
  catName: string;
  catSlug: string;
}
function handleDelete() {}

const CatBox = ({ categories, catName, model, catSlug }: IPropsBox) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography className={classes.catTitle} variant="subtitle1">
        <Link href={url.category(model.make.slug, model.slug, catSlug)}>
          <a>{catName}</a>
        </Link>
      </Typography>
      {categories?.map((item: ICategory) => (
        <Link href={url.category(model.make.slug, model.slug, item.slug)}>
          <a>
            <Chip
              className={classes.chip}
              variant="outlined"
              key={item.id}
              size="small"
              label={item.name}
              clickable
            />
          </a>
        </Link>
      ))}
    </React.Fragment>
  );
};

export default function ModelCategoryBlock(props: IProps) {
  const { categories, model } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid className={classes.container} item xs={12}>
        {categories?.map((item: ICategory) => (
          <div key={item.id} className={classes.item}>
            <CatBox
              catName={item.name}
              catSlug={item.slug}
              categories={item.children}
              model={model}
            />
          </div>
        ))}
      </Grid>
    </React.Fragment>
  );
}
