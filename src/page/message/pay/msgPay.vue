<template>
<div class="container" v-title="'续费通知'">
<div   v-for="(item,index) in Pay"> 
	<!-- <div class="time"><span>17:05</span></div> -->
	<div class="main">
		<div class="top">
			<img src="../../../assets/icon_pay.png" alt="img">
			<h1>续费通知</h1>
			<!-- <div class="main-time">17:05</div> -->
		</div>
		<div class="middle">
			<h2>待续费课程</h2>
			<div class="head"><img :src="item.teacherInfo.headurl" ></div>
				<div class="title">
					<span class="name">{{ item.teacherInfo.name }} ·</span> 
					<span>{{ item.courseInfo.classType }} </span>
				</div>
		</div>
		<div class="line"></div>
		<div class="bottom">
			<div>
				<h1>余下课程：</h1>
				<p>一次</p>
			</div>
			<div style="margin-top:.24rem">
				<h1>课程收费：</h1>
				<p>{{ item.courseInfo.price }}元/节</p>
			</div>
			<div style="margin-top:.24rem">
				<h1>到期时间：</h1>
				<p>{{ item.courseInfo.timeOfDay}}</p>
			</div>
		</div>
		<div class="more">		
			<router-link :to="{name: 'payCouresDetail', params: {index: index}}">
				<div class="one">课程详情<div class="line1"></div></div>
			</router-link>				
			<router-link :to="{name: 'couresPay', params: {index: index}}">
				<div class="two">续费</div>
			</router-link>
		</div>
	</div>
</div>
	<router-view></router-view>	
</div>
</template>

<script>
export default {
  name: 'msgPay',
  props: {
  },
  data () {
    return {
      Pay: []
    }
  },
  created () {
    let self = this
    this.studentId = sessionStorage.getItem('studentId')
    this.$http.get('/tatuweb/studentGetMsg?studentId=' + self.studentId).then((response) => {
      // debugger
      this.Pay = response.body.data.needPayments
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
	padding: .34rem .32rem .5rem .32rem;
}
.middle h2{
	font-size: .32rem;
	color: #333;
}
.middle .head{
	margin-top: .3rem;
	text-align: center;
}
.middle .title{
	margin-top: .28rem;
	text-align: center;
}
.head img{
	width: 1.48rem;
	border-radius: 1.48rem
}
.title:last-child{
	font-size: .30rem;
	color: #333;
}
.name{
	font-size: .32rem;
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
}
.more{
	background-color: #fff;
	height: .84rem;
}
.one,.two{
	font-size: .32rem;
	width: 50%;
	float: left;
	margin-top: .26rem;
	margin-bottom: .26rem;
	text-align: center;
}
.one{
	color: #666;
}
.two{
	color: #52ba4a;
}
.more .line1{	
	background-color: #efefef;
	width: 1px;
	height: .84rem;
	float: right;
	margin-top: -.26rem;
}
</style>
