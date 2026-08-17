const EXCHANGE_RATE = 7;

function normalizePrice(priceText = '') {

  const priceUsd =
    Number(
      priceText
        ?.replace('U$S', '')
        ?.replace(/\./g, '')
        ?.replace(',', '.')
        ?.trim(),
    ) || 0;

  return {
    usd: priceUsd,
    bob: Math.round(priceUsd * EXCHANGE_RATE),
    exchangeRate: EXCHANGE_RATE,
  };
}

module.exports = {
  normalizePrice,
};
