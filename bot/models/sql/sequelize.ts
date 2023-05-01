import { Sequelize } from 'sequelize';

import config from '../../config.js';

console.log(`Connecting to ${config.pgDatabase}`);

export const sequelize = new Sequelize(
  config.pgDatabase,
  config.pgUser,
  config.pgPassword,
  {
    host: config.pgHost,
    port: Number(config.pgPort),
    dialect: 'postgres',
    dialectOptions : {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  }
);
