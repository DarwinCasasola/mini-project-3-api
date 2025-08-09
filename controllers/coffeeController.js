const { CoffeeShop } = require('../models');

// CREATE
exports.createCoffeeShop = async (req, res) => {
  try {
    const shop = await CoffeeShop.create(req.body);
    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ (list + ?city=)
exports.getCoffeeShops = async (req, res) => {
  try {
    const where = {};
    if (req.query.city) where.city = req.query.city;
    const shops = await CoffeeShop.findAll({ where, order: [['name', 'ASC']] });
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ (one)
exports.getCoffeeShopById = async (req, res) => {
  try {
    const shop = await CoffeeShop.findByPk(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Not found' });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateCoffeeShop = async (req, res) => {
  try {
    const shop = await CoffeeShop.findByPk(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Not found' });
    await shop.update(req.body);
    res.json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteCoffeeShop = async (req, res) => {
  try {
    const shop = await CoffeeShop.findByPk(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Not found' });
    await shop.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
