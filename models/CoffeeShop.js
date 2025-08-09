const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CoffeeShop = sequelize.define('CoffeeShop', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  externalId: { type: DataTypes.STRING(128), unique: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  address: { type: DataTypes.STRING(512) },
  city: { type: DataTypes.STRING(128) },
  state: { type: DataTypes.STRING(128) },
  country: { type: DataTypes.STRING(128) },
  postcode: { type: DataTypes.STRING(32) },
  lat: { type: DataTypes.DECIMAL(9,6) },
  lon: { type: DataTypes.DECIMAL(9,6) },
  website: { type: DataTypes.STRING(512) },
  phone: { type: DataTypes.STRING(64) },
  category: { type: DataTypes.STRING(128), defaultValue: 'cafe' }
}, {
  tableName: 'coffee_shops',
  timestamps: true
});

module.exports = CoffeeShop;
