let ccxt = require("ccxt");



let exchange = new ccxt['kucoin']({
    'apiKey': 'dsasdas',
    'secret': 'this.secret'
  });
// console.log(exchange.proxy)
exchange.fetch_ticker('OCN/ETH')