import { Router } from 'express';
import multer from 'multer';

import SessionController from './app/controllers/SessionController';
// import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import DispatcherController from './app/controllers/DispatcherController';
import OrderController from './app/controllers/OrderController';
import FileController from './app/controllers/FileController';
import SignatureController from './app/controllers/SignatureController';

import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/sessions', SessionController.store);
// routes.post('/users', UserController.store);

routes.use(authMiddleware);

// routes.get('/users', UserController.index);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);

routes.get('/dispatchers', DispatcherController.index);
routes.post('/dispatchers', DispatcherController.store);
routes.put('/dispatchers/:id', DispatcherController.update);
routes.delete('/dispatchers/:id', DispatcherController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);

// UPLOADS
routes.post('/files/:id', upload.single('file'), FileController.store);
routes.post(
  '/signatures/:order',
  upload.single('signature'),
  SignatureController.store
);

export default routes;
