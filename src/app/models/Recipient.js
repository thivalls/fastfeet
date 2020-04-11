import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        cep: Sequelize.STRING,
        address: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${this.street}, ${this.number} - ${this.city}/${this.state} - CEP: ${this.cep}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default Recipient;
