import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll();
    return res.json(orders);
  }

  async store(req, res) {
    const order = await Order.create(req.body);
    return res.json(order);
  }
}

export default new OrderController();
