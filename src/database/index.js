import Sequelize from 'sequelize';

import configDatabse from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Dispatcher from '../app/models/Dispatcher';
import File from '../app/models/File';
import Signature from '../app/models/Signature';
import Order from '../app/models/Order';
import Problem from '../app/models/Problem';

const models = [User, Order, Problem, Recipient, Dispatcher, Signature, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDatabse);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
