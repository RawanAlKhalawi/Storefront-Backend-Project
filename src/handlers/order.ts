import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import jwt from 'jsonwebtoken';

const store = new OrderStore();
const tokenSecret = process.env.TOKEN_SECRET as string;

const index = async (req: Request, res: Response) => {
	try {
		const authorizationHeader = req.headers.authorization as string;
		const token = authorizationHeader.split(' ')[1];
		jwt.verify(token, tokenSecret);
	} catch (err) {
		res.status(401);
		res.json('Access denied, invalid token');
		return;
	}
	const products = await store.index();
	res.json(products);
};

const show = async (req: Request, res: Response) => {
	try {
		const authorizationHeader = req.headers.authorization as string;
		const token = authorizationHeader.split(' ')[1];
		jwt.verify(token, tokenSecret);
	} catch (err) {
		res.status(401);
		res.json('Access denied, invalid token');
		return;
	}
	const orders = await store.currentOrder(req.params.user_id);
	res.json(orders);
};

const create = async (req: Request, res: Response) => {
	try {
		const authorizationHeader = req.headers.authorization as string;
		const token = authorizationHeader.split(' ')[1];
		jwt.verify(token, tokenSecret);
	} catch (err) {
		res.status(401);
		res.json('Access denied, invalid token');
		return;
	}
	try {
		const order: Order = {
			quantity: req.body.quantity,
			status: req.body.status,
			userId: req.body.user_id,
			productId: req.body.product_id,
		};

		const newOrder = await store.create(order);
		res.json(newOrder);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const authorizationHeader = req.headers.authorization as string;
		const token = authorizationHeader.split(' ')[1];
		jwt.verify(token, tokenSecret);
	} catch (err) {
		res.status(401);
		res.json('Access denied, invalid token');
		return;
	}
	const deleted = await store.delete(req.params.id);
	res.json(deleted);
};

const update = async (req: Request, res: Response) => {
	try {
		const authorizationHeader = req.headers.authorization as string;
		const token = authorizationHeader.split(' ')[1];
		jwt.verify(token, tokenSecret);
	} catch (err) {
		res.status(401);
		res.json('Access denied, invalid token');
		return;
	}
	const orders = await store.update(req.params.id, req.body.quantity);
	res.json(orders);
};

const OrderRoutes = (app: express.Application) => {
	app.get('/orders', index);
	app.get('/orders/:user_id', show);
	app.post('/orders', create);
	app.put('/orders/:id', update);
	app.delete('/orders/:id', destroy);
};

export default OrderRoutes;
