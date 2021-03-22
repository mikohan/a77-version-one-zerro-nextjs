import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import MLink from '@material-ui/core/Link';
import { List, ListItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_PAGE } from '~/store/types';
import { IState } from '~/interfaces/IState';
import { Hidden } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Image from 'next/image';
import gray from '@material-ui/core/colors/grey';
import { createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      color: theme.palette.grey[50],
      minHeight: '20rem',
      background: theme.palette.grey[800],
      '& dt, & dd': {
        fontStyle: 'normal',
        margin: 0,
      },
    },
    root: {
      flexGrow: 1,
    },
    wrapper: {
      '& > div': {
        /* background: 'rgba(250,250,250,.3)', */
        padding: theme.spacing(5),
      },
      '& > div:nth-child(odd)': {
        /* background: 'rgba(221,221,221,.3)', */
      },
      display: 'grid',
      gridTemplateColumns: '3fr 1fr 1fr 2fr',
      gridAutoRows: '100%',
      gridGap: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
      },
    },
    cellGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: theme.spacing(1),
      '& >div': {
        border: '1px solid black',
      },
    },
    address: {
      '& > div': {
        fontStyle: 'normal',
      },
      '& dd': {
        fontWeight: 600,
      },
      '& dt': {
        color: theme.palette.grey[300],
      },
    },
    sectionHeader: {
      fontStyle: 'normal',
    },
    sectionSubheader: {
      fontStyle: 'normal',
      color: theme.palette.grey[300],
      margin: '1rem 0 1rem 0',
    },
    bottomLine: {
      background: theme.palette.grey[900],
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: '3rem',
    },
    payments: {
      '& img': {
        marginRight: theme.spacing(1),
        width: theme.spacing(6),
        height: theme.spacing(6),
      },
    },
  })
);

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <div>
            <address className={classes.address}>
              <Typography
                className={classes.sectionHeader}
                variant="h5"
              >{`\{CONTACT US\} `}</Typography>
              <Typography className={classes.sectionSubheader} variant="body1">
                Hi, we are always open for cooperation and suggestions, contact
                us in one of the ways below:
              </Typography>
              <div className={classes.cellGrid}>
                <dl>
                  <dt>PHONE NUMBER</dt>
                  <dd>{`\{CHANGE TO DB CONTENT\}`}</dd>
                </dl>
                <dl>
                  <dt>OUR LOCATION</dt>
                  <dd>{`\{CHANGE TO DB CONTENT\}`}</dd>
                </dl>
                <dl>
                  <dt>EMAIL ADDRESS</dt>
                  <dd>{`\{CHANGE TO DB CONTENT\}`}</dd>
                </dl>
                <dl>
                  <dt>WORKING HOURS</dt>
                  <dd>{`\{CHANGE TO DB CONTENT\}`}</dd>
                </dl>
              </div>
            </address>
          </div>
          <Hidden smDown>
            <div>
              <Typography
                className={classes.sectionHeader}
                variant="h5"
              >{`\{INFORMATION\} `}</Typography>
              <List>
                <ListItem>ABOUT US</ListItem>
                <ListItem>PRIVATE POLICY</ListItem>
                <ListItem>ORDER</ListItem>
                <ListItem>DELIVERY</ListItem>
                <ListItem>RETURNS</ListItem>
                <ListItem>SITE MAP</ListItem>
              </List>
            </div>
            <div>
              <Typography
                className={classes.sectionHeader}
                variant="h5"
              >{`\{INFORMATION\} `}</Typography>
              <List>
                <ListItem>ABOUT US</ListItem>
                <ListItem>PRIVATE POLICY</ListItem>
                <ListItem>ORDER</ListItem>
                <ListItem>DELIVERY</ListItem>
                <ListItem>RETURNS</ListItem>
                <ListItem>SITE MAP</ListItem>
              </List>
            </div>
            <div>
              <Typography
                className={classes.sectionHeader}
                variant="h5"
              >{`\{INFORMATION\} `}</Typography>
              <Typography className={classes.sectionSubheader} variant="body1">
                Hi, we are always open for cooperation and suggestions, contact
                us in one of the ways below:
              </Typography>
            </div>
          </Hidden>
        </div>
        <div className={classes.bottomLine}>
          <div className={classes.payments}>
            <img src="/images/local/visa.svg" alt="MasterCard" />
            <img src="/images/local/mastercard.svg" alt="MasterCard" />
            <img src="/images/local/generic.svg" alt="MasterCard" />
            <img src="/images/local/mir.svg" alt="MasterCard" />
          </div>
        </div>
      </div>
    </footer>
  );
}
