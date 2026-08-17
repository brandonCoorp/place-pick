const { normalizeString } = require('./text');

const CONTRACT_IDS = {
  SALE: 'deca80d1-642d-4c77-b422-9829fa2b6272',
  RENT: '07f6f6da-322a-4e9a-bc99-c30d09985677',
  ANTICRETIC: '42606a49-2cd7-4b93-bac1-4548dd798f12',
  DAY: '319d3bd8-3f44-4c94-9b0e-86622fb715b7',
  WEEK: 'f85f8dff-67ba-4108-88e0-83f859a8b9c3',
};

function detectContractTypes(item) {

  const contracts = [];

  const source = normalizeString(`
    ${item.title}
    ${item.description}
  `);

  function push(id) {
    if (!contracts.includes(id)) {
      contracts.push(id);
    }
  }

  if (
    source.includes('por dia') ||
    source.includes('por día')
  ) {
    push(CONTRACT_IDS.DAY);
  }

  if (source.includes('por semana')) {
    push(CONTRACT_IDS.WEEK);
  }

  if (
    source.includes('anticretico') ||
    source.includes('anticrético')
  ) {
    push(CONTRACT_IDS.ANTICRETIC);
  }

  if (
    source.includes('venta') ||
    source.includes('vendo')
  ) {
    push(CONTRACT_IDS.SALE);
  }

  if (
    source.includes('alquiler') ||
    source.includes('alquilo')
  ) {
    push(CONTRACT_IDS.RENT);
  }

  if (contracts.length === 0) {
    push(CONTRACT_IDS.RENT);
  }

  return contracts;
}

module.exports = {
  detectContractTypes,
  CONTRACT_IDS,
};
