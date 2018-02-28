import ccxt
import time
import random

okcoin = ccxt.okcoinusd ()
markets = okcoin.load_markets ()
print (okcoin.id, markets)

eth='OCN/ETH' #!!, huobipro
hitbtc = ccxt.huobipro({
    'apiKey': '88186d8e-969cf6a0-e652f8dd-c7a68',
    'secret': '3f79d3fc-46870303-8957f125-f0102',
})

print(ccxt.exchanges)                           #打印所有可调用函数

counter = 0
order_ids = []
while True:
    try:
        counter += 1
        print("第",counter,"次执行")
            
        hit=hitbtc.fetch_ticker(eth)
        top=hit['ask']                          #小数点保留八位
        toplume=hit['askVolume']
        bot=hit['bid']
        botlume=hit['bidVolume']
        # print(top)
        # print(toplume) 
        # print(bot) 
        # print(botlume) 
        if botlume < 500:                       #低价卖 !!
            amount ="%.2f"%botlume
            if botlume < 1.0:                   #买1数量小于某值 则卖给买1
                amount = "1.00"
            botsell=hitbtc.create_order(eth,"limit","sell",amount,"%.8f"%bot,{'trading_agreement': 'agree'})  #最后一个参数  交易协议
            order_ids.append(botsell["id"])

        if toplume < 500:                       #高价买  !!!
            amount ="%.2f"%toplume
            if toplume < 1.0:                   #卖1数量小于某值 则买入卖1 
                amount = "1.00"
            topbuy=hitbtc.create_order(eth,"limit","buy",amount,"%.8f"%top,{'trading_agreement': 'agree'})  #最后一个参数  交易协议
            order_ids.append(topbuy["id"])

        if top - bot < 0.00000002:
            time.sleep(5)                       #没有位置 等待5秒 !!!
            continue
        price = bot + 0.00000001 + (top - bot - 0.00000002) * (random.random())
        
        print("价格",price)
        number = random.randint(50,80)          #范围随机数 !!
        #if random.random() < 0.7:                  
        #    number += random.random()
        #    number="%.2f"%number
        sell=hitbtc.create_order(eth,"limit","sell",number,price,{'trading_agreement': 'agree'})
        order_ids.append(sell["id"])
        buy=hitbtc.create_order(eth,"limit","buy",number,price,{'trading_agreement': 'agree'})
        order_ids.append(buy["id"])
        
        if len(order_ids) >= 6:                         # 每生成6笔委托清空一次
            for item in order_ids:
                hitbtc.cancel_order(item,eth)

        time.sleep(1+5*random.random())         #间隔时间 1 - 6秒 !!!
    except Exception as e:
        print(e)
        time.sleep(2)