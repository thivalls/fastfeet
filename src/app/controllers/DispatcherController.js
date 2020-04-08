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
    return res.json({ route: 'match!!!' });
  }

  async delete(req, res) {
    return res.json({ route: 'match!!!' });
  }
}

export default new DispatcherController();
