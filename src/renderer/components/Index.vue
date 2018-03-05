<template>
  <div id="wrapper">

        <h3 class="head" >交易平台刷单</h3>
         <!-- 开始form -->
        <!-- <el-button type="primary" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
       
            <el-form  :model="record"  label-width="180px" class="demo-ruleForm" >
            
                <el-form-item label="选择交易平台">
                    <el-select v-model="record.fun"  :disabled="true">
                        <el-option v-for='(funs1,index) in record.funs' :key="index" :label="funs1.text" :value="funs1.text" ></el-option>
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="货币类型">
                    <el-input v-model="record.symbol" placeholder="OCN/ETH" :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="apiKey" prop="apiKey"  :rules="[{ required: true, message: '请输入APIKEY', trigger: 'blur' }]">  
                    <el-input v-model="record.apiKey" placeholder="88186d8e-969cf6a0-e652f8dd-c7a68"></el-input>
                </el-form-item>
                <el-form-item label="secret" prop="secret"  :rules="[{ required: true, message: '请输入secret', trigger: 'blur' }]">
                    <el-input v-model="record.secret" placeholder="3f79d3fc-46870303-8957f125-f0102"></el-input>
                </el-form-item>
                <el-form-item label="最低最高成交数量/个">
                    <el-col :span="11">
                    <el-input placeholder="50" v-model="record.numPrice.bot" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">--</el-col>
                    <el-col :span="11">
                    <el-input placeholder="80" v-model="record.numPrice.top" style="width: 100%;"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="没有位置时沉睡时间/s">
                    <el-input v-model="record.notime" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="成交数量取值范围/个">
                    <el-col :span="11">
                    <el-input placeholder="100" v-model="record.amount.bot" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">--</el-col>
                    <el-col :span="11">
                    <el-input placeholder="150" v-model="record.amount.top" style="width: 100%;"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="每场交易完成后间隔时间/s">
                    <el-input v-model="record.spacetime" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="creater">创建</el-button>
                    
                </el-form-item>
            </el-form>
        
        </el-dialog> -->
        <!-- 结束form -->
        <el-form  :model="record"  label-width="180px" class="demo-ruleForm"  >
            
            <el-form-item label="选择交易平台">
                    <el-select v-model="record.fun"  >
                        <el-option   label="huobipro" value="huobipro" ></el-option>
                        <el-option   label="kucoin" value="kucoin" ></el-option>
                        <el-option   label="geteio" value="geteio" ></el-option>
                        <el-option   label="hitbtc" value="hitbtc" ></el-option>
                        <el-option   label="coincheck" value="coincheck" ></el-option>
                        <el-option   label="chilebit" value="chilebit" ></el-option>
                        <el-option   label="mixcoins" value="mixcoins" ></el-option>
                    </el-select>
                    
            </el-form-item>
            <el-form-item label="货币类型">
                <el-input v-model="record.symbol" placeholder="OCN/ETH"  ></el-input>
            </el-form-item>
            <el-form-item label="apiKey" prop="apiKey"  :rules="[{ required: true, trigger: 'blur' }]">  
                <el-input v-model="record.apiKey" placeholder=""></el-input>
            </el-form-item>
             <el-form-item label="secret" prop="secret"  :rules="[{ required: true, trigger: 'blur' }]">
                <el-input v-model="record.secret" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="最低成交标准">
                <el-input placeholder="最低价格的数量小于这个值时最低价格卖出" v-model.number="record.numPrice.bot" style="width: 100%;" ></el-input>
            </el-form-item>
            <el-form-item label="最高成交标准">
                <el-input placeholder="最高价格的数量小于这个值时最高价格买出" v-model.number="record.numPrice.top" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="没有位置时沉睡时间/s">
                <el-input v-model="record.notime" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="差价小于多少时停止5s/num">
                <el-input v-model.number="record.spacePrice" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="成交数量取值范围/个">
                <el-col :span="11">
                <el-input placeholder="100" v-model.number="record.amount.bot" style="width: 100%;"></el-input>
                </el-col>
                <el-col class="line" :span="2">--</el-col>
                <el-col :span="11">
                <el-input placeholder="150" v-model.number="record.amount.top" style="width: 100%;"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="交易间隔时间2到多少秒/s">
                <el-input v-model.number="record.spacetime" placeholder=""></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="onSubmit2">随机</el-button>
                <el-button type="primary" @click="onSubmit">上行</el-button>
                 <el-button type="primary" @click="onSubmit1">下行</el-button>
                  <el-button type="primary" @click="onSubmit3">停止</el-button>
            </el-form-item>
        </el-form>
        <div class="jiaoyi">
        <h4>交易数据:</h4>
        <div  class="state" ref="state1">
            
            <ul v-for="(item1, index) in record.funs" :key='index' class="ul" >
                <li v-if="item1.log" class="log">{{item1.text}}</li>
                <li v-else class="error" >{{item1.text}}</li>
            </ul>
        </div>
            <div class="buy-sell"> 卖出数量总和：{{this.sellAmount}}<br/>
                  买入数量总和：{{this.sellAmount}}
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: {
        fun: "huobipro",
        funs: [],
        symbol: "OCN/ETH",
        apiKey: "",
        secret: "",
        // apiKey: "youur  apikey",
        // secret: "youur  secret",
        numPrice: {
          bot: "1",
          top: "2"
        },
        notime: 5,
        amount: {
          bot: 1,
          top: 3
        },
        spacetime: 6,
        spacePrice: 0.00000002
      },
      dialogVisible: false,
      run: "",
      sellAmount: "",
      buyAmount: ""
    };
  },
  created() {},
  mounted() {
    //监听log事件

    this.$electron.ipcRenderer.on("log", (event, arg) => {
      var _top1 = this.$refs.state1.scrollTop;
      //   console.log(arg);
      this.$refs.state1.scrollTop = this.record.funs.length * 100 + 200;
      this.record.funs.push({ text: arg, log: true });
      if (this.record.funs.length > 40) {
        this.record.funs.shift();
        console.log(this.record.funs.length);
      }
    });
    this.$electron.ipcRenderer.on("error", (event, arg) => {
      var _top1 = this.$refs.state1.scrollTop;
      //   console.error(arg);
      this.$refs.state1.scrollTop = this.record.funs.length * 100 + 200;
      this.record.funs.push({ text: arg, log: false });
      if (this.record.funs.length > 40) {
        this.record.funs.shift();
        console.log(this.record.funs.length);
      }
    });
    this.$electron.ipcRenderer.on("run", (event, arg) => {
      this.run = arg;
    });
    this.$electron.ipcRenderer.on("sellAmount", (event, arg) => {
      this.sellAmount = arg.toFixed(2);
    });
    this.$electron.ipcRenderer.on("sellAmount", (event, arg) => {
      this.buyAmount = arg.toFixed(2);
    });
  },
  methods: {
    onSubmit() {
      let params = {
        constructorParams: {
          fun: this.record.fun,
          symbol: this.record.symbol,
          apiKey: this.record.apiKey,
          secret: this.record.secret
        },
        randomParams: [
          this.record.numPrice.bot,
          this.record.numPrice.top,
          this.record.spacetime,
          this.record.amount.top,
          this.record.amount.bot,
          this.record.spacePrice
        ]
      };
      console.log(this.record, "上行");
      if (this.record.fun) {
        //   console.log(this.run)
        if (this.run) {
          alert("程序正在运行");
        } else {
          this.$electron.ipcRenderer.send("top", params);
        }
      } else {
        alert("请选择交易平台");
      }
    },
    onSubmit1() {
      let params = {
        constructorParams: {
          fun: this.record.fun,
          symbol: this.record.symbol,
          apiKey: this.record.apiKey,
          secret: this.record.secret
        },
        randomParams: [
          this.record.numPrice.bot,
          this.record.numPrice.top,
          this.record.spacetime,
          this.record.amount.top,
          this.record.amount.bot,
          this.record.spacePrice
        ]
      };
      console.log(this.record, "下行");
      if (this.record.fun) {
        //   console.log(this.run)
        if (this.run) {
          alert("程序正在运行");
        } else {
          this.$electron.ipcRenderer.send("bot", params);
        }
      } else {
        alert("请选择交易平台");
      }
    },
    onSubmit2() {
      let params = {
        constructorParams: {
          fun: this.record.fun,
          symbol: this.record.symbol,
          apiKey: this.record.apiKey,
          secret: this.record.secret
        },
        randomParams: [
          this.record.numPrice.bot,
          this.record.numPrice.top,
          this.record.spacetime,
          this.record.amount.top,
          this.record.amount.bot,
          this.record.spacePrice
        ]
      };
      console.log(this.record, "随机");
      if (this.record.fun) {
        //   console.log(this.run)
        if (this.run) {
          alert("程序正在运行");
        } else {
          this.$electron.ipcRenderer.send("random", params);
        }
      } else {
        alert("请选择交易平台");
      }
    },
    onSubmit3() {
      console.log("停止");
      this.$electron.ipcRenderer.send("stop");
      //   this.record.fun = "";
      this.run = "";
    },
    init() {
      console.log("click");
      this.$electron.ipcRenderer.send("asynchronous-message", "ping");
    },
    haha() {
      var _self = this;
    },
    creater() {
      this.dialogVisible = false;
      alert("创建成功");
    }
  }
};
</script>

<style>
.head {
  text-align: center;
}
.el-input__inner {
  border: 1px solid #aaa;
}
.state {
  height: 400px;
  overflow: auto;
  overflow-x: hidden;
  border: 1px dashed #aaa;
  background: #1e1e1e;
}
.state ul li {
  list-style: none;
  border-left: 10px solid rgb(20, 235, 38);
  padding-left: 10px;
  color: #fff;
}
.state ul li span:nth-child(1) {
  margin: 0 5px;
  color: aqua;
}
.state ul li span:nth-child(2) {
  margin: 0 5px;
  color: blueviolet;
}
.state ul li.error {
  border-left: 10px solid rgb(241, 7, 7);
  padding-left: 10px;
  color: rgb(231, 22, 186);
}
.demo-ruleForm {
  width: 50%;
  float: left;
}
.jiaoyi {
  box-sizing: border-box;
  width: 50%;
  float: left;
  padding-left: 50px;
}
.el-form-item {
  margin-bottom: 10px;
}
h4 {
  margin: 10px;
}
.el-button + .el-button {
  margin-left: 5px;
}
.buy-sell {
  padding-top: 20px;
  padding-left: 25px;
  line-height: 40px;
}
/* .el-button+.el-button:nth-child(4){
    margin-top:10px; 
} */
</style>
