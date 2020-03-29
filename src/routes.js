import { Router } from 'express';

const routes = new Router();

routes.get('/', function (req, res) {
    res.json({ message: "Ready to go!!!" })
});

export default routes;