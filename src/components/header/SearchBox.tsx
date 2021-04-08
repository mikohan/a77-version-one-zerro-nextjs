/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, IconButton, Typography, Chip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import CarIcon from '@material-ui/icons/DriveEtaRounded';
import DoneIcon from '@material-ui/icons/Done';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { capitalize } from '~/utils';
import { ICar } from '~/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      background: theme.palette.background.paper,
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    autocomlete: {
      width: '100%',
    },
    clearIcon: {
      color: theme.palette.text.disabled,
      fontSize: '90%',
      cursor: 'pointer',
    },
    input: {
      fontSize: '1.1rem',
      /* color: theme.palette.text.secondary, */
      '&::placeholder': {
        fontSize: '1rem',
      },
    },
  })
);

interface IOptions {
  title: string;
  year: number;
  firstLetter: string;
}

export default function Grouped() {
  const classes = useStyles();
  const initState: IOptions[] = [];
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(initState);
  const [error, setError] = useState(false);
  const [helper, setHelper] = useState('');
  const router = useRouter();
  const currentCar: ICar | undefined = useSelector(
    (state: IState) => state.shop.currentCar
  );
  let chipLabel: string = 'Select car';
  if (currentCar && Object.keys(currentCar).length) {
    chipLabel = `${capitalize(currentCar.make.name)} ${capitalize(
      currentCar.model
    )}`;
  }

  function handleChange(
    event: React.ChangeEvent<{}>,
    value: IOptions | null
  ): void {}
  function handleInput(event: React.ChangeEvent<{}>, value: string): void {
    const opts: IOptions[] = top100Films.map((option) => {
      const firstLetter = option.title[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
      };
    });
    setOptions(opts);
    setError(false);
    setHelper('');
  }
  function handleClose(event: React.ChangeEvent<{}>) {
    setOptions(initState);
  }
  function handleSubmit() {
    if (inputValue !== '') {
      router.push({
        pathname: '/search',
        query: {
          search: inputValue,
        },
      });
    } else {
      setError(true);
      setHelper('Поле не может быть пустым');
    }
  }
  function handleEnter(event: React.KeyboardEvent<{}>) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }
  function handleClear() {
    setInputValue('');
  }
  function handleBlur() {
    setError(false);
    setHelper('');
  }
  const textField = (params: any) => (
    <TextField
      {...params}
      autoFocus
      margin="dense"
      placeholder="Номер или название"
      error={error}
      helperText={helper}
      label={<Typography variant="body2">По номеру или по Названию</Typography>}
      variant="outlined"
      name="search"
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleBlur}
      onFocus={handleBlur}
      InputProps={{
        classes: {
          input: classes.input,
        },
        endAdornment: (
          <InputAdornment position="end">
            <ClearIcon className={classes.clearIcon} onClick={handleClear} />
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.container} item xs={3}>
        <Chip
          icon={<CarIcon />}
          label={chipLabel}
          clickable
          color="default"
          onDelete={() => {}}
          deleteIcon={<DoneIcon />}
          variant="outlined"
        />
      </Grid>
      <Grid className={classes.container} item xs={6}>
        <Autocomplete
          onKeyUp={handleEnter}
          inputValue={inputValue}
          fullWidth
          onClose={handleClose}
          onInputChange={handleInput}
          onChange={handleChange}
          className={classes.autocomlete}
          id="grouped-demo"
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          size="small"
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => textField(params)}
        />
        <IconButton onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
      </Grid>
      <Grid className={classes.container} item xs={3}>
        Content
      </Grid>
    </Grid>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title:
      'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];
