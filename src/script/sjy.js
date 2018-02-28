import ccxt from 'ccxt';

const MIN_EXCHANGE_PRICE = 0.00000001;

/**
 * @param 
 */
export function generate_order() {
  // console.log (ccxt.exchanges)
  return ccxt.exchanges;
};

export function f2() {
  // console.log (ccxt.exchanges)
  (async () => {
    let kraken = new ccxt.kraken ()
    let markets = await kraken.load_markets ()
    console.log (markets['XLM/EUR'])
}) ()
};
