let ccxt = require('ccxt'); //https://github.com/ccxt/ccxt/wiki/Manual

export default class Bot {
  /**
   * 交易机器人
   * 
   * @param {String} createWindow 创造机器人的window 
   * @param {String} exchange 交易所， 默认：'huobipro'
   * @param {String} symbol 交易市场， 默认：'OCN/ETH'
   * @param {String} apiKey 
   * @param {String} secret 
   */
  constructor({createWindow, exchange = 'huobipro', symbol = 'OCN/ETH', apiKey, secret}) {
    if(!createWindow){
      throw new Error('Argument error')
    }
    this.createWindow = createWindow;
    this.exchange = exchange;
    this.symbol = symbol;
    this.apiKey = apiKey;
    this.secret = secret;

    this.exchange = new ccxt[this.exchange]({
      'apiKey': this.apiKey,
      'secret': this.secret
    });

    this.count = 1;
    this.orders = [];
    this.running = false;

    this.tradeTimmer = null;
    this.sellamount=0;
    this.buyamount=0;
  }

  /**
   * 
   * @param {Number} bidNarrowVolume 
   * @param {Number} askNarrowVolume 
   * @param {Number} narrowWaitTime 
   * @param {Number} maxVolume 
   * @param {Number} minVolume 
   */
  // 随机
  generateRandomOrders(bidNarrowVolume = 1, askNarrowVolume = 1, narrowWaitTime = 5, maxVolume = 3, minVolume = 1,spacePrice=0.00000002) {
    this.createWindow.send('log', '######开始在买1卖1中间随机挂单######')
    this.running = true;
    this.makeRandomOrder(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume,spacePrice)
  }
  // 上行
  generateRandomOrdersTop(bidNarrowVolume = 1, askNarrowVolume = 1, narrowWaitTime = 5, maxVolume = 3, minVolume = 1,spacePrice=0.00000002) {
    this.createWindow.send('log', '######开始在买1附近随机挂单######')
    this.running = true;
    this.makeRandomOrderTop(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume,spacePrice)
  }
  // 下行
  generateRandomOrdersBot(bidNarrowVolume = 1, askNarrowVolume = 1, narrowWaitTime = 5, maxVolume = 3, minVolume = 1,spacePrice=0.00000002) {
    this.createWindow.send('log', '######开始在卖1附近随机挂单######')
    this.running = true;
    this.makeRandomOrderBot(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume,spacePrice)
  }
// 随机
  async makeRandomOrder(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume,spacePrice) {
    try {
      if(!this.running){
        clearTimeout(this.tradeTimmer);
        this.createWindow.send('log', `######挂单停止######`);
        return;
      }
      this.createWindow.send('run', "11");
      // 获取卖1买1
      this.createWindow.send('log', `======开始第${this.count}轮随机挂单======`)
      let {
        ask,
        askVolume,
        bid,
        bidVolume
      } = await this.exchange.fetch_ticker(this.symbol);

      let volume, price;

      //扩大价格区间
      //成交买1
      if (bidVolume < bidNarrowVolume) {
        volume = bidVolume.toFixed(2);
        if (bidVolume < 1.0) {
          bidVolume = '1.00';
        }
        await this.sell(bid.toFixed(8), volume);
      }
      //成交卖1
      if (askVolume < askNarrowVolume) {
        volume = askVolume.toFixed(2);
        if (askVolume < 1.0) {
          askVolume = '1.00';
        }
        await this.buy(ask.toFixed(8), volume);
      }

      //区间太小就不交易
      if (ask - bid < spacePrice) {
        this.createWindow.send('log', `=====区间太小,终止第${this.count}轮随机挂单======`)
        this.tradeTimmer = setTimeout(() => {
          this.makeRandomOrder(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume,spacePrice);
        }, narrowWaitTime * 1000);
        return; 
      }

      //在买1卖1中间随机挂单
      price = bid + 0.00000001 + (ask - bid - 0.00000002) * Math.random()
      volume = Math.random() * (maxVolume - minVolume) + minVolume;
      await this.sell(price.toFixed(8), volume.toFixed(2));
      await this.buy(price.toFixed(8), volume.toFixed(2));

      if (this.orders.length >= 6) {
        this.createWindow.send('log', `======挂单数大于6，清空挂单======`)
        await this.cancelOrders();
      }
      this.createWindow.send('log', `======完成第${this.count}轮随机挂单======`)
      this.count++;
      if(this.running){
        this.tradeTimmer = setTimeout(() => {
          this.makeRandomOrder(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume);
        }, Math.random() *narrowWaitTime*1000 + 2000);
      }else{
        clearTimeout(this.tradeTimmer);
        this.createWindow.send('log', `######挂单停止######`);
      }
    }catch(e){
      // this.running = false;
      this.createWindow.send('error', `######随机挂单错误######\n ${e}`)
    }

  }


// 上行


async makeRandomOrderTop(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume,spacePrice) {
  try {
    if(!this.running){
      clearTimeout(this.tradeTimmer);
      this.createWindow.send('log', `######挂单停止######`);
      return;
    }
    this.createWindow.send('run', "11");
    // 获取卖1买1
    this.createWindow.send('log', `======开始第${this.count}轮随机挂单======`)
    let {
      ask,
      askVolume,
      bid,
      bidVolume
    } = await this.exchange.fetch_ticker(this.symbol);

    let volume, price;

    //扩大价格区间
    //成交买1
    if (bidVolume < bidNarrowVolume) {
      volume = bidVolume.toFixed(2);
      if (bidVolume < 1.0) {
        bidVolume = '1.00';
      }
      await this.sell(bid.toFixed(8), volume);
    }
    //成交卖1
    if (askVolume < askNarrowVolume) {
      volume = askVolume.toFixed(2);
      if (askVolume < 1.0) {
        askVolume = '1.00';
      }
      await this.buy(ask.toFixed(8), volume);
    }

    //区间太小就不交易
    if (ask - bid < spacePrice) {
      this.createWindow.send('log', `=====区间太小,终止第${this.count}轮随机挂单======`)
      this.tradeTimmer = setTimeout(() => {
        this.makeRandomOrderTop(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume,spacePrice);
      }, narrowWaitTime * 1000);
      return; 
    }

    //在买1附近随机挂单
    price = ask - 0.00000001  * ((Math.random()-0.5)*2)
    volume = Math.random() * (maxVolume - minVolume) + minVolume;
    await this.sell(price.toFixed(8), volume.toFixed(2));
    await this.buy(price.toFixed(8), volume.toFixed(2));

    if (this.orders.length >= 6) {
      this.createWindow.send('log', `======挂单数大于6，清空挂单======`)
      await this.cancelOrders();
    }
    this.createWindow.send('log', `======完成第${this.count}轮随机挂单======`)
    this.count++;
    if(this.running){
      this.tradeTimmer = setTimeout(() => {
        this.makeRandomOrderTop(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume);
      }, Math.random() *narrowWaitTime*1000 + 2000);
    }else{
      clearTimeout(this.tradeTimmer);
      this.createWindow.send('log', `######挂单停止######`);
    }
  }catch(e){
    // this.running = false;
    this.createWindow.send('error', `######随机挂单错误######\n ${e}`)
  }
  

}

// 下行
async makeRandomOrderBot(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume,spacePrice) {
  try {
    if(!this.running){
      clearTimeout(this.tradeTimmer);
      this.createWindow.send('log', `######挂单停止######`);
      return;
    }
    this.createWindow.send('run', "11");
    // 获取卖1买1
    this.createWindow.send('log', `======开始第${this.count}轮随机挂单======`)
    let {
      ask,
      askVolume,
      bid,
      bidVolume
    } = await this.exchange.fetch_ticker(this.symbol);

    let volume, price;

    //扩大价格区间
    //成交买1
    if (bidVolume < bidNarrowVolume) {
      volume = bidVolume.toFixed(2);
      if (bidVolume < 1.0) {
        bidVolume = '1.00';
      }
      await this.sell(bid.toFixed(8), volume);
    }
    //成交卖1
    if (askVolume < askNarrowVolume) {
      volume = askVolume.toFixed(2);
      if (askVolume < 1.0) {
        askVolume = '1.00';
      }
      await this.buy(ask.toFixed(8), volume);
    }

    //区间太小就不交易
    if (ask - bid < spacePrice) {
      this.createWindow.send('log', `=====区间太小,终止第${this.count}轮随机挂单======`)
      this.tradeTimmer = setTimeout(() => {
        this.makeRandomOrderBot(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume,spacePrice);
      }, narrowWaitTime * 1000);
      return; 
    }

    //在买1附近随机挂单
    price = bid + 0.00000001  * ((Math.random()-0.5)*2)
    volume = Math.random() * (maxVolume - minVolume) + minVolume;
    await this.sell(price.toFixed(8), volume.toFixed(2));
    await this.buy(price.toFixed(8), volume.toFixed(2));

    if (this.orders.length >= 6) {
      this.createWindow.send('log', `======挂单数大于6，清空挂单======`)
      await this.cancelOrders();
    }
    this.createWindow.send('log', `======完成第${this.count}轮随机挂单======`)
    this.count++;
    if(this.running){
      this.tradeTimmer = setTimeout(() => {
        this.makeRandomOrderBot(bidNarrowVolume, askNarrowVolume, narrowWaitTime, maxVolume, minVolume);
      }, Math.random() *narrowWaitTime*1000 + 2000);
    }else{
      clearTimeout(this.tradeTimmer);
      this.createWindow.send('log', `######挂单停止######`);
    }
  }catch(e){
    // this.running = false;
    this.createWindow.send('error', `######随机挂单错误######\n ${e}`)
  }
  

}

  async buy(price, volume) {
    try {
      let order = await this.exchange.create_order(this.symbol, "limit", "buy", volume, price, {
        'trading_agreement': 'agree'
      });
      this.buyamount += Number(volume);
      this.createWindow.send('log', `买入挂单成功：价格：${price};数量：${volume};累计买入: ${this.buyamount}`);
      this.createWindow.send('buyAmount', this.buyamount)
      this.orders.push(order["id"])
    } catch (e) {
      // this.running = false;
      this.createWindow.send('error', `######买入挂单失败：价格：${price};数量：${volume}######\n ${e}`)
    }
  }

  async sell(price, volume) {
    try {
      let order = await this.exchange.create_order(this.symbol, "limit", "sell", volume, price, {
        'trading_agreement': 'agree'
      });
      this.sellamount += Number(volume) ;
      this.createWindow.send('log', `卖出挂单成功：价格：${price};数量：${volume};累计卖出: ${this.sellamount}`)
      this.createWindow.send('sellAmount', this.sellamount)
      this.orders.push(order["id"])

    } catch (e) {
      // this.running = false;
      this.createWindow.send('error', `######卖出挂单失败：价格：${price};数量：${volume}######\n ${e}`)
    }
  }

  async cancelOrders() {
    try{
      for (let id of this.orders) {
        this.exchange.cancel_order(id, this.symbol);
      }
      this.orders = [];
      this.createWindow.send('log', `======清空挂单完成======`)
    } catch (e) {
      {e}
    }
  }

  async kk(sender){
    
        sender.send('back4', '停止')
    
    
  
   
  }

  stop() {
    this.running = false;
    // this.count = 1;
    // clearInterval(this.tradeTimmer)
    // this.sender.send('log', '成功停止')
  }
  
}
