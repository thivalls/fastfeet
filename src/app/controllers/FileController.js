import File from '../models/File';
import Dispatcher from '../models/Dispatcher';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path,
    });

    const dispatcher = await Dispatcher.findByPk(req.params.id);

    dispatcher.update({
      avatar_id: file.id,
    });

    res.json(file);
  }
}

export default new FileController();
