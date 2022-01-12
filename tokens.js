const axios = require('axios');
const delay = require('delay');
const CRYPTOCOMPARE_KEY = process.env.CRYPTOCOMPARE_API_KEY;
const CRYPTOCOMPARE_API_URL = 'https://min-api.cryptocompare.com/data/price';
const THROTTLE_API_MS = 1000;

const TOP_TOKENS = [
  {
    symbol: 'CNDL',
    address: '0xbc138bD20C98186CC0342C8e380953aF0cb48BA8',
    stable: false,
  },
   {
    symbol: 'BNB',
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    stable: false,
  },
];

// returns undefined if address not found
function getSymbolByAddress(address) {
  return TOP_TOKENS.filter(token => token.address === address)[0].symbol;
}

function getRateBySymbol(symbol) {
  const filtered = TOP_TOKENS.filter(token => token.symbol === symbol);
  const rate = filtered[0].rate;
  return rate ? rate : 0;
}

function isStable(symbol) {
  return TOP_TOKENS.find(token => token.symbol === symbol).stable;
}

function getTokenInfo() {
  TOP_TOKENS.map((token, index) => {
    let cryptocomparePath = `${CRYPTOCOMPARE_API_URL}?fsym=${
      token.symbol
    }&tsyms=USD&?&api_key=${CRYPTOCOMPARE_KEY}`;
    setTimeout(() => {
      axios
        .get(cryptocomparePath)
        .then(response => {
          token.rate = response.data.USD;
          console.log(`${token.symbol} price=$${token.rate}`);
        })
        .catch(err => {
          console.log('Axios error', err);
        });
    }, THROTTLE_API_MS * index);
  });
}

module.exports = {
  topTokens: TOP_TOKENS,
  getSymbolByAddress,
  getRateBySymbol,
  isStable,
  config: getTokenInfo,
};
