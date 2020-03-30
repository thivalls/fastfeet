import User from '../models/User';

class UserController {
  async index(req, res) {
    const [{ id, name, email }] = await User.findAll();
    return res.json([{ id, name, email }]);
  }

  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(401).json({ error: 'User already exist' });
    }

    const { id, name, email } = await User.create(req.body);
    return res.json({ id, name, email });
  }
}

export default new UserController();
