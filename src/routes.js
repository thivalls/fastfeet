import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
// import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
// routes.post('/users', UserController.store);

routes.use(authMiddleware);

// routes.get('/users', UserController.index);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);

export default routes;
