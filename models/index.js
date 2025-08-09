// /models/index.js
const sequelize = require('../config/db');
const CoffeeShop = require('./CoffeeShop'); // <-- exactly this

const initDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('DB connected & synced');
};

module.exports = { sequelize, CoffeeShop, initDb };
