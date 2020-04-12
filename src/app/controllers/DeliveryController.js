import { Op } from 'sequelize';

import Order from '../models/Order';

class DeliveryController {

  async index(req, res) {
    const { id: dispatcher_id } = req.params;
    const { status } = req.query;

    if(status) {
      const orders = await Order.findAll({
        where: {
          dispatcher_id,
          canceled_at: null,
          end_date: {
            [Op.not] : null
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
}

export default new DeliveryController();
