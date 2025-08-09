const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coffee Shops API',
      version: '1.0.0',
      description: 'Mini Project 3 — CRUD with MySQL + Sequelize; seeded from Geoapify'
    }
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);
