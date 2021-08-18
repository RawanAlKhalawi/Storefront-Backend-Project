import supertest from 'supertest';
import app from '../../server';
import { UserStore } from '../../models/user';
import { OrderStatus } from '../../models/order';

const request = supertest(app);
const userStore = new UserStore();
let token: string;

describe('Test Order Poducts endpoints', () => {
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

        await request
            .post('/orders')
            .set('Authorization', 'Bearer ' + token)
            .send({
                status: OrderStatus.complete,
                user_id: 1,
            });
    });
    it('should add a order_products', async (done) => {
        const response = await request
            .post('/orders/1/products')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "quantity": 3,
                "product_id": "1"
            });
        expect(response.status).toBe(200);
        done();
    });

    it('should update the order_products', async (done) => {
        const response = await request
            .put('/orders/1/products')
            .send({
                quantity: 6,
            })
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        done();
    });

    it('should delete the order_products', async (done) => {
        const response = await request
            .delete('/orders/1/products')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        done();
    });
});
