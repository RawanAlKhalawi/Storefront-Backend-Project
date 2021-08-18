import supertest from 'supertest';
import app from '../../server';
import { UserStore } from '../../models/user';

const request = supertest(app);
const userStore = new UserStore();
let token: string;

describe('Test user endpoints', () => {
	beforeAll(async () => {
		await userStore.create({
			firstName: 'rawan',
			lastName: 'alkhalawi',
			username: 'rawan',
			password: 'password',
		});

		const auth = await request.post('/auth').send({
			username: 'rawan',
			password: 'password',
		});
		token = auth.body;
	});
	it('should add a user', async (done) => {
		const response = await request
			.post('/users')
			.set('Authorization', 'Bearer ' + token)
			.send({
				first_name: 'rawan',
				last_name: 'alkhalawi',
				username: 'rawan',
				password: 'password',
			});
		expect(response.status).toBe(200);
		done();
	});

	it('should return the token', async (done) => {
		const response = await request.post('/auth').send({
			username: 'rawan',
			password: 'password',
		});
		expect(response.status).toBe(200);
		expect(response.body).not.toBeNull;
		done();
	});

	it('should return a list of users', async (done) => {
		const response = await request
			.get('/users')
			.set('Authorization', 'Bearer ' + token);
		expect(response.status).toBe(200);
		done();
	});

	it('should return the user', async (done) => {
		const response = await request
			.get('/users/1')
			.set('Authorization', 'Bearer ' + token);
		expect(response.status).toBe(200);
		expect(response.body).not.toBeNull;
		done();
	});
});
