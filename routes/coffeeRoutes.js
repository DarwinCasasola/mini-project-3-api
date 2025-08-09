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
 *         description: Filter results by city name
 *     responses:
 *       200:
 *         description: List of coffee shops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CoffeeShop'
 *   post:
 *     summary: Create a coffee shop
 *     tags: [CoffeeShops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CoffeeShopCreate'
 *           example:
 *             name: Demo Cafe
 *             address: 123 Main St
 *             city: Las Vegas
 *             state: NV
 *             country: USA
 *             postcode: "89109"
 *             lat: 36.1147
 *             lon: -115.1728
 *             website: https://democafe.example
 *             phone: 702-555-1234
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoffeeShop'
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A coffee shop
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoffeeShop'
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update a coffee shop by id
 *     tags: [CoffeeShops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CoffeeShopUpdate'
 *           example:
 *             website: https://updated-demo-cafe.example
 *             phone: 702-555-7777
 *     responses:
 *       200:
 *         description: Updated record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoffeeShop'
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete a coffee shop by id
 *     tags: [CoffeeShops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.route('/:id')
  .get(ctrl.getCoffeeShopById)
  .put(ctrl.updateCoffeeShop)
  .delete(ctrl.deleteCoffeeShop);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     CoffeeShop:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         externalId: { type: string, nullable: true }
 *         name: { type: string }
 *         address: { type: string, nullable: true }
 *         city: { type: string, nullable: true }
 *         state: { type: string, nullable: true }
 *         country: { type: string, nullable: true }
 *         postcode: { type: string, nullable: true }
 *         lat: { type: number, nullable: true }
 *         lon: { type: number, nullable: true }
 *         website: { type: string, nullable: true }
 *         phone: { type: string, nullable: true }
 *         category: { type: string, nullable: true }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     CoffeeShopCreate:
 *       type: object
 *       required: [name]
 *       properties:
 *         name: { type: string }
 *         address: { type: string }
 *         city: { type: string }
 *         state: { type: string }
 *         country: { type: string }
 *         postcode: { type: string }
 *         lat: { type: number }
 *         lon: { type: number }
 *         website: { type: string }
 *         phone: { type: string }
 *     CoffeeShopUpdate:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         address: { type: string }
 *         city: { type: string }
 *         state: { type: string }
 *         country: { type: string }
 *         postcode: { type: string }
 *         lat: { type: number }
 *         lon: { type: number }
 *         website: { type: string }
 *         phone: { type: string }
 */
