import Problem from '../models/Problem';
import Order from '../models/Order';

class ProblemController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        canceled_at: null,
      },
      include: {
        association: 'problems',
        attributes: ['id', 'description'],
      },
    });

    // Filtering only orders with problems
    const filter = orders.filter((order) => {
      return order.problems.length > 0;
    });

    return res.json(filter);
  }

  async store(req, res) {
    const data = req.body;
    data.order_id = req.params.id;
    const problem = await Problem.create(data);
    return res.json(problem);
  }

  async show(req, res) {
    const order = await Order.findByPk(req.params.id, {
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'dispatcher_id',
        'recipient_id',
        'signature_id',
      ],
      include: {
        association: 'problems',
        attributes: ['id', 'description'],
      },
    });

    return res.json(order);
  }

  async delete(req, res) {
    const problem = await Problem.findByPk(req.params.id);

    if (!problem) {
      return res.status(400).json({ error: 'Order not found' });
    }

    await problem.destroy();

    return res.status(200).json();
  }
}

export default new ProblemController();
