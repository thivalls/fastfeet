import Signature from '../models/Signature';
import Order from '../models/Order';

class SignatureController {
  async store(req, res) {
    const checkOrder = await Order.findByPk(req.params.order);

    if (!checkOrder) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const { originalname: name, filename: path } = req.file;

    const signature = await Signature.create({
      name,
      path,
    });

    await checkOrder.update({
      signature_id: signature.id,
    });

    return res.json(checkOrder);
  }
}

export default new SignatureController();
