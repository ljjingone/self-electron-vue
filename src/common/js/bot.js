let ccxt = require('ccxt');  //https://github.com/ccxt/ccxt/wiki/Manual

function doSomething(count) {
  console.log("第"+count+"次执行")
}

class Bot {
  constructor() {
    this.exchange = 'huobipro';       //交易所
    this.symbol = 'OCN/ETH';    //交易类型
    this.apiKey = '183a2ec2-b575e97b-1b7b059c-c2443';
    this.secret = '42a3edba-64cd725a-0eeffc05-1cd10';
    this.running = false;
    this.count = 0;
    this.orders = [];
    this.exchange = new ccxt[this.exchange]({
      'apiKey': this.apiKey,
      'secret': this.secret
    });
    this.tradeTimmer = null;
  }

  raisePrice(){

  }

  dropPrise() {

  }

  async GenerateRandomOrder() {
    this.running = true;
    await this.trade();
  }

  async trade() {
    
    this. tradeTimmer = setTimeout(() => {
      if(!this.running){
        this.count = 0;
        return;
      }
      this.count = this.count + 1;
      console.log("第"+this.count+"次执行")
    }, 10)
  }

  async order(){
    // 获取卖1买1
    let {ask, askVolume, bid, bidVolume} = await this.exchange.fetch_ticker(this.symbol);
    let volume, price, order;

    //扩大价格区间
    //成交买1
    if(bidVolume < this.maxVolume){
      volume = bidVolume.toFixed(2);
      if(bidVolume < 1.0){
        bidVolume = '1.00';
      }
      order = await this.buy(bid.toFixed(8), volume);
    }
    //成交卖1
    if(askVolume < this.maxVolume){
      volume =askVolumeask.toFixed(2);
      if(askVolume < 1.0){
        askVolume = '1.00';
      }
      await this.sell(ask.toFixed(8), volume);
    }

    //区间太小就不交易
    if(ask - bid < 0.00000002){
      return
    }

    //在买1卖1中间随机挂单
    let price = bid +  0.00000001 + (ask - bid - 0.00000002) * Math.random()
    volume = Math.random() * 30 + 50;
    await this.sell(price, volume);
    await this.buy(price, volume);

    if(this.orders.length >= 6){
      await this.clearOrders();
    }
  }

  async buy(price, volume) {
    let order = await this.exchange.create_order(this.symbol, "limit", "buy", volume, price, {'trading_agreement': 'agree'});
    this.orders.push(order["id"])
  }

  async sell(price, volume) {
    let order = await this.exchange.create_order(this.symbol, "limit", "sell", volume, price, {'trading_agreement': 'agree'})
    this.orders.push(order["id"])
  }

  async clearOrders(){
    for(let id of this.orders){
      this.exchange.cancel_order(id, this.symbol);
    }
    this.orders = [];
  }

  stop() {
    this.running = false;
    this.count = 0;
  }
}

let bot = new Bot();
(async ()=> {
  await bot.clearOrders();
  console.log(bot.orders)
})()


