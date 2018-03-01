<template>
  <div id="wrapper">

        <h3 class="head" @click="onSubmit">交易平台刷单</h3>
        <el-button type="primary" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <!-- 开始form -->
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
        <!-- 结束form -->
        </el-dialog>
        <el-form  :model="record"  label-width="180px" class="demo-ruleForm" >
            
            <el-form-item label="选择交易平台">
                <el-select v-model="record.fun"  :disabled="true">
                    <el-option v-for='funs1 in record.funs' :key="funs1" :label="funs1" :value="funs1" ></el-option>
                    
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
                <el-button type="primary" @click="onSubmit">上行启动</el-button>
                 <el-button type="primary" @click="onSubmit1">下行启动</el-button>
                 <el-button type="primary" @click="onSubmit2">随机交易</el-button>
                  <el-button type="primary" @click="onSubmit3">停止交易</el-button>
            </el-form-item>
        </el-form>
        <h5>交易数据:</h5>
        <div  class="state" ref="state1">
            
            <ul v-for="(item1, index) in record.funs" :key='index' class="ul">
                <li v-if="item1.log" class="log">{{item1.text}}</li>
                <li v-else class="error" style="color: red">{{item1.text}}</li>
            </ul>
        </div>
  </div>
</template>

<script>

export default {
data() {
    return {
        record:{
            fun:'huobipro',
            funs:[{
                text:"huobipro",
                log:true
            },{
                text:"huobipro1",
                log:true
            },{
                text:"huobipro2",
                log:true
            }],
            symbol:'OCN/ETH',
            apiKey:'',
            secret:'',
            numPrice:{
                bot:'50',
                top:'80'
            },
            notime:'5',
            amount:{
                bot:'100',
                top:'150'
            },
            spacetime:'6'

        },
         dialogVisible: false
        
    }
},
created(){
    console.log(this.$electron.ipcRenderer.on)
    this.$electron.ipcRenderer.on('back1', (event, arg) => {//根据返回的数据名执行函数
         alert("返回参数：" + arg);
    })
    this.$electron.ipcRenderer.on('back2', (event, arg) => {
         alert("返回参数：" + arg);
    })
    this.$electron.ipcRenderer.on('back3', (event, arg) => {
         alert("返回参数：" + arg);
    })
    this.$electron.ipcRenderer.on('back4', (event, arg) => {
         alert("返回参数：" + arg);
    })

    
    
},
methods: {
    onSubmit() {
        console.log(this.record,"上行");
        // this.$electron.ipcRenderer.send('top',this.record)//发送数据
        var _self=this;
        var _top1=this.$refs.state1.scrollTop;
        setInterval(function(){
            // this.record.funs.append("1111");
            _self.record.funs.push({text: "iii"+Math.random(), log: true})
            _self.record.funs.push({text: "iii"+Math.random(), log: false})
            // console.log(_self.record.funs)
            // _top1+=80
            _self.$refs.state1.scrollTop=_self.record.funs.length*100+200;
            if(_self.record.funs.length>20){
                _self.record.funs.splice(0,5)
            }
            // console.log(_top1)
            console.log( _self.record.funs.length)

        },1000)
    },handleClose(done) {
        this.dialogVisible=false;
      }
    ,
   
    onSubmit1() {
        console.log(this.record,"下行");
        this.$electron.ipcRenderer.send('bot',this.record)
    },
    onSubmit2() {
        console.log(this.record,"随机");
        this.$electron.ipcRenderer.send('random',this.record)
    }, 
    onSubmit3() {
        console.log(this.record,"停止");
        this.$electron.ipcRenderer.send('stop',this.record)
        this.record.fun=''
    },
    init(){
        console.log("click")
        this.$electron.ipcRenderer.send('asynchronous-message', 'ping')
    },
    haha(){
        var _self=this;
        
    },
    creater(){
        this.dialogVisible=false;
        alert("创建成功")
    }
}
}
</script>

<style>
.head{
    text-align: center;
}
.el-input__inner{
    border: 1px solid #aaa;
}
.state{
    height:200px;
    overflow:auto;
    overflow-x:hidden;
}
  
</style>
