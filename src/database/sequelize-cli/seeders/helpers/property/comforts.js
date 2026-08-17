const { normalizeString } = require('./text');

const COMFORT_IDS = {
  BEDROOM_1: 'ad81bce2-4ee8-47a0-8e36-412999ded006',
  BEDROOM_2: '1b9d3664-c33a-406a-b32d-d91e3d1648be',
  BEDROOM_3: '53f95527-5712-442f-8950-f2a17d467b09',

  BATHROOM_1: 'ef62e3bf-10f0-49f1-a148-6011cb94e4d4',
  BATHROOM_2: '5c63e89f-73ca-4ab8-a5b8-f679f8b26148',

  GARAGE: '06a77ef4-270a-4696-8016-6abe660637ed',
  POOL: '2e877057-7379-448e-a74f-647d83aa4346',
  SOCIAL_HALL: '117cc14c-e5d8-48c1-98f5-fe7c4759b3c9',
  GARDEN: '6dcf92b6-c45b-420f-9f8b-3effcd161f5b',
  BBQ: '4982a25f-50e9-4a8c-87a8-066813769723',
  ELEVATOR: '6b5c71a5-c3a6-4938-85e7-2e64731bdf2e',
};

function pushComfort(result, comfortId) {
  if (!result.includes(comfortId)) {
    result.push(comfortId);
  }
}

function detectComforts(item) {

  const result = [];

  const source = normalizeString(`
    ${item.title}
    ${item.description}
    ${item.bedrooms}
    ${item.bathrooms}
  `);

  if (
    source.includes('1 dorm') ||
    source.includes('1 dormitorio')
  ) {
    pushComfort(result, COMFORT_IDS.BEDROOM_1);
  }

  if (source.includes('2 dorm')) {
    pushComfort(result, COMFORT_IDS.BEDROOM_2);
  }

  if (
    source.includes('3 dorm') ||
    source.includes('4 dorm')
  ) {
    pushComfort(result, COMFORT_IDS.BEDROOM_3);
  }

  if (source.includes('1 baño')) {
    pushComfort(result, COMFORT_IDS.BATHROOM_1);
  }

  if (
    source.includes('2 baño') ||
    source.includes('3 baño') ||
    source.includes('4 baño')
  ) {
    pushComfort(result, COMFORT_IDS.BATHROOM_2);
  }

  if (
    source.includes('piscina') ||
    source.includes('pileta')
  ) {
    pushComfort(result, COMFORT_IDS.POOL);
  }

  if (
    source.includes('garaje') ||
    source.includes('parqueo')
  ) {
    pushComfort(result, COMFORT_IDS.GARAGE);
  }

  if (source.includes('churrasquera')) {
    pushComfort(result, COMFORT_IDS.BBQ);
  }

  if (
    source.includes('ascensor') ||
    source.includes('elevador')
  ) {
    pushComfort(result, COMFORT_IDS.ELEVATOR);
  }

  if (
    source.includes('jardin') ||
    source.includes('areas verdes')
  ) {
    pushComfort(result, COMFORT_IDS.GARDEN);
  }

  if (
    source.includes('salon') ||
    source.includes('salón')
  ) {
    pushComfort(result, COMFORT_IDS.SOCIAL_HALL);
  }

  return result;
}

module.exports = {
  detectComforts,
  COMFORT_IDS,
};
