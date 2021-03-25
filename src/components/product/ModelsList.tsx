import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ICar } from '~/interfaces';
import url from '~/services/url';
import Link from 'next/link';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 650,
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    listHeader: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    count: {
      fontSize: '.8rem',
      color: theme.palette.text.disabled,
    },
  })
);

interface IProps {
  models: ICar[];
}

export default function ModelsList({ models }: IProps) {
  const classes = useStyles();
  const make = models[0].make.name.toUpperCase();

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem button style={style} key={index}>
        <Link href={url.model(models[index].make.slug, models[index].slug)}>
          <ListItemText>
            {models[index].model.toUpperCase()}{' '}
            <Box className={classes.count} component="span">
              {' '}
              ({models[index].count})
            </Box>
          </ListItemText>
        </Link>
      </ListItem>
    );
  }

  function InnerList({ models }: IProps) {
    return (
      <div className={classes.root}>
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={600}
              width={width}
              itemSize={30}
              itemCount={models.length}
            >
              {renderRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    );
  }
  return (
    <React.Fragment>
      <Box className={classes.listHeader}>МОДЕЛИ {make}</Box>
      <Box>
        <InnerList models={models} />
      </Box>
    </React.Fragment>
  );
}
