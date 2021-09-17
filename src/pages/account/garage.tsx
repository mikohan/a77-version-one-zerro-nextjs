import React, { useState } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import {
	Button,
	Grid,
	Typography,
	Container,
	Paper,
	Box,
	TextField,
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { GetServerSidePropsContext } from 'next';
import DashboardLeftMenu from '~/components/account/DashboardLeftMenu';
import url from '~/services/url';
import { useRouter } from 'next/router';
import { IUser } from '~/interfaces';
import { getUserCookie } from '~/services/getUserCookie';
import NoLoggedIn from '~/components/account/NotLoggedIn';
import axios from 'axios';
import { backServerUrlRest, COMPANY_INFORMATION } from '~/config';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			paddingTop: theme.spacing(5),
			paddingBottom: theme.spacing(5),
		},
		left: {},
		right: {
			paddingLeft: theme.spacing(2),
			[theme.breakpoints.down('xs')]: {
				paddingTop: theme.spacing(2),
			},
		},
		profilePaper: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
		},
		pageTitle: {
			paddingBottom: theme.spacing(3),
		},
		form: {
			display: 'flex',
			justifyContent: 'center',
		},
		fieldsBox: {
			width: '60%',
			'&>*': {
				marginBottom: theme.spacing(3),
			},
		},
		image: {
			display: 'flex',
			alignItems: 'center',
		},
		avatar: {
			width: theme.spacing(15),
			height: theme.spacing(15),
			marginLeft: theme.spacing(5),
		},
		skelPaper: {
			padding: theme.spacing(5),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		skelItem: {
			marginBottom: theme.spacing(3),
		},
		skelBox: {
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
	})
);
// This is the recommended way for Next.js 9.3 or newer
interface IProps {
	user: IUser;
	access: string;
}
export default function Dashboard({ user, access }: IProps) {
	const classes = useStyles();

	const [userName, setUserName] = useState(user.username);
	const [firstName, setFirstName] = useState(user.first_name || '');
	const [lastName, setLastName] = useState(user.last_name || '');
	const [phone, setPhone] = useState(user.phone || '');
	const [avatar, setAvatar] = useState(user.image);
	const [avatarUpload, setAvatarUpload] = useState<{ file: File } | null>(
		null
	);
	const [loading, setLoading] = useState(false);

	function handleUserName(event: React.ChangeEvent<HTMLInputElement>) {
		setUserName(event.target.value);
	}
	function handleFirstName(event: React.ChangeEvent<HTMLInputElement>) {
		setFirstName(event.target.value);
	}
	function handleLastName(event: React.ChangeEvent<HTMLInputElement>) {
		setLastName(event.target.value);
	}
	function handlePhone(event: React.ChangeEvent<HTMLInputElement>) {
		setPhone(event.target.value);
	}
	function handleAvatar(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.files?.length) {
			setAvatarUpload({ file: event?.target?.files[0] });
		}
	}
	async function handleSubmit() {
		const formData = new FormData();

		if (avatarUpload) {
			formData.append(
				'image',
				avatarUpload?.file!,
				avatarUpload?.file.name
			);
		}
		formData.append('username', userName);
		formData.append('first_name', firstName as string);
		formData.append('last_name', lastName as string);
		formData.append('phone', phone as string);
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${access}`,
			},
		};

		const userUrl = `${backServerUrlRest}/api/user/users/${user.id}/`;
		setLoading(true);
		try {
			const userBack = await axios.put(userUrl, formData, config);
			setUserName(userBack.data.username);
			setFirstName(userBack.data.first_name);
			setLastName(userBack.data.last_name);
			setPhone(userBack.data.phone);
			setAvatar(userBack.data.image);
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	}
	function ProfileSkeleton() {
		return (
			<React.Fragment>
				<AnimationPage id="skeleton">
					<Paper className={classes.skelPaper}>
						<Box>
							<Skeleton
								className={classes.skelItem}
								variant="rect"
								width={400}
								height={40}
							/>
							<Skeleton
								className={classes.skelItem}
								variant="rect"
								width={400}
								height={40}
							/>
							<Skeleton
								className={classes.skelItem}
								variant="rect"
								width={400}
								height={40}
							/>
							<Skeleton
								className={classes.skelItem}
								variant="rect"
								width={400}
								height={40}
							/>
							<Box className={classes.skelBox}>
								<Skeleton
									className={classes.skelItem}
									variant="rect"
									width={100}
									height={40}
								/>

								<Skeleton
									variant="circle"
									width={150}
									height={150}
								/>
							</Box>
						</Box>
					</Paper>
				</AnimationPage>
			</React.Fragment>
		);
	}

	if (access) {
		return (
			<React.Fragment>
				<DashboardHead />
				<AnimationPage>
					<Container maxWidth="lg">
						<Grid className={classes.container} container>
							<Grid
								className={classes.left}
								item
								container
								xs={12}
								sm={3}
							>
								<Grid container>
									<Grid item xs={12}>
										<DashboardLeftMenu />
									</Grid>
								</Grid>
							</Grid>
							<Grid
								className={classes.right}
								item
								container
								xs={12}
								sm={9}
							>
								<Grid container>
									<Grid item container xs={12}>
										<Grid item xs={12}>
											{!loading ? (
												<AnimationPage id="profle">
													<Paper
														className={
															classes.profilePaper
														}
													>
														<Typography
															className={
																classes.pageTitle
															}
															variant="h6"
														>
															Изменить Профиль
														</Typography>
														<Box
															className={
																classes.form
															}
														>
															<Box
																className={
																	classes.fieldsBox
																}
															>
																<TextField
																	id="userName"
																	label="Ник"
																	variant="filled"
																	fullWidth
																	size="small"
																	name="username"
																	defaultValue={
																		userName
																	}
																	onChange={
																		handleUserName
																	}
																/>
																<TextField
																	id="firstName"
																	label="Имя"
																	variant="filled"
																	fullWidth
																	size="small"
																	name="firstName"
																	defaultValue={
																		firstName
																	}
																	onChange={
																		handleFirstName
																	}
																/>
																<TextField
																	id="lastName"
																	label="Фамилия"
																	variant="filled"
																	fullWidth
																	size="small"
																	name="lastName"
																	defaultValue={
																		lastName
																	}
																	onChange={
																		handleLastName
																	}
																/>
																<TextField
																	id="phone"
																	label="Телефон"
																	variant="filled"
																	fullWidth
																	size="small"
																	name="phone"
																	defaultValue={
																		phone
																	}
																	onChange={
																		handlePhone
																	}
																/>
																<Box
																	className={
																		classes.image
																	}
																>
																	<Button
																		variant="contained"
																		component="label"
																	>
																		Загрузить
																		Аватар
																		<input
																			onChange={
																				handleAvatar
																			}
																			type="file"
																			hidden
																		/>
																	</Button>
																	<Avatar
																		className={
																			classes.avatar
																		}
																		src={
																			avatar
																				? avatar
																				: '/images/local/default-avatar.jpg'
																		}
																	></Avatar>
																</Box>
																<Button
																	variant="contained"
																	color="primary"
																	onClick={
																		handleSubmit
																	}
																>
																	Сохранить
																</Button>
															</Box>
														</Box>
													</Paper>
												</AnimationPage>
											) : (
												<ProfileSkeleton />
											)}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Container>
				</AnimationPage>
			</React.Fragment>
		);
	} else {
		return <NoLoggedIn />;
	}
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const data = await getUserCookie(context);
	let user = {} as IUser;
	let access = '';
	if (data) {
		user = data.user;
		access = data.access;
	}

	return {
		props: {
			user,
			access,
		},
	};
}

const DashboardHead = () => (
	<Head>
		<title key="title">
			Профиль пользователя {COMPANY_INFORMATION.COMPANY_NAME}
		</title>
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
