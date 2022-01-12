const axios = require('axios');
const delay = require('delay');
const CRYPTOCOMPARE_KEY = process.env.CRYPTOCOMPARE_API_KEY;
const CRYPTOCOMPARE_API_URL = 'https://min-api.cryptocompare.com/data/price';
const THROTTLE_API_MS = 1000;

const TOP_TOKENS = [
  {
    symbol: 'IOST',
    address: '0xFA1a856Cfa3409CFa145Fa4e20Eb270dF3EB21ab',
    stable: false,
  },
  {
    symbol: 'AOA',
    address: '0x9ab165D795019b6d8B3e971DdA91071421305e5a',
    stable: false,
  },
  {
    symbol: 'THETA',
    address: '0x3883f5e181fccaF8410FA61e12b59BAd963fb645',
    stable: false,
  },
  {
    symbol: 'LRC',
    address: '0xEF68e7C694F40c8202821eDF525dE3782458639f',
    stable: false,
  },
  {
    symbol: 'MANA',
    address: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
    stable: false,
  },
  {
    symbol: 'NEXO',
    address: '0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206',
    stable: false,
  },
  {
    symbol: 'DENT',
    address: '0x3597bfD533a99c9aa083587B074434E61Eb0A258',
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
