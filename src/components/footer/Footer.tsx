import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import MLink from '@material-ui/core/Link';
import { List, ListItem } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { SITE_DOMAIN } from '~/config';
import { footerData as data } from '~/config';
import Container from '@material-ui/core/Container';
interface IPropsCopyright {
  className?: string;
}

function Copyright({ className }: IPropsCopyright) {
  return (
    <Typography className={className} variant="body2" color="textSecondary">
      {'Copyright © '}
      <MLink color="inherit" href="/">
        {SITE_DOMAIN}
      </MLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
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
    contentBox: {
      [theme.breakpoints.down('lg')]: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
      },
      [theme.breakpoints.up('xl')]: {
        paddingLeft: theme.spacing(20),
        paddingRight: theme.spacing(20),
      },
    },
    root: {
      flexGrow: 1,
    },
    wrapper: {
      '& > div': {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
      },
      display: 'grid',
      gridTemplateColumns: '3fr 1fr 1fr 2fr',
      gridGap: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
      },
    },
    cellGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
      gridRowGapGap: theme.spacing(3),
      '& >div': {
        border: '1px solid black',
      },
      '& > dl': {
        paddingRight: '2rem',
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
      background: '#2b2b2b',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: '3rem',
      paddingLeft: '3rem',
    },
    payments: {
      '& img': {
        marginRight: theme.spacing(1),
        width: theme.spacing(6),
        height: theme.spacing(6),
      },
    },
    copyright: {
      alignSelf: 'center',
    },
    copyColor: {
      color: theme.palette.grey[500],
    },
    socialMedia: {
      display: 'flex',
      '& > a > img': {
        marginRight: theme.spacing(1),
        width: theme.spacing(5),
        height: theme.spacing(5),
      },
      '& > a': {
        position: 'relative',
      },
      '& > a > div': {
        position: 'absolute',
        top: 0,
        width: theme.spacing(5),
        height: theme.spacing(5),
        borderRadius: '50%',
        background: 'none',
        transition: '0.3s',
        '&:hover': {
          background: theme.palette.action.active,
        },
      },
    },
  })
);

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.root}>
        <div className={classes.contentBox}>
          <div className={classes.wrapper}>
            <div>
              <address className={classes.address}>
                <Typography className={classes.sectionHeader} variant="h5">
                  КОНТАКТЫ
                </Typography>
                <Typography
                  className={classes.sectionSubheader}
                  variant="body1"
                >
                  {data.SHOP_CONTACT_TEXT}
                </Typography>
                <div className={classes.cellGrid}>
                  <dl>
                    <dt>ТЕЛЕФОН</dt>
                    <dd>
                      <a href="tel:74956469953">{data.SHOP_PHONE}</a>
                    </dd>
                  </dl>
                  <dl>
                    <dt>АДРЕС</dt>
                    <dd>{data.SHOP_ADDRESS}</dd>
                  </dl>
                  <dl>
                    <dt>EMAIL ADDRESS</dt>
                    <dd>
                      <a
                        href="mailto:angara77@gmail.com"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {data.SHOP_EMAIL}
                      </a>
                    </dd>
                  </dl>
                  <dl>
                    <dt>ГРАФИК РАБОТЫ</dt>
                    <dd>{data.SHOP_WORKING_HOURS}</dd>
                  </dl>
                </div>
              </address>
            </div>
            <Hidden smDown>
              <Hidden mdDown>
                <div>
                  <Typography className={classes.sectionHeader} variant="h5">
                    ИНФОРМАЦИЯ
                  </Typography>
                  <List>
                    <ListItem>DELIVERY</ListItem>
                    <ListItem>ORDER</ListItem>
                    <ListItem>RETURNS</ListItem>
                    <ListItem>PRIVATE POLICY</ListItem>
                    <ListItem>SITE MAP</ListItem>
                  </List>
                </div>
              </Hidden>
              <div>
                <Typography
                  className={classes.sectionHeader}
                  variant="h5"
                >{`\{INFORMATION\} `}</Typography>
                <List>
                  <Link href="/about">
                    <ListItem>
                      <a>ABOUT US</a>
                    </ListItem>
                  </Link>
                  <Link href="/contacts">
                    <ListItem>
                      <a>CONTACTS</a>
                    </ListItem>
                  </Link>
                  <Link href="/car">
                    <ListItem>
                      <a>CARS</a>
                    </ListItem>
                  </Link>
                  <Link href="/grid">
                    <ListItem>
                      <a>MAKES</a>
                    </ListItem>
                  </Link>
                </List>
              </div>
              <div>
                <Typography
                  className={classes.sectionHeader}
                  variant="h5"
                >{`\{FOLLOW US\} `}</Typography>
                <Typography
                  className={classes.sectionSubheader}
                  variant="body1"
                >
                  Hi, we are always open for cooperation and suggestions,
                  contact us in one of the ways below:
                </Typography>
                <div>
                  <Typography
                    className={classes.sectionSubheader}
                    variant="body1"
                  >
                    Follow us on social media
                  </Typography>
                  <div className={classes.socialMedia}>
                    <Link href="https://www.youtube.com/channel/UCJ97RljnqyAdKKmAc8mvHZw">
                      <a rel="noopener noreferrer" target="_blank">
                        <img src="/images/local/yt.svg" alt="YouTube icon" />
                        <div></div>
                      </a>
                    </Link>
                    <Link href="https://vk.com/angara772018">
                      <a rel="noopener noreferrer" target="_blank">
                        <img src="/images/local/vk.svg" alt="V kontacte icon" />
                        <div></div>
                      </a>
                    </Link>
                    <Link href="https://ok.ru/group/52962919973041">
                      <a rel="noopener noreferrer" target="_blank">
                        <img
                          src="/images/local/ok.svg"
                          alt="Odnoklasniki icon"
                        />
                        <div></div>
                      </a>
                    </Link>
                    <Link href="https://www.facebook.com/groups/angara77/">
                      <a rel="noopener noreferrer" target="_blank">
                        <img src="/images/local/fb.svg" alt="Facebook icon" />
                        <div></div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Hidden>
          </div>
        </div>
        <Hidden smDown>
          <div className={classes.bottomLine}>
            <div className={classes.copyright}>
              <Copyright className={classes.copyColor} />
            </div>
            <div className={classes.payments}>
              <img src="/images/local/visa.svg" alt="visa icon" />
              <img src="/images/local/mastercard.svg" alt="Mastercard icon" />
              <img
                src="/images/local/generic.svg"
                alt="Generic credit card icon"
              />
              <img src="/images/local/mir.svg" alt="Mir icon" />
            </div>
          </div>
        </Hidden>
      </div>
    </footer>
  );
}
