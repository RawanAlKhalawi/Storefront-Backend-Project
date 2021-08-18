import supertest from 'supertest';
import app from '../../server';
import { UserStore } from '../../models/user';
import { OrderStatus } from '../../models/order';

const request = supertest(app);
const userStore = new UserStore();
let token: string;

describe('Test order endpoints', () => {
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

		await request
			.post('/products')
			.set('Authorization', 'Bearer ' + token)
			.send({
				name: 'spring in action',
				price: 25,
				category: 'book',
			});
	});
	it('should add a order', async (done) => {
		const response = await request
			.post('/orders')
			.set('Authorization', 'Bearer ' + token)
			.send({
				status: OrderStatus.active,
				user_id: 1,
			});
		expect(response.status).toBe(200);
		done();
	});

	it('should return a list of orders', async (done) => {
		const response = await request
			.get('/orders')
			.set('Authorization', 'Bearer ' + token);
		expect(response.status).toBe(200);
		done();
	});

	it('should return the current orders', async (done) => {
		const response = await request
			.get('/orders/1')
			.set('Authorization', 'Bearer ' + token);
		expect(response.status).toBe(200);
		done();
	});
});
