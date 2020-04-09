import Dispatcher from '../models/Dispatcher';
import File from '../models/File';

class DispatcherController {
  async index(req, res) {
    const dispatchers = await Dispatcher.findAll({
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(dispatchers);
  }

  async store(req, res) {
    const { email } = req.body;

    const checkDispatcherEmail = await Dispatcher.findOne({
      where: {
        email,
      },
    });

    if (checkDispatcherEmail) {
      return res.status(401).json({ error: 'This email already exists' });
    }

    const dispatcher = await Dispatcher.create(req.body);
    return res.json(dispatcher);
  }

  async update(req, res) {
    const checkDispatcher = await Dispatcher.findByPk(req.params.id);

    if (!checkDispatcher) {
      return res.status(400).json({ error: 'Dispatcher not found' });
    }

    const dispatcher = await checkDispatcher.update(req.body);

    return res.json(dispatcher);
  }

  async delete(req, res) {
    const checkDispatcher = await Dispatcher.findByPk(req.params.id);

    if (!checkDispatcher) {
      return res.status(400).json({ error: 'Dispatcher not found' });
    }

    await checkDispatcher.destroy();

    return res.status(200).json([]);
  }
}

export default new DispatcherController();
