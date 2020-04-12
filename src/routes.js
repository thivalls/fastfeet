import { Router } from 'express';
import multer from 'multer';

import SessionController from './app/controllers/SessionController';
// import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import DispatcherController from './app/controllers/DispatcherController';
import OrderController from './app/controllers/OrderController';
import FileController from './app/controllers/FileController';
import SignatureController from './app/controllers/SignatureController';
import DeliveryController from './app/controllers/DeliveryController';
import ProblemController from './app/controllers/ProblemController';

import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/sessions', SessionController.store);
// routes.post('/users', UserController.store);

routes.get('/dispatchers/:id/deliveries', DeliveryController.index);
routes.put('/dispatchers/:id/deliveries/:order', DeliveryController.update);

routes.post('/orders/:id/problems', ProblemController.store);

routes.use(authMiddleware);

routes.get('/orders/problems', ProblemController.index);
routes.get('/orders/:id/problems', ProblemController.show);
routes.delete('/orders/:id/problems', ProblemController.show);

// routes.get('/users', UserController.index);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);

routes.get('/dispatchers', DispatcherController.index);
routes.post('/dispatchers', DispatcherController.store);
routes.put('/dispatchers/:id', DispatcherController.update);
routes.delete('/dispatchers/:id', DispatcherController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

// UPLOADS
routes.post('/files/:id', upload.single('file'), FileController.store);
routes.post(
  '/signatures/:order',
  upload.single('signature'),
  SignatureController.store
);

export default routes;
