require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { initDb } = require('./models');
const { fetchAndSeedCoffeeShops } = require('./services/apiService');
const coffeeRoutes = require('./routes/coffeeRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/coffees', coffeeRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await initDb();
    await fetchAndSeedCoffeeShops(); // seed on startup
    app.listen(PORT, () => {
      console.log(`API running http://localhost:${PORT}`);
      console.log(`Swagger docs http://localhost:${PORT}/docs`);
    });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
})();
