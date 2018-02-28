let ccxt = require('ccxt');  //https://github.com/ccxt/ccxt/wiki/Manual

function doSomething(count) {
  console.log("第"+count+"次执行")
}

class Bot {
  constructor() {
    this.exchange = 'huobipro';       //交易所
    this.exchangeType = 'OCN/ETH';    //交易类型
    this.apiKey = '88186d8e-969cf6a0-e652f8dd-c7a68';
    this.secret = '3f79d3fc-46870303-8957f125-f0102';
    this.running = false;
    this.count = 0;
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

  stop() {
    this.running = false;
    this.count = 0;
  }
}

let bot = new Bot();

bot.GenerateRandomOrder()

setTimeout(bot.stop(), 5000)
