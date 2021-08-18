import express, { Request, Response } from 'express';
import { OrderPoductStore } from '../models/orderPoduct';
import jwt from 'jsonwebtoken';

const store = new OrderPoductStore();
const tokenSecret = process.env.TOKEN_SECRET as string;

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
        const quantity = req.body.quantity;
        const orderId = req.params.id;
        const productId = req.body.product_id;

        const newOrder = await store.addProduct(quantity, orderId, productId);
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
    app.post('/orders/:id/products', create);
    app.put('/orders/:id/products', update);
    app.delete('/orders/:id/products', destroy);
};

export default OrderRoutes;
