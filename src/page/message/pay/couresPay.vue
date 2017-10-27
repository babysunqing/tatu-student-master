<template>
<div class="container" v-title="'课程续费'">
	<div class="content">
		<mt-picker class="picker" :slots="slots" @change="onValuesChange" :itemHeight="50" :visibleItemCount="3"></mt-picker>	
		<div class="top">			
			<h3>应付金额</h3>
			<div class="form">
				<span>¥</span>
				<form  method="post">
          <input type="hidden" name="payNum" value="payNum">
					<input style="width:4.23rem;margin-left:.24rem" value="values" readonly="readonly" name="payPrice" v-model="payPrice">
				</form>
			</div>	
		</div>
		<input class="submit" type="submit" value="续费" @click="stuPay()"/>
  </div>
</div>
</template>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"></script>
<script>
import axios from 'axios'
export default {
  name: 'couresPay',
  data () {
    return {
      signature:'',
      values:[1,0],
      create: 'create',
      payPrice: 0,
      couresNum: 10,
      pay: {},
      courseId: '',
      studentId: '',
      slots: [
        {
          divider: true,
          content: '课程续费',
          className: 'slot1'
        },
        {
          flex: 1,
          values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
          className: 'slot2',
          textAlign: 'center'
        }
      ]
    }
  },
  created () {
    let self = this
    this.item = this.$route.params.item
    // debugger
    this.url = window.location.href
    axios.get('/tatuweb/wechat/JSAPIConfig?url=' + self.url).then(function (res) {
      if(res.data.data != ''){
        self.signature = res.data.data.signature
      }
    })
  },
  methods: {
    onValuesChange (picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
        picker.getSlotValue(1, values[0])          
      }
      // debugger
      this.couresNum = values[0] 
      this.payPrice = this.item.courseInfo.price * this.couresNum
      this.payPrice = this.payPrice.toFixed(2)
    },
    stuPay: function () {
      var params = new URLSearchParams()
      var stuJson = {}
      stuJson.payNum = this.couresNum
      stuJson.payPrice = this.payPrice
      stuJson.courseId = this.courseId
      stuJson.studentId = this.studentId
      stuJson.createTime = new Date().getTime()
      stuJson.status = this.create
      params.append('StudentPaymentRecord', JSON.stringify(stuJson))
      params.append('openid', sessionStorage.getItem('openid'))
      params.append('createIP', returnCitySN["cip"])
      let self = this
      axios({
        method: 'post',
        url: '/tatuweb/studentCreatePaymentOrder',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: params
      }).then(function (res) {
        self.data = res.data.data
        wx.config({
            debug: true,
            appId: self.data.appId,
            timestamp:self.data.timeStamp,
            nonceStr: self.data.nonceStr,
            signature: self.signature,
            jsApiList: ['chooseWXPay']
        })
      })
    }
  },
  mounted (){
    wx.ready(function() {
      wx.chooseWXPay({  
        appId: self.data.appId,  
        timestamp: self.data.timeStamp,  
        nonceStr: self.data.nonceStr, 
        package: self.data.packages,
        signType: self.data.signType, 
        paySign: self.data.paySign,  
        success: function(res) {  
            // 支付成功后的回调函数  
            if (res.errMsg == "chooseWXPay:ok") {
                alert('支付成功')  
            } else {  
                alert(res.errMsg)  
            }  
        },  
        cancel: function(res) {  
            //支付取消  
            alert('支付取消') 
        }  
      })
    })
  }
}
</script> 

<style scoped>
.container{
	overflow: auto;
	height: 96%;
}
.content{
	margin:.3rem;
	background-color: #fff;
	padding-top: .4rem;
	padding-left: .4rem;
	padding-right: .6rem;
}
.top{
	border-bottom: .01rem solid #e6e6e6;
	padding-bottom: .4rem;
}
.top h3{
	font-size: .28rem;
	color: #333;
	margin-top: .6rem;
	margin-bottom: .6rem;
}
.form span{
	font-size: .5rem;
	float: left;
	line-height: .9rem;
}
input{
	font-size: .96rem;
	outline:medium;
}
.submit{
	width: 100%;
	height: .92rem;
	background:url(../../../assets/btn_extract_n.png) no-repeat;
	background-size: 100% 100%;
	font-size: .36rem;
	color: #fff;
	border:none;
	margin-top: .4rem;
	margin-bottom: .54rem
}
</style>
