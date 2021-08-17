import { UserStore } from '../user';

const store = new UserStore();

describe('User Model', () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});

	it('should have a authenticate method', () => {
		expect(store.authenticate).toBeDefined();
	});

	it('index method should return a list of users', async () => {
		const result = await store.index();
		expect(result).toBeTrue;
	});

	it('create method should add a user', async () => {
		const result = await store.create({
			firstName: 'rawan',
			lastName: 'alkhalawi',
			username: 'rawan',
			password: 'password',
		});
		expect(result.username).toEqual('rawan');
	});

	it('show method should return the user', async () => {
		const result = await store.show('1');
		expect(result).not.toBeNull;
	});

	it('authenticate method should return user password', async () => {
		const result = store.authenticate('rawan', 'password');
		expect(result).not.toBeNull;
	});
});
