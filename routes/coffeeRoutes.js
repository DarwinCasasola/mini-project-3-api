const express = require('express');
const ctrl = require('../controllers/coffeeController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CoffeeShops
 *   description: CRUD for coffee shops
 */

/**
 * @swagger
 * /api/coffees:
 *   get:
 *     summary: List coffee shops (optionally filter by city)
 *     tags: [CoffeeShops]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *     responses:
 *       200:
 *         description: A list of coffee shops
 *   post:
 *     summary: Create a coffee shop
 *     tags: [CoffeeShops]
 *     responses:
 *       201:
 *         description: Created
 */
router.route('/')
  .get(ctrl.getCoffeeShops)
  .post(ctrl.createCoffeeShop);

/**
 * @swagger
 * /api/coffees/{id}:
 *   get:
 *     summary: Get a coffee shop by id
 *     tags: [CoffeeShops]
 *   put:
 *     summary: Update a coffee shop by id
 *     tags: [CoffeeShops]
 *   delete:
 *     summary: Delete a coffee shop by id
 *     tags: [CoffeeShops]
 */
router.route('/:id')
  .get(ctrl.getCoffeeShopById)
  .put(ctrl.updateCoffeeShop)
  .delete(ctrl.deleteCoffeeShop);

module.exports = router;
