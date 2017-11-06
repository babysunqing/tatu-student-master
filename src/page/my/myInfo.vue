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
        <input type="text" name="name" readonly="readonly" v-model='form.name' />
      </li>        
      <li>
        <span>性别:</span>      
        <input type="text" name="sex" readonly="readonly" v-model='form.sex'/>     
      </li>
      <li>
        <span>年龄:</span>
        <input type="number" name="age" readonly="readonly" v-model='form.age'  placeholder="请输入您的年龄" />
      </li>

			<li>
				<span>监护人姓名:</span>
				<input v-validate="'required'" type="text" name="contactName"  v-model='form.contactName'  placeholder="请输入监护人姓名" />
        <span id="formVee" v-show="errors.has('contactName')" class="text-style" v-cloak>
          <icon class="el-icon-circle-close"></icon>
        </span>
			</li>

			<li>
				<span>联系方式:</span>
				<input  v-validate="'required|tel'" style="float:left;line-height:.86rem;width:40%;" type="tel" name="tel" v-model='form.tel' placeholder="请输入手机号" />
        <span id="formVeetel" v-show="errors.has('tel')" class="text-style" v-cloak>
          <icon class="el-icon-circle-close"></icon>
        </span>
        <p id="yzBtn" @click="changeTel()">更换手机号</p>
			</li>

		    <li style="position:relative" v-bind:class="{ normal: normal, 'hidden': hidden }">       
        <input class="newTel" v-validate="'required|tel'" type="tel" v-model='form.tel' name="tel" placeholder="请填写新手机号" />     
        <p id="yzBtn" :value="checkCodeTip" @click="getCode()">获取验证码</p>
      </li>

      <li v-bind:class="{ normal: normal, 'hidden': hidden }">
        <input class="newTel" type="number" name="phoneNumber" placeholder="输入验证码" v-model='userInputNum'/>
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
				<input id="grade"  type="text" placeholder="请选择就读年级" v-model='form.grade' readonly="readonly" @click="clickGrade()" />
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
          <div class="timeList" v-for="(item,index) of availTime">
            {{item}}
            <h6 class="el-icon-circle-cross" @click="close(index)"></h6>
          </div>
          <input placeholder="添加上课时间" readonly="readonly" @click="alertPop()" />
          <mt-popup v-model="popupVisible" position="bottom" class="timePicker">
              <div class="cancel" @click="cancel()">取消</div>
              <div class="addTime" @click="submit()">确定</div>
                <table>
                  <tr>
                    <td ></td>
                    <td >周一</td>
                    <td >周二</td>
                    <td >周三</td>
                    <td >周四</td>
                    <td >周五</td>
                    <td >周六</td>
                    <td >周日</td>
                  </tr>
                <tr>
                  <td>上午</td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="1s" value="星期一上午" />
                    <label for="1s" class="el-icon-circle-check"></label>                  
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="2s" value="星期二上午" />
                    <label for="2s" class="el-icon-circle-check"></label> 
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="3s" value="星期三上午" />
                    <label for="3s" class="el-icon-circle-check"></label> 
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="4s" value="星期四上午" />
                    <label for="4s" class="el-icon-circle-check"></label> 
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="5s" value="星期五上午" />
                    <label for="5s" class="el-icon-circle-check"></label> 
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="6s" value="星期六上午" />
                    <label for="6s" class="el-icon-circle-check"></label> 
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="7s" value="星期日上午" />
                    <label for="7s" class="el-icon-circle-check"></label> 
                  </td>
                </tr>
                <tr>
                  <td>下午</td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="1x" value="星期一下午" />
                    <label for="1x" class="el-icon-circle-check"></label> 
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="2x" value="星期二下午" />
                    <label for="2x" class="el-icon-circle-check"></label> 
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="3x" value="星期三下午" />
                    <label for="3x" class="el-icon-circle-check"></label>
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="4x" value="星期四下午" />
                    <label for="4x" class="el-icon-circle-check"></label>
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="5x" value="星期五下午" />
                    <label for="5x" class="el-icon-circle-check"></label>
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="6x" value="星期六下午" />
                    <label for="6x" class="el-icon-circle-check"></label>
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="7x" value="星期日下午" />
                    <label for="7x" class="el-icon-circle-check"></label>
                  </td>
                </tr>
                <tr>
                  <td>晚上</td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="1w" value="星期一晚上" />
                    <label for="1w" class="el-icon-circle-check"></label>
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="2w" value="星期二晚上" />
                    <label for="2w" class="el-icon-circle-check"></label>
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="3w" value="星期三晚上" />
                    <label for="3w" class="el-icon-circle-check"></label>
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="4w" value="星期四晚上" />
                    <label for="4w" class="el-icon-circle-check"></label>
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="5w" value="星期五晚上" />
                    <label for="5w" class="el-icon-circle-check"></label>
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="6w" value="星期六晚上" />
                    <label for="6w" class="el-icon-circle-check"></label>
                  </td>
                  <td>
                    <input class="time-checkbox" type="checkbox" name="availTime" id="7w" value="星期日晚上" />
                    <label for="7w" class="el-icon-circle-check"></label>
                  </td>
                </tr>
                </table>
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
      hidden:true,
      popup:false,
      gradeValue:[],
      stuGradeValue:[],
      availTime:[],
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
      form: {
        'availTime': []
      },
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
      // debugger
      var removeObj = event.target.parentElement
      removeObj.parentNode.removeChild(removeObj)
      document.getElementById('grade').style.display ='inline-block'
    },
    // ---------------------上课时间------------------------------//
  	alertPop: function() {
        this.popupVisible = true
    },
  	onTimeChange (picker, values) { // 上课时间picker的值改变时
      this.timeValues = values
    },
    cancel: function(){  //点击取消 关闭上课时间picker
      this.popupVisible = false
    },
    submit: function(){
      this.popupVisible = false
      var userChoTime = document.getElementsByName('availTime')
      var availTime = []
      for(var i = 0; i < userChoTime.length; i++){
        if(userChoTime[i].checked === true)
          availTime.push(userChoTime[i].value)
      } 
      this.availTime = availTime 
    },
    close: function (index){
      for(var i = 0; i < document.getElementsByName('availTime').length; i++){
        if(this.availTime[index] === document.getElementsByName('availTime')[i].value){
            document.getElementsByName('availTime')[i].checked = false 
            break
        }
      } 
      this.availTime.splice(index,1)
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
    // 更换手机号获取验证码
    changeTel: function(){
        this.hidden = false
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
      for(var i=0; i< this.availTime.length; i++) {
        var day   = this.availTime[i].substring(0, 3)
        var time  = this.availTime[i].substring(3, 5)
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
            if(this.form.availTime.length > 0){
              let flag = true
              for(var j=0;j < this.form.availTime.length;j++){
                if(this.form.availTime[j].day === availItem.day){
                  this.form.availTime[j].timeOfDay[time] = true
                  flag = false
                }
              }
              if(flag === true){
                availItem.timeOfDay[time] = true
                this.form.availTime.push(availItem)
              }
            }else{
              availItem.timeOfDay[time] = true
              this.form.availTime.push(availItem)
            }
        }
      }
    },
    // --------------------点击注册------------------------------//
    register: function() {
      // 判断用户输入的验证码是否正确
      if(this.identifyingCode != this.userInputNum){
        alert("验证码填写错误！")
      }
      //获取 学习科目
    	var str = document.getElementsByName('subject')
	    var subjectArray = str.length
	    var subjects = ''
  		for (var i = 0;i < subjectArray;i++){
  		  if(str[i].checked == true)
  		  {
  		    subjects += str[i].value + " "
  		  }
    	}
      if(this.form.sex === '男'){
        this.form.sex = 'male'
      }else{
        this.form.sex = 'female'
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
      // debugger
		  if(this.stuGradeValue.length > 0 ){
        this.form.grade = JSON.parse(this.stuGradeValue[0])
      }
      if(this.form.grade === '小学 一年级'){
        this.form.grade = 1
      }else if(this.form.grade === '小学 二年级'){
        this.form.grade = 2
      }else if(this.form.grade === '小学 三年级'){
        this.form.grade = 3
      }else if(this.form.grade === '小学 四年级'){
        this.form.grade = 4
      }else if(this.form.grade === '小学 五年级'){
        this.form.grade = 5
      }else if(this.form.grade === '小学 六年级'){
        this.form.grade = 6
      }else if(this.form.grade === '初一'){
        this.form.grade = 7
      }else if(this.form.grade === '初二'){
        this.form.grade = 8
      }else if(this.form.grade === '初三'){
        this.form.grade = 9
      }else if(this.form.grade === '高一'){
        this.form.grade = 10
      }else if(this.form.grade === '高二'){
        this.form.grade = 11
      }else if(this.form.grade === '高三'){
        this.form.grade = 12
      }
      this.form.headurl = ''
	    let self = this
	    this.buildAvailTime()
	    var params = new URLSearchParams()
	    params.append('studentInfo', JSON.stringify(this.form))
      if(this.form.availTime.length < 1){
        alert("请添加上课时间！")
      }else{
        axios({
          method: 'post',
          url: '/tatuweb/studentUpdateInfo',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: params
        }).then(function (response) {
          window.history.go(-1)
        })
      } 
    },
    DoRegitser: function () {
      //先进行校验
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.register()
        }else
          alert('请填写好完整信息')
      })     
    }
  },
  // --------------------页面加载时,获取上课地点------------------------//
  created () {
  	let self = this
  	let info = this.$route.params.info
    this.form = JSON.parse(info) 
    //就读年级
    if(this.form.grade === 1){
      this.form.grade = '小学 一年级'
    }else if(this.form.grade === 2){
      this.form.grade = '小学 二年级'
    }else if(this.form.grade === 3){
      this.form.grade = '小学 三年级'
    }else if(this.form.grade === 4){
      this.form.grade = '小学 四年级'
    }else if(this.form.grade === 5){
      this.form.grade = '小学 五年级'
    }else if(this.form.grade === 6){
      this.form.grade = '小学 六年级'
    }else if(this.form.grade === 7){
      this.form.grade = '初一'
    }else if(this.form.grade === 8){
      this.form.grade = '初二'
    }else if(this.form.grade === 9){
      this.form.grade = '初三'
    }else if(this.form.grade === 10){
      this.form.grade = '高一'
    }else if(this.form.grade === 11){
      this.form.grade = '高二'
    }else if(this.form.grade === 12){
      this.form.grade = '高三'
    }
  	axios.get('/tatuweb/getBackgroundInfo').then(function (response) {
      	self.positionInfos = response.data.data
      	var positions=new Array()
      	for(var i = 0; i < self.positionInfos.length; i++){
          positions[i] = self.positionInfos[i].name
          self.slots[1].values[i] = positions[i]
      	}     	  
    })
  },
  mounted () {
    let self = this
    this.form.availTime = JSON.parse(this.form.availTime)
    // debugger
    if(this.form.sex === 'female') {
      this.form.sex = '女'
    }else {
      this.form.sex = '男'
    }    
    // 课程类型
    if(this.form.classType === '1'){      
      document.getElementById('fudao').checked = 'checked'
    }else if(this.form.classType === '2'){
      document.getElementById('jiaoxue').checked = 'checked'
    }else if(this.form.classType === '3'){
      document.getElementById('fudao').checked = 'checked'
      document.getElementById('jiaoxue').checked = 'checked'
    }   
  	var items = this.form.subject.split(' ')
    for (var i = 0; i < items.length; i++) {
      if(items[i] === '语文') this.SubjectJsons.chn = true
      else if(items[i] === '数学') this.SubjectJsons.math = true
      else if(items[i] === '英语') this.SubjectJsons.english = true
      else if(items[i] === '化学') this.SubjectJsons.chemistry = true
      else if(items[i] === '物理') this.SubjectJsons.physical = true  
    }
	  this.slots[1].values[1] = sessionStorage.getItem('position')
	  this.userInputPostion = sessionStorage.getItem('position')
    self.form.openid = sessionStorage.getItem('openid')
    self.form.registerTime = parseInt(new Date().getTime() / 1000)   
  }
}
</script>
<style scoped>
.container{
	overflow: auto;
	height: 100%;
	-webkit-overflow-scrolling : touch; 
}
#formVee{
  width: .4rem;
  position: absolute;
  top:.02rem;
  left: 4.7rem;
  color:  #d81315;
  font-size: .2rem;
}
#formVeetel{
  position: absolute;
  top:.02rem;
  left: 3.7rem;
  color:  #d81315;
  font-size: .2rem
}
/*-----------------上课时间------------------------------------*/
input[type="checkbox"]{display: none;}
.el-icon-circle-check{
  font-size: .3rem
}
.time-checkbox:checked +  label.el-icon-circle-check{
  color: #2cc17b;
}
table{
  width: 100%;
  color: #666;
  font-size: .26rem;
}
td{
  width: 12.5%;
  border-top: .01rem solid #ccc;
  border-left: .01rem solid #ccc;
  text-align: center;
}
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
  width: 45%;
  float: left;
  font-size: .28rem;
  margin-bottom: .1rem;
  margin-top:.1rem;
  margin-left: .3rem;
  color: #666
}
.addTime{
  float: right;
  font-size: .28rem;
  margin-bottom: .1rem;
  margin-top:.1rem;
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
  position: relative;
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
  position: absolute;
  left: 3.5rem;
  top: -.1rem;
  border:.01rem solid #2cc17b;
  border-radius: .1rem;
  font-size: .24rem;
  color: #2cc17b;
  text-align: center;
  line-height: .31rem;
}
#changeBtn{
  width: 22%;
  height: .3rem;
  padding: .1rem;
  position: absolute;
  left: 3.5rem;
  top: -.1rem;
  border:.01rem solid #2cc17b;
  border-radius: .1rem;
  font-size: .24rem;
  color: #2cc17b;
  text-align: center;
  line-height: .31rem;
}
.newTel{
  float:right;
  margin-right: .9rem;
  line-height:.86rem;
  width:50%;
  position: relative;
  margin-left: .5rem
}
.getCode{
  display: inline-block;
}
.hidden{
  display: none;
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