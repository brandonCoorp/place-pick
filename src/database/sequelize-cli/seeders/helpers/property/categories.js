const { normalizeString } = require('./text');

const CATEGORY_IDS = {
  HOUSE: 'a86e4096-7847-47a1-b723-5682c6880cc0',
  APARTMENT: 'a113df66-668a-4748-b281-522d70b235eb',
  ROOM: '45730d0a-769d-4240-ac4a-cd995bc7aa59',
  LAND: '59bf9272-703f-421d-82ae-6044a32a6131',
  SHOP: '55d089d6-029a-4a97-bf09-1ce8e40d4e29',
  OFFICE: '38112d9e-4ec2-4b52-855c-050d9ccbbf57',
  WAREHOUSE: 'fd1987cc-4aa9-4774-b94a-2edcce027758',
  COMMERCIAL: '6e8e3783-0ab4-4cc3-b0cd-3baec26ff663',
};

function addCategory(categories, categoryId) {

  if (!categories.includes(categoryId)) {
    categories.push(categoryId);
  }
}

function detectCategories(item) {

  const categories = [];

  // NORMALIZAR
  const title = normalizeString(
    item.title || ''
  );

  const description = normalizeString(
    item.description || ''
  );

  // TITLE TIENE PRIORIDAD
  const source = `${title} ${description}`;

  // ====================================
  // HOUSE = EXCLUSIVA ABSOLUTA
  // ====================================

  if (
    title.includes('casa') ||
    title.includes('cabana') ||
    title.includes('cabaña')
  ) {

    return [CATEGORY_IDS.HOUSE];
  }

  // ====================================
  // APARTMENT = EXCLUSIVA ABSOLUTA
  // ====================================

  if (
    title.includes('departamento') ||
    title.includes('apartamento') ||
    title.includes('monoambiente') ||
    title.includes('dpto') || title.includes('depto')
  ) {

    return [CATEGORY_IDS.APARTMENT];
  }

  // ====================================
  // FALLBACK DESCRIPTION
  // ====================================

  if (
    description.includes('casa') ||
    description.includes('cabana') ||
    description.includes('cabaña')
  ) {

    return [CATEGORY_IDS.HOUSE];
  }

  if (
    description.includes('departamento') ||
    description.includes('apartamento') ||
    description.includes('monoambiente') ||
    description.includes('dpto') || description.includes('depto')
  ) {

    return [CATEGORY_IDS.APARTMENT];
  }

  // ====================================
  // OFFICE
  // ====================================

  if (
    source.includes('oficina') ||
    source.includes('corporativo') || source.includes('edificio')
  ) {

    addCategory(
      categories,
      CATEGORY_IDS.OFFICE,
    );
  }

  // ====================================
  // COMMERCIAL
  // ====================================

  if (
    source.includes('local comercial') ||
    source.includes('comercial') || source.includes('local')
  ) {

    addCategory(
      categories,
      CATEGORY_IDS.COMMERCIAL,
    );
  }

  // ====================================
  // SHOP
  // ====================================

  if (
    source.includes('tienda')
  ) {

    addCategory(
      categories,
      CATEGORY_IDS.SHOP,
    );
  }

  // ====================================
  // WAREHOUSE
  // ====================================

  if (
    source.includes('galpon')
  ) {

    addCategory(
      categories,
      CATEGORY_IDS.WAREHOUSE,
    );
  }

  // ====================================
  // ROOM
  // ====================================

  if (
    source.includes('cuarto') ||
    source.includes('habitacion')
  ) {

    addCategory(
      categories,
      CATEGORY_IDS.ROOM,
    );
  }

  // ====================================
  // LAND = ULTIMA PRIORIDAD
  // ====================================

  if (
    categories.length === 0 &&
    (
      source.includes('terreno') ||
      source.includes('lote')
    )
  ) {

    addCategory(
      categories,
      CATEGORY_IDS.LAND,
    );
  }

  // ====================================
  // DEFAULT
  // ====================================

  if (categories.length === 0) {

    categories.push(
      CATEGORY_IDS.APARTMENT
    );
  }

  return categories;
}

module.exports = {
  detectCategories,
  CATEGORY_IDS,
};