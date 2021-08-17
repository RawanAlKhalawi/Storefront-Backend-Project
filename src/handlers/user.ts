import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new UserStore();
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
  const users = await store.index();
  res.json(users);
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
  const user = await store.show(req.params.id);
  res.json(user);
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
  const user: User = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err + user);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(user.username, user.password);
    var token = jwt.sign({ user: u }, tokenSecret);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};
const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.post('/auth', authenticate);
};

export default userRoutes;
