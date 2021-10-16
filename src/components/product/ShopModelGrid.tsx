import Link from 'next/link';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { ICar } from '~/interfaces/ICar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cards: {
      margin: '0 auto',
      padding: theme.spacing(2),
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(125px, 1fr))`,
      gridAutoRows: `minmax(200px, auto)`,
      gridGap: theme.spacing(2), // padding for cards in the content area
      marginBottom: theme.spacing(5),
    },
    card: {
      boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
      borderRadius: '2px',
      background: 'white',
    },
    cardContent: {
      padding: theme.spacing(3),
    },
    cardImageLink: {
      display: 'block',
    },
    productName: {
      fontSize: '1.1rem',
      color: theme.palette.grey[700],
    },
    productSku: {
      paddingLeft: theme.spacing(2),
      color: theme.palette.grey[500],
    },
  })
);

interface IProps {
  cars: ICar[];
}

export default function ShopCarGrid({ cars }: IProps) {
  const classes = useStyles();
  return (
    <div className={classes.cards}>
      {cars.map((item: ICar) => {
        return (
          <div key={item.id} className={classes.card}>
            <Link href={`/car/${item.make.slug}/${item.slug}`}>
              <a className={classes.cardImageLink}>
                <div className={classes.cardContent}>
                  <Typography className={classes.productName} variant="h6">
                    {item.model}
                  </Typography>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
