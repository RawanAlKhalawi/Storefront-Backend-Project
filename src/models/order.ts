import Client from '../database';

export enum OrderStatus {
	active = 'active',
	complete = 'complete',
}

export type Order = {
	status: OrderStatus;
	userId: number;
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
				'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
			// @ts-ignore
			const conn = await Client.connect();

			const result = await conn.query(sql, [o.status, o.userId]);

			const order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(`Could not add new order. Error: ${err}`);
		}
	}
}
