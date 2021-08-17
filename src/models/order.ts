import Client from '../database';

export enum OrderStatus {
	active = 'active',
	complete = 'complete',
}

export type Order = {
	quantity: number;
	status: OrderStatus;
	userId: number;
	productId: number;
};

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			// @ts-ignore
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders';

			const result = await conn.query(sql);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`Could not get orders. Error: ${err}`);
		}
	}

	async currentOrder(userId: string): Promise<Order[]> {
		try {
			const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
			// @ts-ignore
			const conn = await Client.connect();
			const result = await conn.query(sql, [userId, OrderStatus.active]);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`Could not find order ${userId}. Error: ${err}`);
		}
	}

	async create(o: Order): Promise<Order> {
		try {
			const sql =
				'INSERT INTO orders (quantity, status, user_id, product_id) VALUES($1, $2, $3, $4) RETURNING *';
			// @ts-ignore
			const conn = await Client.connect();
			const result = await conn.query(sql, [
				o.quantity,
				o.status,
				o.userId,
				o.productId,
			]);

			const order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(`Could not add new order. Error: ${err}`);
		}
	}

	async update(id: string, quantity: number): Promise<Order> {
		try {
			const sql = 'UPDATE orders SET quantity=($1) WHERE id=($2)';
			// @ts-ignore
			const conn = await Client.connect();
			const result = await conn.query(sql, [quantity, id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find order ${id}. Error: ${err}`);
		}
	}

	async delete(id: string): Promise<Order> {
		try {
			const sql = 'DELETE FROM orders WHERE id=($1)';
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
