import supertest from 'supertest';
import app from '../../server';
import { UserStore } from '../../models/user';

const request = supertest(app);
const userStore = new UserStore();
let token: string;

describe('Test product endpoints', () => {
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
	it('should add a product', async (done) => {
		const response = await request
			.post('/products')
			.set('Authorization', 'Bearer ' + token)
			.send({
				name: 'spring in action',
				price: 25,
				category: 'book',
			});
		expect(response.status).toBe(200);
		done();
	});

	it('should return a list of products', async (done) => {
		const response = await request.get('/products');
		expect(response.status).toBe(200);
		done();
	});

	it('should return the products', async (done) => {
		const response = await request.get('/products/1');
		expect(response.status).toBe(200);
		done();
	});
});
