import dynamic from 'next/dynamic';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const ReactPlayer = dynamic(() => import('react-player'));

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

// I am a comment !!
// I am another comment

const myFunction = () => {
  console.log('Here is my awesome function!');
};
myFunction();

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
