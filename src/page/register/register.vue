<template>
<div class="container">
<form>
	<section>
		<div class="title">
			<div class="line"></div>
			<h1>基本信息</h1>
		</div>
		<ul>
			<input type="hidden" name="openid" :value="form.openid">
			<input type="hidden" name="registerTime" :value="form.registerTime">
			<li>
				<span>姓名:</span>
				<input v-validate="'required'" type="text" name="name" v-model='form.name' placeholder="请输入您的真实姓名"  />
			</li>
				
			<li>
				<span>性别:</span>			
					<input type="radio" id="male" class="regular-radio"  name="sex" value="male" v-model='form.sex' v-validate="'required'"/>
					<label for="male"></label>男   

                	<input type="radio" id="female" name="sex"  class="regular-radio" value="female" v-model='form.sex' />
                	<label for="female" style="margin-left: .2rem"></label>女
			</li>
			<li>
				<span>年龄:</span>
				<input type="number" name="age"  v-model='form.age'  placeholder="请输入您的年龄" />
			</li>
			<li>
				<span>监护人姓名:</span>
				<input type="number" name="age"  v-model='form.contactName'  placeholder="请输入监护人姓名" />
			</li>
			<li>
				<span>联系方式:</span>
				<input v-validate="'required|tel'" style="float:left;line-height:.86rem;width:40%;" type="tel" name="tel" v-model='form.tel' placeholder="请输入手机号" />
        <p id="yzBtn" @click="getCode()">获取验证码</p>
			</li>
		    <li>
		    	<input class="getCode" type="number" name="phoneNumber" placeholder="输入验证码" v-model='userInputNum'/>
		    </li>	
		</ul>	
	</section>
	<section>
		<div class="title">
			<div class="line"></div>
			<h1>需求信息</h1>
		</div>
		<ul>
			<li>
				<span>就读年级:</span>
				<div class="timeList" v-for="item in stuGradeValue">
		   			{{item}}
		   			<h6 class="el-icon-circle-cross" @click="deleteGrade(index)"></h6>
		   		</div>
				<input id="grade" placeholder="请选择就读年级" readonly="readonly" @click="clickGrade()" />
	   			<mt-popup v-model="popup" position="bottom">
	       		    <div class="cancel" @click="cancelGrade()">取消</div>
	        		<div class="addTime" @click="submitGrade()">确定</div>
	       		    <mt-picker class="timePicker" 
	         		    :slots="slotsGrade" 
	         		    @change="onGradeChange" 	         		     
	         		    :itemHeight="36">           
	        		</mt-picker>
	    		</mt-popup>
			</li>
			<li style="height:2.5rem" id="subjectLi">
				<span>学习科目:</span>
				<div class="subjectItem">				
					<input type="checkbox" id="china" class="regular-checkbox" name="subject" value='语文' v-model="SubjectJsons.chn" />
					<label for="china"></label>语文&nbsp&nbsp
				    
				   	<input type="checkbox" id="math" class="regular-checkbox" name="subject" value='数学' v-model="SubjectJsons.math" />
				    <label for="math"></label>数学&nbsp&nbsp
				    <div id="line" style="position: relative;top: .86rem"></div>
				    
				    <input type="checkbox" id="english" class="regular-checkbox" name="subject" value='英语' v-model="SubjectJsons.english" />
				    <label for="english"></label>英语&nbsp&nbsp
				    
				    <input type="checkbox" id="physical" class="regular-checkbox" name="subject" value='物理' v-model="SubjectJsons.physical" /> 
				    <label for="physical"></label>物理&nbsp&nbsp
				    <div id="line"></div>
				    
				    <input type="checkbox" id="chemistry" class="regular-checkbox" name="subject" value='化学' v-model="SubjectJsons.chemistry" />
				    <label for="chemistry"></label>化学&nbsp&nbsp			   
			    </div>
			</li>

			<li style="height:1.72rem" id="grade">
				<span>课程类型:</span>					
			    <input type="checkbox" value="辅导课" id="fudao" name="classType" @click="checkClassType()">
			    <label for="fudao">辅导课</label>
			    <div id="xiaoxue"></div>	
				<input type="checkbox" value="教学课"  id="jiaoxue" name="classType" @click="checkClassType()">
				<label for="jiaoxue">教学课</label>
			</li>
		   	<li style="height:auto">
		   		<span>上课时间:</span>
		   		<div class="timeList" v-for="(item,index) of timeList">
		   			{{item[0] }}  {{item[1] }}
		   			<h6 class="el-icon-circle-cross" @click="close(index)"></h6>
		   		</div>
		   		<input placeholder="添加上课时间" readonly="readonly" @click="clickTime()" />
	   			<mt-popup v-model="popupVisible" position="bottom">
	       		    <div class="cancel" @click="cancelTime()">取消</div>
	        		<div class="addTime" @click="submitTime()">确定</div>
	       		    <mt-picker class="timePicker" 
	         		    :slots="slotsTime" 
	         		    @change="onTimeChange" 
	         		    :itemHeight="36">           
	        		</mt-picker>
	    		</mt-popup>
		   	</li>
		   	<li style="height:2.4rem;font-size:.2rem" >	
				<mt-picker class="picker" 
					:slots="slots"
					@change="onValuesChange" 
					:itemHeight="40" 
					:visibleItemCount="3">					
				</mt-picker>			
			</li>
		</ul>				
	</section>
	<section>
		<div class="title">
			<div class="line"></div>
			<h1>学习目标</h1>
		</div>
		<mt-field placeholder="请输入学习目标" type="textarea" rows="4" v-model='form.goal'></mt-field>			
	</section>
	<section>
		<div class="title">
			<div class="line"></div>
			<h1>学习计划</h1>
		</div>	
		<mt-field placeholder="请输入学习目标" type="textarea" rows="4" v-model='form.studyPlan'></mt-field>				
	</section>
</form>
	<div class="bottom">
		<button class="tixian" @click="DoRegitser()">提交</button>
	</div>
    <p>进入TaTu课堂代表您已同意
    	<router-link to="/agreements">
    		<span style="color:#666">《用户协议》</span>
    	</router-link>
    </p>
</div>
</template>

<script>
import axios from 'axios'
import '../../common/js/validate.js'
export default {
  name: 'register',
  components: {
  },
  data () {
    return {
      headurl:'',
      popup:false,
      gradeValue:[],
      stuGradeValue:[],
      timeList: [],
      name: '',
      timeValues: {},
      SubjectJsons: {
      	chn: false,
      	math:false,
      	chemistry:false,
      	physical:false,
      	english:false,
      },
      popupVisible:false,
      slotsGrade:[
      	{
          flex: 1,
          values: ["小学 一年级" ,"小学 二年级","小学 三年级" ,"小学 四年级","小学 五年级" ,"小学 六年级","初一","初二","初三","高一","高二","高三"],
          textAlign: 'center'
        }
      ],
      slotsTime: [
        {
          flex: 1,
          values: ["星期一" ,"星期二","星期三" ,"星期四","星期五" ,"星期六","星期日"],
          className: 'slots1',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slotsTime2'
        },
        {
          flex: 1,
          values: ["上午" ,"下午","晚上"],
          className: 'slots3',
          textAlign: 'center'
        }  
      ],      
      slots: [
        {
          divider: true,
          content: '上课地点:',
          className: 'slot1'
        },
        {
          flex: 1,
          values: ["" ,"拉动选择上课地点"],
          className: 'slot2',
          textAlign: 'center'
        }
      ],
      checkCodeTip:'获取验证码',
      countdown: 0,
      openid: '',
      registerTime: '',
      identifyingCode: '',
      identifyingCode: '',
      userInputNum:'',
      userInputPostion:'',
      positionInfos:[], // 获取到的上课地点数组
      form: {'availTime': [], 'userId': '189', 'allowTry': true,'headurl':'1'},
      turnEng: {
      	'上午': 'morning',
      	'中午': 'afternoon',
      	'晚上': 'night'
      }
    }
  },
  methods: { 
  	// ---------------------就读年级------------------------------//
  	clickGrade: function() { //点击弹出就读年级picker
        this.popup = true
    },
    onGradeChange (picker, values) { // 上课时间picker的值改变时
      this.gradeValue = values
    },
    cancelGrade: function(){ //点击取消 关闭picker
      this.popup = false
    },
    submitGrade: function(){
      if( typeof(this.gradeValue[0] ) == "undefined") {
      	alert('请选择就读年级！')
      	return
      }else {
        this.popup = false
        this.stuGradeValue = this.gradeValue
        document.getElementById('grade').style.display='none'
      }   
    },
    deleteGrade: function (index){
    	this.stuGradeValue.splice(0,1)
        var removeObj = event.target.parentElement
        removeObj.parentNode.removeChild(removeObj)
        document.getElementById('grade').style.display ='inline-block'
    },
    // ---------------------上课时间------------------------------//
  	clickTime: function() { //点击弹出上课时间picker
        this.popupVisible = true
    },
  	onTimeChange (picker, values) { // 上课时间picker的值改变时
      this.timeValues = values
    },
    cancelTime: function(){  //点击取消 关闭上课时间picker
      this.popupVisible = false
    },
    submitTime: function(){
      if( typeof(this.timeValues[0] ) == "undefined" || 
      	  typeof(this.timeValues[1] ) == "undefined") {
      	alert('请选择完整的时间段')
      	return
      }else if(this.isRelate()) {
      	alert('不能选择重复的时间')
      	return
      }else {
        this.popupVisible = false
        var item = new Array()
        for(var i=0; i<this.timeValues.length; i++ )
      	  item[i] = this.timeValues[i]
        this.timeList.push(item)
      }
    },
    //判断是否重复
    isRelate: function() {
      for (var i = 0; i < this.timeList.length; i++) {
      	if(this.timeList[i][0] === this.timeValues[0] && 
      		this.timeList[i][1] === this.timeValues[1])
      		return true
      }
    },
    close: function (index){
    	this.timeList.splice(index,1,['',''])
        var removeObj = event.target.parentElement
        removeObj.parentNode.removeChild(removeObj); 
    },
    // --------------------上课地点------------------------------//
  	onValuesChange (picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
        picker.getSlotValue(1, values[0])
      }
      var json = this.positionInfos
      for(var i=0 ;i < json.length;i++){
      	if(json[i].name === values[0]) {
      		this.form.userId = json[i].userId
      		this.userInputPostion = values[0]
      		return
      	}
      }
    },
    // --------------------发送手机号获取验证码 ------------------------------//
    getCode: function () {
      if(this.form.tel.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(this.form.tel)){
	      if(this.countdown > 0){
	      	return
	      }else{
	      	let self = this
	        this.$http.get('/tatuweb/sendSms?phoneNumber=' + this.form.tel).then((response) => {
	          this.identifyingCode = response.body.data      
	        }) 
	        this.countdown = 60 
	        this.setTime()
	      }
	  }else{
	  	alert('请填写正确的手机号码！')
	  }        
    },
    setTime: function () {
      let self = this
        if (self.countdown === 0) {
          document.getElementById('yzBtn').innerHTML = '重新获取'
          return
        } else {
          document.getElementById('yzBtn').innerHTML = '' + this.countdown + 's后重试'
          this.countdown--
        }
        setTimeout(function () {   
          self.setTime()     
        }, 1000) 
    },
    // --------------------课程类型 辅导课 教学课设为123------------------------------//
    checkClassType: function () {
      var  classTypeStr = document.getElementsByName('classType')
      var classType = ''
      if (classTypeStr[0].checked === true && classTypeStr[1].checked === true){     	
        classType = 3
      }else if(classTypeStr[1].checked === true){
        classType = 2
      }else if(classTypeStr[0].checked === true){
      	classType = 1
      }
      this.form.classType = classType     
    },
    // --------------------上课时间------------------------------//
    buildAvailTime: function(){
      // 清空数组
      this.form.availTime.splice(0,this.form.availTime.length)
      // 构造数组
	  var array = this.timeList
		for(var i=0; i<array.length; i++) {
			var items = array[i]
		    var day   = items[0]
		    var time  = items[1]
	    	var availItem = {
	      	  day: '',
	      	  timeOfDay: {
	          morning: false ,
	          afternoon:  false,
	          night: false   
	          }
	        } 
	        if(day != "" && time != ""){
	        // 转化为英文 上午 morning 
			    time = this.turnEng[time]
			    availItem.day = day
			    availItem.timeOfDay[time] = true
			    this.form.availTime[i] = availItem
		    }
    	}
    },
    // --------------------点击注册------------------------------//
    register: function() {
      // 判断用户输入的验证码是否正确
      if(this.identifyingCode === this.userInputNum){
      	//获取 课程名
      	var str = document.getElementsByName('subject')
		    var subjectArray = str.length
		    var subjects = ''
    		for (var i=0;i<subjectArray;i++){
    		  if(str[i].checked == true)
    		  {
    		    subjects += str[i].value + " "
    		  }
    	 }
  	    this.form.subject = subjects
  	    if(this.stuGradeValue[0] === '小学 一年级'){
  	    	this.stuGradeValue[0] = 1 
  	    }else if(this.stuGradeValue[0] === '小学 二年级'){
  	    	this.stuGradeValue[0] = 2
  	    }else if(this.stuGradeValue[0] === '小学 三年级'){
  	    	this.stuGradeValue[0] = 3
  	    }else if(this.stuGradeValue[0] === '小学 四年级'){
  	    	this.stuGradeValue[0] = 4
  	    }else if(this.stuGradeValue[0] === '小学 五年级'){
  	    	this.stuGradeValue[0] = 5
  	    }else if(this.stuGradeValue[0] === '小学 六年级'){
  	    	this.stuGradeValue[0] = 6
  	    }else if(this.stuGradeValue[0] === '初一'){
  	    	this.stuGradeValue[0] = 7
  	    }else if(this.stuGradeValue[0] === '初二'){
  	    	this.stuGradeValue[0] = 8
  	    }else if(this.stuGradeValue[0] === '初三'){
  	    	this.stuGradeValue[0] = 9
  	    }else if(this.stuGradeValue[0] === '高一'){
          this.stuGradeValue[0] = 10
        }else if(this.stuGradeValue[0] === '高二'){
          this.stuGradeValue[0] = 11
        }else if(this.stuGradeValue[0] === '高三'){
          this.stuGradeValue[0] = 12
        }
		    this.form.grade = JSON.parse(this.stuGradeValue)
        this.form.headurl = this.headurl
  	    let self = this
  	    this.buildAvailTime()
  	    var params = new URLSearchParams()
  	    params.append('studentInfo', JSON.stringify(this.form))
  	    axios({
  	      method: 'post',
  	      url: '/tatuweb/studentRegister',
  	      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  	      data: params
  	    }).then(function (response) {
  	      window.location.href = '/tatuweb/index.html'   // 注册成功 回到首页
          })
        }else{
        	alert("验证码填写错误！")
        }     
    },
    DoRegitser: function () {
      //先进行校验
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.register()
        }else
          alert('请填写好完整信息');
      })     
    },
    classTypeChecked: function(){   	
    	if(this.form.classType === 1){   		
    		document.getElementById('fudao').checked = 'checked'
    	}else if(this.form.classType === 2){
    		document.getElementById('jiaoxue').checked = 'checked'
    	}else if(this.form.classType === 3){
    		document.getElementById('fudao').checked = 'checked'
    		document.getElementById('jiaoxue').checked = 'checked'
    	}
    }
  },
  // --------------------页面加载时,获取上课地点------------------------//
  created () {
  	let self = this
  	axios.get('/tatuweb/getBackgroundInfo').then(function (response) {
      	self.positionInfos = response.data.data
      	var positions=new Array()
      	for(var i = 0; i < self.positionInfos.length; i++){
          positions[i] = self.positionInfos[i].name
          self.slots[1].values[i] = positions[i]
      	}     	  
    })
    self.openid = sessionStorage.getItem('openid')
    axios.post('/tatuweb/wechat/userInfo?openid=' + self.openid).then(function (response) {
        self.headurl = response.data      
    })
  },
  mounted () {
    let self = this
    //获取 sessionStorage.getItem
    if(sessionStorage.getItem('registerForm') != null ){
      // 初始化 registerForm
      self.form = JSON.parse(sessionStorage.getItem('registerForm'))
      // 初始化教学年级
  	  self.classTypeChecked()
  	  // 初始化 课程信息、有空时间、上课地点
  	  self.SubjectJsons = JSON.parse(sessionStorage.getItem('subject'))
	  self.timeList = JSON.parse(sessionStorage.getItem('timeList'))
	  self.slots[1].values[1] = sessionStorage.getItem('position')
	  this.userInputPostion = sessionStorage.getItem('position')
	  if(self.stuGradeValue != null){
	  	self.stuGradeValue = JSON.parse(sessionStorage.getItem('stuGradeValue'))
	  	document.getElementById('grade').style.display='none'
	  }
    }
    self.form.openid = sessionStorage.getItem('openid')
    self.form.registerTime = parseInt(new Date().getTime() / 1000)   
  },
  beforeDestroy(){
    // debugger
    sessionStorage.setItem("registerForm",JSON.stringify(this.form))
    sessionStorage.setItem("timeList",JSON.stringify(this.timeList))
    sessionStorage.setItem("position",this.userInputPostion === '' ? '拉动选择上课地点' :
    	this.userInputPostion)
    sessionStorage.setItem("subject",JSON.stringify(this.SubjectJsons))
    sessionStorage.setItem("stuGradeValue",JSON.stringify(this.stuGradeValue))
  }
}
</script>
<style scoped>
.container{
	overflow: auto;
	height: 100%;
	-webkit-overflow-scrolling : touch; 
}
/*-----------------上课时间------------------------------------*/
.el-icon-circle-cross{
	color: #ccc;
	margin-left: .6rem;
	float: right;
	margin-top: .25rem
}
.timeList{
	float:right;
	width:65%;
	height: .85rem;	
}
.timePicker{
  width: 6.4rem;
}
.cancel{
  float: left;
  font-size: .3rem;
  margin-bottom: .4rem;
  margin-top:.3rem;
  margin-left: .3rem;
  color: #666
}
.addTime{
  float: right;
  font-size: .3rem;
  margin-bottom: .4rem;
  margin-top:.3rem;
  margin-right: .3rem;
  color: #333
}
.slots1{
  font-size: .3rem
}
.slots3{
  font-size: .3rem
}
.el-icon-plus{
	font-size: .24rem;
	color: #999;
	border: .01rem #999 solid;
	padding: .1rem;
	border-radius: 50%;
}
/*-----------------------------------*/
.line{
	width: .06rem;
	height: .32rem;
	background-color: #2cc17b;
	border-radius: 3rem;
	margin-right: .16rem;
	float: left;
}
h1{
	font-size: .3rem;
	color: #000;
	margin-bottom: .2rem;
}
section{
	margin-top: .3rem;
	padding: .3rem .3rem 0 .3rem;
	background-color: #fff;
}
section li{
	height: .85rem;
	line-height: .85rem;
	font-size: .28rem;
	margin-left: .22rem;
	border-bottom: .01rem solid #efefef;
}
section span{
	display: block;
	float: left;
	width: 35%;
	overflow: hidden; 
	text-overflow:ellipsis; 
	white-space: nowrap
}
section input{
	outline:none;
	width: 65%;
}
.bottom{margin: .2rem .52rem;}
.tixian{
	width: 100%;
	height: 1rem;
	background: url(../../assets/btn_extract_n.png) no-repeat;
	background-size: 100% 99%;
	font-size: .36rem;
	color: #fff;
	border:0;
}
p{
	font-size: .28rem;
	color: #999;
	margin-left: .52rem;
	margin-top: .24rem;
	margin-bottom: 1rem;
}
/*--------------性别-------------------*/
.regular-radio {
	display: none;
}
.regular-radio + label {
	-webkit-appearance: none;
	border: 1px solid #eee;
	padding: .14rem;
	border-radius: .14rem;
	display: inline-block;
	position: relative;
	top: .05rem;
}
.regular-radio:checked + label:after {
	content: ' ';
	width: .2rem;
    height: .2rem; 
	border-radius: .2rem;
	position: absolute;
	top: -.01rem;
	left: -.05em;
	background: #2cc17b;
	border: 3px #eee solid;
	-webkit-transition:background ease-in .1s;
}
/*-----------------------教学科目 复选框-----------------------------------*/
.regular-checkbox {
	display: none;
}
.regular-checkbox + label {
	border: 1px solid #ddd;
	padding: .13rem;
	border-radius: .2rem;
	display: inline-block;
	position: relative;
	left: -.05rem;
	top: .05rem;
}
.regular-checkbox:checked + label {
	background-color: #e9ecee;
	border: 1px solid #ddd;
	color: #99a1a7;
}
.regular-checkbox:checked + label:after {
	content: "";
	width: .2rem;
    height: .2rem;
    border-radius: .2rem;
	position: absolute;
	top: -.03rem;
	left: -.03rem;
	background-color: #2cc17b;
	border: 3px #ddd solid;
}
/*--------------------教学年级-复选框---------------------------*/
.checkbox-wrap{width: 93%;}
#xiaoxue{
	border-bottom: .01rem solid #efefef;
	position: relative;
	top: .86rem
}
#grade input[type="checkbox"]{display: none;}
#grade input[type="checkbox"]+label {
    width: 65%;
    text-align: left;
    -webkit-box-sizing: border-box;
    float: right;  
}
#grade label::after {
    content: "";
    display: inline-block;
    width: .3rem;
    height: .3rem;
    border: .01rem solid  #aaa;
    vertical-align: middle;
    border-radius: 80%;
    -webkit-box-sizing:border-box;
    margin-left: 65%;
}
#grade input[type="checkbox"]:checked+label::after{
	background-color: #2cc17b;
	border: 3px #ddd solid;
}
/*-------------------手机验证码---------------------------*/
#yzBtn{
  width: 22%;
  height: .3rem;
  padding: .1rem;
  float: right;
  position: relative;
  top: -.95rem;
  border:.01rem solid #2cc17b;
  border-radius: .1rem;
  font-size: .24rem;
  color: #2cc17b;
  text-align: center;
  line-height: .31rem;
}
.getCode{
  position: relative;
  left: 1.9rem;
  top:-1.7rem;
}
/*------------------------------*/
#sex{
	width:15%;
	margin-right: -.2rem
}
#sex label {
    content: "";
    display: inline-block;
    width: .3rem;
    height: .3rem;
    border: .01rem solid  #aaa;
    vertical-align: middle;
    -webkit-border-radius: 80%;
    -webkit-box-sizing:border-box;
   -webkit-transition:background ease-in .1s;
    margin-left: 65%;
}
#subjectLi input{
	width: .5rem
}
.subjectItem{
	width: 64%;
	float: right;
}
</style>