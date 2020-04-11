import Order from '../models/Order';
import Dispatcher from '../models/Dispatcher';
import Recipient from '../models/Recipient';

import Mail from '../../lib/Mail';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll();
    return res.json(orders);
  }

  async store(req, res) {
    const order = await Order.create(req.body);
    const dispatcher = await Dispatcher.findByPk(req.body.dispatcher_id);
    const recipient = await Recipient.findByPk(req.body.recipient_id);

    await Mail.sendMail({
      to: `${dispatcher.name} <${dispatcher.email}>`,
      subject: 'Nova entrega',
      template: 'new-order',
      context: {
        dispatcher: dispatcher.name,
        recipient: recipient.name,
        address: recipient.address,
        product: order.product,
      },
    });
    return res.json(order);
  }
}

export default new OrderController();
