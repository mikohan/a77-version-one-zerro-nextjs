import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { GetStaticProps } from 'next';
import { IMake } from '~/interfaces/IMake';
import { getMakes, getVehiclesByPriority } from '~/endpoints/carsEndpoint';
import Animation from '~/components/common/AnimationPage';
import { Box, Typography, Container } from '@material-ui/core';
import { containerMaxWidth } from '~/config';
import CarChioserLong from '~/components/car/CarChoiserLong';
import { getPosts } from '~/endpoints/blogEndpoint';
import { ICar, IPost } from '~/interfaces';
import BlogGrid from '~/components/car/BlogGrid';
import ModelBlockGrid from '~/components/car/ModelGridHomePageBlock';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    h1: {
      textAlign: 'center',
      marginBottom: theme.spacing(5),
      color:
        theme.palette.type === 'light'
          ? theme.palette.background.default
          : '#fafafa',
      fontSize: '2rem',
      fontWeight: 700,
    },
    topBlock: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      marginTop: theme.spacing(3),
      minHeight: '20rem',
    },
    contentContainer: {
      paddingTop: theme.spacing(3),
      display: 'grid',
      [theme.breakpoints.down('xxl')]: {
        gridTemplateColumns: `repeat(auto-fill, minmax(90%, 1fr))`,
      },
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
    carChoiser: {
      backgroundImage: `url("/images/local/defaultParts500.jpg")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  })
);

interface IHomeProps {
  models: ICar[];
  posts: IPost[];
}

export default function Home(props: IHomeProps) {
  const classes = useStyles();

  const { posts, models } = props;

  return (
    <Animation>
      <Grid container>
        <Grid item xs={12} className={classes.carChoiser}>
          <Box className={classes.topBlock}>
            <Container maxWidth={containerMaxWidth}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.h1} variant="h1">
                    Запчасти для грузовиков и комерческого транспорта
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ opacity: 0.9 }}>
                  <CarChioserLong size="lg" />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
      <Container maxWidth={containerMaxWidth}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.contentContainer}>
              <div>
                <Typography variant="h6" className={classes.blockTitle}>
                  Популярные Машины
                </Typography>
                <Box>
                  <ModelBlockGrid models={models} />
                </Box>
              </div>
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
                  <BlogGrid posts={posts} />
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
  const posts = await getPosts(20);
  const models = await getVehiclesByPriority(3);

  return { props: { posts, models } };
};
