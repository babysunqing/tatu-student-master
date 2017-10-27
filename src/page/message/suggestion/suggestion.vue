<template>
<div class="container" v-title="'投诉反馈'">
<div  v-for="item in complainFeedbacks"> 
	<!-- <div class="time"><span>{{ item.evaluateRecord.time }}</span></div> -->
	<router-link :to="{name: 'msgSuggestionDetail', params: {item: item}}">
	<div class="main">
		<div class="top">
			<img src="../../../assets/icon_complaints.png" alt="img">
			<h1>投诉反馈</h1>
			<div class="main-time">{{ item.createTime }}</div>
		</div>
		<div class="middle">
			<h2>{{ item.evaluateRecord.handleSuggestion }}</h2>				
		</div>
		<div class="line"></div>
		<div class="bottom">
			<div>
				<h1>投诉课程：</h1>
				<p>{{ item.teacherName }}·{{ item.courseInfo.classType }}·{{ item.courseInfo.subject }}</p>
			</div>
			<div style="margin-top:.24rem">
				<h1>投诉时间：</h1>
				<p>{{ item.evaluateRecord.day }} &nbsp{{ item.evaluateRecord.hours }}</p>
			</div>
			<div style="margin-top:.24rem">
				<h1>具体投诉内容：</h1>
				<p>{{ item.evaluateRecord.studentEvaluate }}</p>
			</div>
		</div>
		<div class="more">
			<span>查看详情</span>
			<img src="../../../assets/icon_details_small.png">			
		</div>
	</div>
	</router-link>
</div>
		
</div>
</template>

<script>
export default {
  name: 'msgPay',
  props: {
  },
  data () {
    return {
      complainFeedbacks: [],
      studentInfo: {}
    }
  },
  created () {
    let self = this
    self.index = self.GetQueryString('index')
    this.teacherId = sessionStorage.getItem('teacherId')
    this.$http.get('/tatuweb/studentGetMsg?teacherId=' + self.teacherId).then((response) => {
      // debugger
      this.complainFeedbacks = response.body.data.complainFeedbacks
      if(this.complainFeedbacks.length > 0){
      	for (var i = 0; i <= this.complainFeedbacks.length; i++) {
	        var time = this.complainFeedbacks[i].courseInfo.createTime
	        var day = new Date(parseInt(time) * 1000).toLocaleDateString()
	        var hours = new Date(parseInt(time) * 1000).toLocaleTimeString('chinese',{hour12:false})
	        hours = hours.substr(0,hours.length-3)
	        this.complainFeedbacks[i].evaluateRecord.day = day
	        this.complainFeedbacks[i].evaluateRecord.hours = hours

	        if(this.complainFeedbacks[i].courseInfo.classType === '1'){
	      	   this.complainFeedbacks[i].courseInfo.classType = '辅导课'
	        }else if(this.complainFeedbacks[i].courseInfo.classType === '2'){
	      	   this.complainFeedbacks[i].courseInfo.classType = '教学课'
	        }
	    }
      }      
    })
  }
}
</script> 

<style scoped>
.container{
	overflow: auto;
	height: 96%;
}
.time{
	margin:0 auto;
	text-align: center;
}
.time span{
	margin-top: .3rem;
	padding: .12rem;
	background-color: #cccccc;
	color: #fff;
	font-size: .24rem;
	border-radius: .1rem;
}
.main{
	margin: .6rem .3rem .3rem .3rem;
	background-color: #fff;
	border-radius: .1rem;
}
.top{
	height: 1.04rem;
	border-bottom: .01rem solid #efefef;
}
.top img{
	margin: .24rem .18rem .24rem .32rem;
	float: left;
	width: .56rem;
}
.top h1{
	font-size: .3rem;
	color: #333;
	font-weight: bold;
	line-height:1.04rem;
	float: left; 
}
.top .main-time{
	color: #ccc;
	font-size: .24rem;
	float: right;
	margin-right: .32rem;
	line-height: 1.04rem;
}
.line{
	margin-left: .32rem;
	margin-right: .32rem;
	border-bottom: .01rem dashed #ddd;
}
.middle{
	padding: .34rem .32rem .4rem .32rem;
}
.middle h2{
	font-size: .28rem;
	color: #666;
	line-height: .36rem;
}
.bottom{
	padding: .4rem .32rem;
	border-bottom: .01rem solid #efefef; 
}
.bottom h1{
	font-size: .3rem;
	color: #999;
	float: left;
}
.bottom p{
	font-size: .3rem;
	color: #333;
	white-space:nowrap; 
	overflow:hidden; 
	text-overflow:ellipsis;
}
.more{
	font-size: .32rem;
	color: #666;
	padding: .26rem .32rem;
	border-top: .01rem solid #efefef;
}
.more img{
	float: right;
	width: .15rem;
}
</style>
