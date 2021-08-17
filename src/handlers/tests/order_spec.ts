import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let token: string;

describe('Test order endpoints', () => {
	beforeAll(async () => {
		await request.post('/users').send({
			first_name: 'rawan',
			last_name: 'alkhalawi',
			username: 'rawan',
			password: 'password',
		});

		await request
			.post('/products')
			.set('Authorization', 'Bearer ' + token)
			.send({
				name: 'spring in action',
				price: 25,
				category: 'book',
			});

		const auth = await request.post('/auth').send({
			username: 'rawan',
			password: 'password',
		});
		token = auth.body;
	});
	it('should add a order', async (done) => {
		const response = await request
			.post('/orders')
			.set('Authorization', 'Bearer ' + token)
			.send({
				quantity: 8,
				status: 'active',
				user_id: 1,
				product_id: 1,
			});
		expect(response.status).toBe(200);
		done();
	});

	it('should update the order', async (done) => {
		const response = await request
			.put('/orders/1')
			.send({
				quantity: 6,
			})
			.set('Authorization', 'Bearer ' + token);
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

	it('should delete the order', async (done) => {
		const response = await request
			.delete('/orders/1')
			.set('Authorization', 'Bearer ' + token);
		expect(response.status).toBe(200);
		done();
	});
});
