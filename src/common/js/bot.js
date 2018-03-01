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
    this.rand=1000;
  }

  raisePrice(){

  }

  dropPrise() {
    return "jjjjjjj";
  }

  async GenerateRandomOrder() {
    this.running = true;
    await this.trade();
  }

  async trade() {
    let _this = this;
    
      let _data=new Date()
      _this.tradeTimmer=setInterval( () => {
        this.rand= Math.random()*1000+1000;
        _this.count = _this.count + 1;
        console.log((new Date()-_data)+"第"+_this.count+"次执行")
        
        
      }, this.rand)
    
    return("成功运行")
  }

  stop() {
    this.running = false;
    this.count = 0;
    clearInterval(this.tradeTimmer)
    return("成功停止")
  }
}



let bot = new Bot();

bot.trade()

setTimeout(() => {bot.stop()}, 8000)
