import Sequelize from 'sequelize';

import configDatabse from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Dispatcher from '../app/models/Dispatcher';
import File from '../app/models/File';

const models = [User, Recipient, Dispatcher, File];

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
