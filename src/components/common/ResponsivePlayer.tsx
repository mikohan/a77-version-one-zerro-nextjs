import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import ReactPlayer from 'react-player';

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

interface IProps {
  videoUrl: string;
}

const Player = ({ videoUrl }: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.playerWrapper}>
      <ReactPlayer
        url={videoUrl}
        className={classes.reactPlayer}
        controls={false}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Player;
