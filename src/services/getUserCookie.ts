import { IUser } from '~/interfaces';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { backServerUrl } from '~/config';

export async function getUserCookie(
	context: GetServerSidePropsContext
): Promise<{ user: IUser; access: string; refresh: string } | undefined> {
	const req: any = context.req;
	const { access, refresh, user } = req.cookies;
	if (user) {
		const config = {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		};
		const cookieUser = JSON.parse(user);
		let gotUser = {} as IUser;
		const userUrl = `${backServerUrl}/api/user/users/${cookieUser.id}/`;
		try {
			const userPromise = await axios.get(userUrl, config);
			gotUser = userPromise.data;
		} catch (e) {
			console.log('Could not get user from server', e);
		}
		return { user: gotUser, access: access, refresh: refresh };
	} else {
		return undefined;
	}
}
