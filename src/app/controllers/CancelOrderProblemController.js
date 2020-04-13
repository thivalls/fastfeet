import Problem from '../models/Problem';
import Order from '../models/Order';

import Mail from '../../lib/Mail';

class CancelOrderProblemController {
  async delete(req, res) {
    const problem = await Problem.findByPk(req.params.id);

    if (!problem) {
      return res.status(400).json({ error: 'Problem not found' });
    }

    const order = await Order.findByPk(problem.order_id, {
      include: [
        {
          association: 'dispatcher',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!order) {
      return res.status(400).json({ error: 'Problem not found' });
    }

    order.canceled_at = new Date();
    order.problem_id = Number(req.params.id);
    await order.save();

    await Mail.sendMail({
      to: `${order.dispatcher.name} <${order.dispatcher.email}>`,
      subject: 'Entrega cancelada',
      template: 'deleted-order',
      context: {
        order: order.id,
        dispatcher: order.dispatcher.name,
      },
    });

    return res.status(200).json();
  }
}

export default new CancelOrderProblemController();
