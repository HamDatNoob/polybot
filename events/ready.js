const db = require('quick.db');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}.`);
		
		let channels = [];
		client.guilds.cache.forEach(e => {
			channels.push(Array.from(e.channels.cache.filter(v => ![2, 4].includes(v.type)), ([id, value]) => ({ id, value })));
		});
		
		channels = channels.flat();
		
		for(let i in channels){
			db.delete(`${channels[i].id}.cooldown`);
		}

		console.log(`Cleared cooldowns from ${channels.length} channels.`);

		const fs = require('fs').promises;
		const path = require('path');
		const process = require('process');
		const { authenticate } = require('@google-cloud/local-auth');
		const { google } = require('googleapis');

		// If modifying these scopes, delete token.json.
		const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];
		// The file token.json stores the user's access and refresh tokens, and is
		// created automatically when the authorization flow completes for the first
		// time.
		const TOKEN_PATH = path.join(process.cwd(), 'config.json');
		const CREDENTIALS_PATH = path.join(process.cwd(), 'config.json');

		/**
		 * Reads previously authorized credentials from the save file.
		 *
		 * @return {Promise<OAuth2Client|null>}
		 */
		async function loadSavedCredentialsIfExist() {
			try {
				return google.auth.fromJSON(JSON.parse(await fs.readFile(TOKEN_PATH)));
			} catch (err) {
				return null;
			}
		}

		/**
		 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
		 *
		 * @param {OAuth2Client} client
		 * @return {Promise<void>}
		 */
		async function saveCredentials(client) {
			const content = await fs.readFile(CREDENTIALS_PATH);
			const keys = JSON.parse(content);
			const key = keys.installed || keys.web;
			const payload = JSON.stringify({
				type: 'authorized_user',
				client_id: key.client_id,
				client_secret: key.client_secret,
				refresh_token: client.credentials.refresh_token,
			});
			await fs.writeFile(TOKEN_PATH, payload);
		}

		/**
		 * Load or request or authorization to call APIs.
		 *
		 */
		async function authorize() {
			let client = await loadSavedCredentialsIfExist();
			if (client) {
				return client;
			}
			client = await authenticate({
				scopes: SCOPES,
				keyfilePath: CREDENTIALS_PATH,
			});
			if (client.credentials) {
				await saveCredentials(client);
			}
			return client;
		}

		function getDoc(auth){
			const docs = google.docs({ version: 'v1', auth });
			const res = docs.documents.get({
			  	documentId: '1-D-pm4dM1jB2_0fm7Kq6MpdLEjM3S0xgW_tngjhFnP8', // https://docs.google.com/document/d/1-D-pm4dM1jB2_0fm7Kq6MpdLEjM3S0xgW_tngjhFnP8/edit# <- linkage repository
			});

			return res;
		}
		
		const res = await authorize().then(getDoc); // fetches the doc

		fs.writeFile('./json/linkage.json', JSON.stringify(res, null, 2, 'utf-8')); // refreshes the linkage repository file to get the latest data

		console.log('Linkage Repository Updated.');
	},
};