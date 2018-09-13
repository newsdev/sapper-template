import 'dotenv/config';
import sirv from 'sirv';
import polka from 'polka';
import sapper from 'sapper';
import compression from 'compression';
import { Store } from 'svelte/store.js';
import { manifest } from './manifest/server.js';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('assets', { dev }),
		sapper({
			manifest,
			store: req => {
				// If you're using IAP, this will get the logged-in user's
				// email address and put it in the Store, which can then
				// be accessed in components as `$user.email`
				const id = (req.headers['x-goog-authenticated-user-id'] || '').replace('accounts.google.com:', '');
				const email = (req.headers['x-goog-authenticated-user-email'] || '').replace('accounts.google.com:', '');

				const user = process.env.LOCAL
					? { email: '[local]@nytimes.com' }
					: email && /@nytimes\.com$/.test(email) && { email };

				return new Store({
					user
				});
			}
		})
	)
	.listen(PORT)
	.catch(err => {
		console.log('error', err);
	});
