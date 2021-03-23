import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IProductElasticHitsSecond } from '~/interfaces/product';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      height: '100%',
    },
    cards: {},
  })
);

interface IProps {
  products: IProductElasticHitsSecond[];
}

export default function ShopGrid({}: IProps) {
  const classes = useStyles();
  return <div className={classes.cards}></div>;
}
