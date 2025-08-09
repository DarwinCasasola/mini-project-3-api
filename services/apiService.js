const axios = require('axios');
const { CoffeeShop } = require('../models');

function mapFeatureToRow(feature) {
  const p = feature.properties || {};
  const g = feature.geometry?.coordinates || [];
  return {
    externalId: p.place_id?.toString() || `${p.osm_type || 'osm'}:${p.osm_id || ''}`,
    name: p.name || p.street || 'Unknown',
    address: p.formatted || [p.housenumber, p.street, p.city, p.state, p.country].filter(Boolean).join(', '),
    city: p.city || null,
    state: p.state || null,
    country: p.country || null,
    postcode: p.postcode || null,
    lat: g[1] ?? null,
    lon: g[0] ?? null,
    website: p.website || null,
    phone: p.datasource?.raw?.contact?.phone || null,
    category: 'cafe'
  };
}

async function fetchAndSeedCoffeeShops() {
  const { GEOAPIFY_KEY, SEED_LAT, SEED_LON, SEED_RADIUS_METERS } = process.env;
  if (!GEOAPIFY_KEY) {
    console.warn('GEOAPIFY_KEY missing—skipping seed.');
    return;
  }

  const url = 'https://api.geoapify.com/v2/places';
  const params = {
    categories: 'catering.cafe',
    filter: `circle:${SEED_LON},${SEED_LAT},${SEED_RADIUS_METERS || 5000}`,
    limit: 100,
    apiKey: GEOAPIFY_KEY
  };

  const res = await axios.get(url, { params });
  const features = res.data?.features || [];
  let upserts = 0;

  for (const f of features) {
    const row = mapFeatureToRow(f);
    if (!row.externalId) continue;

    const [record, created] = await CoffeeShop.findOrCreate({
      where: { externalId: row.externalId },
      defaults: row
    });
    if (!created) await record.update(row);
    upserts++;
  }

  console.log(`Seeded/updated ${upserts} coffee shops.`);
}

module.exports = { fetchAndSeedCoffeeShops };
