import React from 'react';
import Link from 'next/link';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import MLink from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden';

import { SITE_DOMAIN, COMPANY_INFORMATION } from '~/config';
import { footerData as data } from '~/config';
import url from '~/services/url';

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
    myFooter: {
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
      alignItems: 'center',
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
    ip: {
      color: theme.palette.grey[500],
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
    <footer className={classes.myFooter}>
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
            <Hidden mdDown>
              <div>
                <Typography className={classes.sectionHeader} variant="h5">
                  ИНФОРМАЦИЯ
                </Typography>
                <List>
                  <Link href={url.delivery()}>
                    <ListItem>
                      <a>ДОСТАВКА</a>
                    </ListItem>
                  </Link>
                  <Link href={url.payment()}>
                    <ListItem>
                      <a>ОПЛАТА</a>
                    </ListItem>
                  </Link>
                  <Link href={url.warranty()}>
                    <ListItem>
                      <a>ГАРАНТИИ</a>
                    </ListItem>
                  </Link>
                  <Link href={url.policy()}>
                    <ListItem>
                      <a>КОНФИДЕНЦИАЛЬНОСТЬ</a>
                    </ListItem>
                  </Link>
                </List>
              </div>
            </Hidden>
            <div>
              <Typography className={classes.sectionHeader} variant="h5">
                КОМПАНИЯ
              </Typography>
              <List>
                <Link href={url.about()}>
                  <ListItem>
                    <a>О КОМПАНИИ</a>
                  </ListItem>
                </Link>
                <Link href={url.contacts()}>
                  <ListItem>
                    <a>КОНТАКТЫ</a>
                  </ListItem>
                </Link>
                <Link href={url.cars()}>
                  <ListItem>
                    <a>МАШИНЫ</a>
                  </ListItem>
                </Link>
                <Link href={url.blog()}>
                  <ListItem>
                    <a>БЛОГ</a>
                  </ListItem>
                </Link>
              </List>
            </div>
            <div>
              <Typography className={classes.sectionHeader} variant="h5">
                СОЦИАЛЬНЫЕ СЕТИ
              </Typography>
              <Typography className={classes.sectionSubheader} variant="body1">
                {data.SHOP_CONTACT_TEXT}
              </Typography>
              <div>
                <Typography
                  className={classes.sectionSubheader}
                  variant="body1"
                >
                  Наши группы в социальных сетях
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
                      <img src="/images/local/ok.svg" alt="Odnoklasniki icon" />
                      <div></div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Hidden smDown>
          <div className={classes.bottomLine}>
            <div className={classes.copyright}>
              <Copyright className={classes.copyColor} />
            </div>
            <div className={classes.ip}>
              <Typography variant="body1">
                {COMPANY_INFORMATION.RECVIZITY.NAME}
              </Typography>
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
