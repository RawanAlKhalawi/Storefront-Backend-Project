import { OrderStore, OrderStatus } from '../order';
import { UserStore } from '../user';
import { ProductStore } from '../product';
import { OrderPoductStore } from '../orderPoduct';

const store = new OrderPoductStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

describe('Order Poducts Model', () => {
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

        await orderStore.create({
            status: OrderStatus.complete,
            userId: 1
        });
    });

    it('should have a create method', () => {
        expect(store.addProduct).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });


    it('addProduct method should add a product', async () => {
        const result = await store.addProduct(2, '1', '1');
        expect(result.quantity).toBeTruthy;
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
