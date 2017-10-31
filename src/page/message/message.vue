<template>
<div class="container" v-title="'TaTu课堂'">

  <div class="msg-item" v-bind:class="{ 'display': isdisplay1, 'normal': normal }" >
    <router-link to="/msgMatching">
      <img src="../../assets/icon_matching.png">
      <div class="msg-content">
        <div class="msg-title">匹配消息</div>
        <div class="msg">您好，管理员已为您匹配一位与您期望相符的老师
        ，请尽快根据学生信息和学习目标，制定合理的教学计划。</div>
      </div>
      <div class="others">
        <div class="time"></div>
        <!-- {{ msg.thetime }} -->
        <!-- <div class="msg-num">{{ msg.num }}</div> -->
      </div>
    </router-link>
  </div>

  <div class="msg-item" v-bind:class="{ 'display': isdisplay2, 'normal': normal }" >
    <router-link to="/suggestion">
      <img src="../../assets/icon_complaints.png">
      <div class="msg-content">
        <div class="msg-title">投诉反馈</div>
        <div class="msg">您的投诉管理员已处理，请查看详情。</div>
      </div>
    </router-link>
  </div>

  <div class="msg-item" v-bind:class="{ 'display': isdisplay3, 'normal': normal }" >
    <router-link to="/msgPay">
      <img src="../../assets/icon_pay.png">
      <div class="msg-content">
        <div class="msg-title">续费通知</div>
        <div class="msg">您的课程需要续费了</div>
      </div>
    </router-link>
  </div>
  
  <div class="msg-item" v-bind:class="{ 'display': isdisplay4, 'normal': normal }" >
    <router-link to="/msgPlan">
      <img src="../../assets/icon_plan.png">
      <div class="msg-content">
        <div class="msg-title">教学计划</div>
        <div class="msg">您好，管理员已为您匹配一位与您期望相符的学生
        ，请尽快根据学生信息和学习目标，制定合理的教学计划。</div>
      </div>
    </router-link>
  </div>

  <div class="msg-item" v-bind:class="{ 'display': isdisplay5, 'normal': normal1 }" >
    <img src="../../assets/icon_Withdrawal.png">
    <div class="msg-content">
      <div class="msg-title">通知</div>
      <div class="msg">暂无新消息</div>
    </div>  
  </div>
  <tabbar ref="tabbar"></tabbar>
	<router-view></router-view>
</div>
</template>

<script>
import axios from 'axios'
import tabbar from '../../components/tabbar.vue'
export default {
  name: 'message',
  components: {
    tabbar
  },
  data () {
    return {
      isdisplay1:true,
      isdisplay2:true,
      isdisplay3:true,
      isdisplay4:true,
      normal: false,
      isdisplay5:false,
      normal1:true,
      match: [],
      suggestion:[],
      plan:[],
      needPayments:[]
    }
  },
  created () {
    let self = this
    this.studentId = sessionStorage.getItem('studentId')
    axios.get('/tatuweb/studentGetMsg?studentId=' + self.studentId).then(function (res) {
      self.match = res.data.data.courseInfos
      self.suggestion = res.data.data.complainFeedbacks
      self.plan = res.data.data.courseInfos
      self.needPayments = res.data.data.needPayments
      if(self.match.length > 0 || self.suggestion.length > 0 || self.needPayments.length > 0 || self.plan.length > 0){
        self.isdisplay5 = true
      }
      if(self.match.length > 0){ //如果付费消息数组长度大于0 ，则显示这一栏
        self.isdisplay1 = false
        self.normal = true
        self.match = res.data.data.courseInfos[0]
      }
      if(self.suggestion.length > 0){
        self.isdisplay2 = false
        self.normal = true
        self.suggestion = res.data.data.complainFeedbacks[0]
      }
      if(self.needPayments.length > 0){
        self.isdisplay3 = false
        self.normal = true
        self.needPayments = res.data.data.needPayments[0]
      }
      if(self.plan.length > 0){
        self.isdisplay4 = false
        self.normal = true
        self.plan = res.data.data.courseInfos[0]
      }
    })
  },
  mounted (){
    let self = this
    self.$refs.tabbar.hoverBgInfo('msg')
  }
}
</script>
<style scoped>
.container{
  overflow: auto;
  height: 100%;
}
.msg-item{  
  height: 1.5rem;
  background-color: #fff;
  border-bottom:1px #ddd solid;
}
.msg-item img{
  width: 1rem;
  height: 1rem;
  margin: .3rem .22rem .2rem .3rem;
  float: left;
}
.msg-content{
  float: left;
  margin-top: .42rem;
  margin-bottom: .24rem;
}
.msg-title{
  font-size: .3rem;
  color: #333;
  margin-bottom: .24rem;
}
.msg{
  font-size: .24rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 3.8rem
}
.others{
  float: left;
  margin-top: .42rem;
}
.time{  
  position: absolute;
  right: .3rem;
  font-size: .22rem;
  color: #999;
}
.msg-num{
  width: .34rem;
  height: .34rem;
  background-color: red;
  margin-top: .54rem;
  position: absolute;
  right: .3rem;
  border-radius: .3rem;
  font-size: .24rem;
  color: #fff;
  text-align: center;
  line-height: .34rem;
}
.normal{
  overflow: auto;
}
.display{
  display: none;
  overflow: auto;
}
</style>
