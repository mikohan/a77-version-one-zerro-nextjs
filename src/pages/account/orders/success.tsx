import React, { useEffect } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { COMPANY_INFORMATION, footerData, SITE_DOMAIN_FULL } from '~/config';
import { Grid, Typography, Container, Button } from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import url from '~/services/url';
import { useDispatch } from 'react-redux';
import { clearCart } from '~/store/cart/cartAction';

// This is the recommended way for Next.js 9.3 or newer
export default function OrderSuccess() {
	const classes = useStyles();
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearCart());
	}, []);
	function goHome() {
		router.push(url.home());
	}
	return (
		<React.Fragment>
			<OrderSuccessHead />
			<AnimationPage>
				<Container maxWidth="lg">
					<Grid className={classes.container} container>
						<Grid item xs={12}>
							<Typography
								className={classes.orderSuccess}
								variant="h2"
								align="center"
							>
								Заказ успешно оформлен!
							</Typography>
							<Typography
								className={classes.orderSuccessSecond}
								variant="body1"
								align="center"
							>
								Менеджер свяжется с Вами в ближайщее рабочее
								время!
							</Typography>
							<Typography
								className={classes.orderSuccess}
								variant="h2"
								align="center"
							>
								Спасибо, что остаетесь с нами!
							</Typography>
						</Grid>
						<Grid
							className={classes.buttonGrid}
							item
							container
							justify="center"
						>
							<Button
								variant="contained"
								color="primary"
								onClick={goHome}
							>
								Вернуться на главую
							</Button>
						</Grid>
						<Grid item xs={12} container justify="center">
							<Image
								src="/images/local/success.png"
								width={300}
								height={300}
							/>
						</Grid>
					</Grid>
				</Container>
			</AnimationPage>
		</React.Fragment>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			paddingTop: theme.spacing(5),
			paddingBottom: theme.spacing(10),
		},
		orderSuccess: {
			paddingBottom: theme.spacing(2),
			color: theme.palette.success.main,
		},
		orderSuccessSecond: {
			paddingBottom: theme.spacing(2),
		},
		buttonGrid: {
			paddingBottom: theme.spacing(5),
		},
	})
);

const OrderSuccessHead = () => (
	<Head>
		<title key="title">Заказ {COMPANY_INFORMATION.COMPANY_NAME_ENG}</title>
		<meta
			key="description"
			name="description"
			content={`Angara 77 | ${footerData.SHOP_PHONE} Information about our
          company and history of establishment. We are open our dors in 2001 first time`}
		/>
		<meta
			key="og:title"
			property="og:title"
			content="Get your car in perfect health | Angara Parts | About Us"
		/>
		<meta
			key="og:url"
			property="og:url"
			content={`${SITE_DOMAIN_FULL}/about`}
		/>
		<meta key="og:image" property="og:image" content="/favicon.png" />
		<meta
			key="og:image:type"
			property="og:image:type"
			content="image/png"
		/>
		<meta key="og:image:width" property="og:image:width" content="1200" />
		<meta key="og:image:hight" property="og:image:hight" content="630" />

		<meta
			key="og:image:alt"
			property="og:image:alt"
			content="Angara 77 logo"
		/>
		<link
			rel="canonical"
			key="canonical"
			href={`${SITE_DOMAIN_FULL}/about`}
		/>
	</Head>
);
