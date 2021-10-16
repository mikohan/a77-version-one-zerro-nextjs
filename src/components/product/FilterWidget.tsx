import { createStyles, makeStyles, Theme } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { IFilter } from '~/interfaces/filters';
import Filter from '~/components/filters/Filter';

interface IProps {
  filters?: IFilter[];
  handleChange?(e: object, fName: string, itemName: string): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    root: {
      width: '100%',
    },
  })
);

export default function FiltersWidget(props: IProps) {
  const { filters } = props;
  const handleChange = props.handleChange!;
  const classes = useStyles();

  // Needs to get filters here probably from store Redux

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box className={classes.root}>
          {filters ? (
            filters.map((filter: IFilter) => (
              <Filter
                key={filter.name}
                filter={filter}
                value=""
                handleChange={handleChange}
              />
            ))
          ) : (
            <span>No filters passed out</span>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
