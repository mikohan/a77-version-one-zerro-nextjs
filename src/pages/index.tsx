import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { GetStaticProps } from 'next';
import { IMake } from '~/interfaces/IMake';
import { getMakes } from '~/endpoints/carsEndpoint';
import Animation from '~/components/common/AnimationPage';
import { Box, Typography, Container } from '@material-ui/core';
import { containerMaxWidth } from '~/config';
import CarChioserLong from '~/components/car/CarChoiserLong';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBlock: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      marginTop: theme.spacing(3),
      minHeight: '20rem',
      widht: '100%',
      background: theme.palette.background.paper,
    },
    contentContainer: {
      paddingTop: theme.spacing(3),
      display: 'grid',
      [theme.breakpoints.down('xxl')]: {
        gridTemplateColumns: `repeat(auto-fill, minmax(90%, 1fr))`,
      },

      /* [theme.breakpoints.up('lg')]: { */
      /*   gridTemplateColumns: `repeat(auto-fill, minmax(40%, 1fr))`, */
      /*   gridGap: theme.spacing(3), */
      /* }, */
      '&> div': {
        minHeight: '20rem',
        padding: theme.spacing(3),
        background: theme.palette.background.paper,
        marginBottom: theme.spacing(3),
      },
    },
    blockTitle: {
      marginBottom: '2rem',
    },
  })
);

interface IHomeProps {
  makes: IMake[];
}

export default function Home(props: IHomeProps) {
  const classes = useStyles();

  const { makes } = props;

  return (
    <Animation>
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.topBlock}>
            <Grid container>
              <Grid item xs={12}>
                <CarChioserLong />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Container maxWidth={containerMaxWidth}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.contentContainer}>
              <div>
                <Typography variant="h6" className={classes.blockTitle}>
                  Расходники
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat non odio reprehenderit illo facilis doloremque odit
                  esse est nemo alias assumenda eaque deserunt inventore quas
                  hic sunt quae nam, mollitia, dolorum, quia maiores eveniet?
                  Unde enim laborum veritatis possimus, odit vel maxime commodi,
                  architecto recusandae inventore ipsam, saepe sit provident
                  reiciendis accusamus rerum molestias voluptatem at dolor atque
                  iure. Voluptas?
                </Typography>
              </div>
              <div>
                <Typography variant="h6" className={classes.blockTitle}>
                  Машины
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat non odio reprehenderit illo facilis doloremque odit
                  esse est nemo alias assumenda eaque deserunt inventore quas
                  hic sunt quae nam, mollitia, dolorum, quia maiores eveniet?
                  Unde enim laborum veritatis possimus, odit vel maxime commodi,
                  architecto recusandae inventore ipsam, saepe sit provident
                  reiciendis accusamus rerum molestias voluptatem at dolor atque
                  iure. Voluptas?
                </Typography>
              </div>
              <div>
                <Typography variant="h6" className={classes.blockTitle}>
                  Популярные товары
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat non odio reprehenderit illo facilis doloremque odit
                  esse est nemo alias assumenda eaque deserunt inventore quas
                  hic sunt quae nam, mollitia, dolorum, quia maiores eveniet?
                  Unde enim laborum veritatis possimus, odit vel maxime commodi,
                  architecto recusandae inventore ipsam, saepe sit provident
                  reiciendis accusamus rerum molestias voluptatem at dolor atque
                  iure. Voluptas?
                </Typography>
              </div>
              <div>
                <Typography variant="h6" className={classes.blockTitle}>
                  Блог
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat non odio reprehenderit illo facilis doloremque odit
                  esse est nemo alias assumenda eaque deserunt inventore quas
                  hic sunt quae nam, mollitia, dolorum, quia maiores eveniet?
                  Unde enim laborum veritatis possimus, odit vel maxime commodi,
                  architecto recusandae inventore ipsam, saepe sit provident
                  reiciendis accusamus rerum molestias voluptatem at dolor atque
                  iure. Voluptas?
                </Typography>
              </div>
              <div>
                <Typography variant="h6" className={classes.blockTitle}>
                  Videos
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat non odio reprehenderit illo facilis doloremque odit
                  esse est nemo alias assumenda eaque deserunt inventore quas
                  hic sunt quae nam, mollitia, dolorum, quia maiores eveniet?
                  Unde enim laborum veritatis possimus, odit vel maxime commodi,
                  architecto recusandae inventore ipsam, saepe sit provident
                  reiciendis accusamus rerum molestias voluptatem at dolor atque
                  iure. Voluptas?
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Animation>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const makes: IMake[] = await getMakes();

  return { props: { makes } };
};
