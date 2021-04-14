import ReactPlayer from 'react-player';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    playerWrapper: {
      position: 'relative',
      paddingTop: '56.25%',
    },
    reactPlayer: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
  })
);

const Player = () => {
  const classes = useStyles();
  return (
    <div className={classes.playerWrapper}>
      <ReactPlayer
        url="https://youtu.be/3eLrINg3O2Q"
        className={classes.reactPlayer}
        controls={false}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Player;
