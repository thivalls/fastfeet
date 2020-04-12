import { Op } from 'sequelize';

import Order from '../models/Order';
import Dispatcher from '../models/Dispatcher';

class DeliveryController {
  async index(req, res) {
    const { id: dispatcher_id } = req.params;
    const { status } = req.query;

    if (status) {
      const orders = await Order.findAll({
        where: {
          dispatcher_id,
          canceled_at: null,
          end_date: {
            [Op.not]: null,
          },
        },
      });

      return res.json(orders);
    }

    const orders = await Order.findAll({
      where: {
        dispatcher_id,
        canceled_at: null,
        end_date: null,
      },
    });

    return res.json(orders);
  }

  async update(req, res) {
    const dispatcher = await Dispatcher.findByPk(req.params.id);

    if (!dispatcher) {
      return res.status(400).json({ error: 'Dispatcher not found' });
    }

    const order = await Order.findByPk(req.params.order);

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    if (order.dispatcher_id !== Number(req.params.id)) {
      return res
        .status(400)
        .json({ error: 'You have access only in your orders' });
    }

    await order.update(req.body);

    return res.json(order);
  }
}

export default new DeliveryController();
