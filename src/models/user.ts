import Client from '../database';
import bcrypt from 'bcrypt';

const pepper: string = process.env.BCRYPT_PASSWORD as string;
const saltRounds: string = process.env.SALT_ROUNDS as string;

export type User = {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
};

export class UserStore {
	async index(): Promise<User[]> {
		try {
			// @ts-ignore
			const conn = await Client.connect();
			const sql = 'SELECT * FROM users';

			const result = await conn.query(sql);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`Could not get users. Error: ${err}`);
		}
	}

	async show(id: string): Promise<User> {
		try {
			const sql = 'SELECT * FROM users WHERE id=($1)';
			// @ts-ignore
			const conn = await Client.connect();
			const result = await conn.query(sql, [id]);
			const user = result.rows[0];

			conn.release();

			return user;
		} catch (err) {
			throw new Error(`Could not find user ${id}. Error: ${err}`);
		}
	}

	async create(u: User): Promise<User> {
		try {
			const sql =
				'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';
			// @ts-ignore
			const conn = await Client.connect();

			const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

			const result = await conn.query(sql, [
				u.firstName,
				u.lastName,
				u.username,
				hash,
			]);

			const user = result.rows[0];

			conn.release();

			return user;
		} catch (err) {
			throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
		}
	}

	async authenticate(username: string, password: string): Promise<User | null> {
		// @ts-ignore
		const conn = await Client.connect();
		const sql = 'SELECT password FROM users WHERE username=($1)';

		const result = await conn.query(sql, [username]);

		console.log(password + pepper);

		if (result.rows.length) {
			const user = result.rows[0];

			console.log(user);

			if (bcrypt.compareSync(password + pepper, user.password)) {
				return user;
			}
		}

		return null;
	}
}
