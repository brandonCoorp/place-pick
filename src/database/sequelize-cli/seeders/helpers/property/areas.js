function normalizeArea(area = '') {

  const normalized = area
    .replace(',', '.')
    .match(/[\d.]+/g);

  if (!normalized) {
    return null;
  }

  const value = Number(normalized[0]);

  if (value > 5000) {
    return null;
  }

  return value;
}

module.exports = {
  normalizeArea,
};
