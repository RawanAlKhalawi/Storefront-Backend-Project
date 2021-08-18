import Client from '../database';
import { OrderStatus } from './order';

export type OrderPoducts = {
	quantity: number;
	orderId: number;
	productId: number;
};

export class OrderPoductStore {
	async addProduct(
		quantity: number,
		orderId: string,
		productId: string
	): Promise<OrderPoducts> {
		// get order to see if it is open
		try {
			const ordersql = 'SELECT * FROM orders WHERE id=($1)';
			//@ts-ignore
			const conn = await Client.connect();

			const result = await conn.query(ordersql, [orderId]);

			const order = result.rows[0];

			if (order.status !== OrderStatus.active) {
				throw new Error(
					`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
				);
			}

			conn.release();
		} catch (err) {
			throw new Error(`${err}`);
		}

		try {
			const sql =
				'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
			//@ts-ignore
			const conn = await Client.connect();

			const result = await conn.query(sql, [quantity, orderId, productId]);

			const order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(
				`Could not add product ${productId} to order ${orderId}: ${err}`
			);
		}
	}

	async update(id: string, quantity: number): Promise<OrderPoducts> {
		try {
			const sql = 'UPDATE order_products SET quantity=($1) WHERE id=($2)';
			// @ts-ignore
			const conn = await Client.connect();
			const result = await conn.query(sql, [quantity, id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find order ${id}. Error: ${err}`);
		}
	}

	async delete(id: string): Promise<OrderPoducts> {
		try {
			const sql = 'DELETE FROM order_products WHERE id=($1)';
			// @ts-ignore
			const conn = await Client.connect();
			const result = await conn.query(sql, [id]);

			const order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(`Could not delete order ${id}. Error: ${err}`);
		}
	}
}
