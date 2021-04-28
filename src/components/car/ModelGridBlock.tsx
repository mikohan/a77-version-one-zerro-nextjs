import React from 'react';
import { ICar } from '~/interfaces/ICar';
import { IBread } from '~/interfaces/IBread';
import { capitalize } from '~/utils';
import { Box, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    blockPaper: {
      padding: theme.spacing(2),
    },
    blockGrid: {
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
);
interface ICarProps {
  models: ICar[];
}

export default function ModelBlockGrid(props: ICarProps) {
  const classes = useStyles();
  const { models } = props;

  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: 'Name', path: `/car/${models[0].make.slug}` },
  ];

  return (
    <React.Fragment>
      <Box>
        {models &&
          models.map((model: ICar) => (
            <React.Fragment>
              <Typography variant="h6">{model.model}</Typography>
            </React.Fragment>
          ))}
      </Box>
    </React.Fragment>
  );
}
