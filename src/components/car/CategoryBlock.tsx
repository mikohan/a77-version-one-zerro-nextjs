import { ICategory } from '~/interfaces';
import React from 'react';
import { Hidden, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import LeftSidePopularWidget from '~/components/product/LeftSidePopularWidet';

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 240,
      flexGrow: 1,
      maxWidth: 400,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    item: {
      border: '1px solid pink',
    },
  })
);

interface IProps {
  categories?: ICategory[];
}

const TreeViewComponent = ({ categories }: IProps) => {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {categories?.map((item: ICategory) => (
        <React.Fragment key={item.id}>
          <TreeItem nodeId={item.slug} label={item.name}>
            {item.children?.map((chil: ICategory) => (
              <TreeItem key={chil.id} nodeId={chil.slug} label={chil.name} />
            ))}
          </TreeItem>
        </React.Fragment>
      ))}
    </TreeView>
  );
};

const CatBox = ({ categories }: IProps) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {categories?.map((item: ICategory) => (
        <Box key={item.id}>{item.name}</Box>
      ))}
    </React.Fragment>
  );
};

export default function ModelShopList(props: IProps) {
  const { categories } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid className={classes.container} item xs={12}>
        {categories?.map((item: ICategory) => (
          <div className={classes.item}>
            <CatBox categories={item.children} />
          </div>
        ))}
      </Grid>
    </React.Fragment>
  );
}
