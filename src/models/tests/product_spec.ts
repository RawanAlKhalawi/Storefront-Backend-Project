import { ProductStore } from '../product';

const store = new ProductStore();

describe('Product Model', () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});

	it('index method should return a list of products', async () => {
		const result = await store.index();
		expect(result).toBeTrue;
	});

	it('create method should add a product', async () => {
		const result = await store.create({
			name: 'spring in action',
			price: 25,
			category: 'book',
		});
		expect(result.price).toBeTruthy;
	});

	it('show method should return the product', async () => {
		const result = await store.show('1');
		expect(result).not.toBeNull;
	});
});
