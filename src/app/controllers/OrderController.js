import Order from '../models/Order';
import Dispatcher from '../models/Dispatcher';
import Recipient from '../models/Recipient';

import Mail from '../../lib/Mail';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        canceled_at: null,
      },
    });
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
        order: order.id,
        dispatcher: dispatcher.name,
        recipient: recipient.name,
        address: recipient.address,
        product: order.product,
      },
    });
    return res.json(order);
  }

  async update(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'order not found' });
    }

    await order.update(req.body);
    const dispatcher = await Dispatcher.findByPk(order.dispatcher_id);
    const recipient = await Recipient.findByPk(order.recipient_id);

    await Mail.sendMail({
      to: `${dispatcher.name} <${dispatcher.email}>`,
      subject: 'Entrega atualizada',
      template: 'updated-order',
      context: {
        order: order.id,
        dispatcher: dispatcher.name,
        recipient: recipient.name,
        address: recipient.address,
        product: order.product,
      },
    });
    return res.json(order);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'order not found' });
    }
    const { dispatcher_id, id: orderId } = order;

    await order.destroy();

    const dispatcher = await Dispatcher.findByPk(dispatcher_id);

    await Mail.sendMail({
      to: `${dispatcher.name} <${dispatcher.email}>`,
      subject: 'Entrega cancelada',
      template: 'deleted-order',
      context: {
        order: orderId,
        dispatcher: dispatcher.name,
      },
    });
    return res.status(200).json();
  }
}

export default new OrderController();
