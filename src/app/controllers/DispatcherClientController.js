import { isBefore, parseISO } from 'date-fns';

import Order from '../models/Order';

class DispatcherClientController {
  async open(req, res) {
    const { id: dispatcher_id } = req.params;

    const openOrders = await Order.findAll({
      where: {
        dispatcher_id,
        canceled_at: null,
        end_date: null,
      },
    });

    return res.json(openOrders);
  }

  async closed(req, res) {
    // const { id: dispatcher_id } = req.params;

    // const openOrders = await Order.findAll({
    //   where: {
    //     dispatcher_id,
    //     canceled_at: null,
    //     end_date: isBefore(new Date()),
    //   },
    // });
    console.log(parseISO(new Date()))

    return res.json(parseISO(new Date()));
  }
}

export default new DispatcherClientController();
