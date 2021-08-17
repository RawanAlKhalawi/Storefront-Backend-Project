import { OrderStore, OrderStatus } from '../order';
import { UserStore } from '../user';
import { ProductStore } from '../product';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Order Model', () => {
	beforeAll(async () => {
		await userStore.create({
			firstName: 'rawan',
			lastName: 'alkhalawi',
			username: 'rawan',
			password: 'password',
		});

		await productStore.create({
			name: 'spring in action',
			price: 25,
			category: 'book',
		});
	});

	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a current order method', () => {
		expect(store.currentOrder).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});

	it('should have a update method', () => {
		expect(store.update).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(store.delete).toBeDefined();
	});

	it('index method should return a list of orders', async () => {
		const result = await store.index();
		expect(result).toBeTrue;
	});

	it('create method should add a order', async () => {
		const result = await store.create({
			quantity: 8,
			status: OrderStatus.active,
			userId: 1,
			productId: 1,
		});
		expect(result.quantity).toBeTruthy;
	});

	it('show method should return the active order', async () => {
		const result = await store.currentOrder('1');
		expect(result).not.toBeNull;
	});

	it('update method should return the order updated', async () => {
		const result = await store.update('1', 12);
		expect(result).not.toBeNull;
	});

	it('delete method should remove the order', async () => {
		const result = await store.delete('2');
		expect(result).not.toBeNull;
	});
});
