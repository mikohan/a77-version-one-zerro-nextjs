import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import {} from '~/interfaces/product';
import { Typography } from '@material-ui/core';
import { IMake } from '~/interfaces/IMake';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cards: {
      margin: '0 auto',
      padding: theme.spacing(2),
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(125px, 1fr))`,
      gridAutoRows: `minmax(100px, auto)`,
      gridGap: theme.spacing(2), // padding for cards in the content area
      marginBottom: theme.spacing(5),
    },
    card: {
      boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
      borderRadius: '2px',
      background: theme.palette.background.paper,
    },
    cardContent: {
      padding: theme.spacing(3),
    },
    cardImageLink: {
      display: 'block',
    },
    productName: {
      fontSize: '1.1rem',
      color: theme.palette.text.secondary,
    },
  })
);

interface IProps {
  cars: any;
}

export default function ShopCarGrid({ cars }: IProps) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.cards}>
          {cars.map((item: IMake) => {
            return (
              <div key={item.id} className={classes.card}>
                <Link href={`/car/${item.slug}`}>
                  <a className={classes.cardImageLink}>
                    <div className={classes.cardContent}>
                      <Typography className={classes.productName} variant="h6">
                        {item.name.toUpperCase()}
                      </Typography>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}
