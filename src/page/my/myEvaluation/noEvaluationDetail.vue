<template>
<!-- 我的→我的学生→学生详情 -->
<div class="container" v-title="'学生详情'">
	<div class="top">
		<div class="top-left">
			<div class="title">
				<div class="line"></div>
				<h1>{{ noEvaluation.teacherName}}·</h1>
				<h2>{{ noEvaluation.courseInfo.classType }}·</h2>
				<h2>{{ noEvaluation.courseInfo.subject }}</h2>
			</div>			
			<div class="time"><p>上课时间：{{ noEvaluation.checkins.startTime }}</p></div>
			<div class="place"><p>{{ startTime }} ~ {{ endTime }}</p></div>
			<div class="place"><p>上课地点：{{ noEvaluation.courseInfo.userId }} </p></div>
			<div class="progress">
			<el-progress
			:percentage="noEvaluation.checkins.period * 100 / noEvaluation.courseInfo.payClass" 
			status="success" 
			:show-text="false"
			:stroke-width="4"
			></el-progress>
			</div>
		</div>
		<div class="top-right">
			<img :src="noEvaluation.teacherHeadUrl">
			<div class="num" v-if="noEvaluation.checkins.period >= 1">
				{{ noEvaluation.checkins.period }}/{{ noEvaluation.courseInfo.payClass }}次课
			</div>								
			<div class="num" v-else>试课</div>
		</div>		
	</div>
	<div class="clear"></div>
	
	<!--教学计划-->
	 <div class="plan" style="background-color:#fff">
		<div class="title">
			<div class="line"></div>
			<h1>教学计划</h1>						
		</div>
		 <div class="plandetail"> 
			<p>{{ noEvaluation.courseInfo.content }}</p>
		</div>
	</div>
	<router-link :to="{name: 'evaluation', params: {noEvaluation: noEvaluation}}" >
		<div class="bottom">
			我要评价
		</div>
	</router-link>
	<router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'noEvaluationDetail',
  data () {
    return {
      noEvaluation:''
    }
  },
  created () {
    this.noEvaluation = JSON.parse(this.$route.params.item)
    var startTime = this.noEvaluation.checkins.startTime
    var endTime = this.noEvaluation.checkins.endTime
    this.noEvaluation.checkins.day = startTime
    this.startTime = new Date(parseInt(startTime) * 1000).toLocaleTimeString('chinese',{hour12:false})
    this.startTime = this.startTime.substr(0,this.startTime.length-3)
    this.endTime = new Date(parseInt(endTime) * 1000).toLocaleTimeString('chinese',{hour12:false})
    this.endTime = this.endTime.substr(0,this.endTime.length-3)
  }
}
</script> 

<style scoped>
.container{
	width: 100%;	
	background-color: #fff;
	padding-top: .3rem;
	margin-top: .3rem;
	overflow: auto;
	height: 100%;
	-webkit-overflow-scrolling : touch;
}
.clear{
	clear: both;
}
.line{
	width: .06rem;
	height: .32rem;
	margin-left: .3rem;
	background-color: #2cc17b;
	border-radius: 3rem;
	margin-right: .16rem;
	float: left;
}
p{
	color: #666;
	font-size: .28rem;
	letter-spacing: -0.5px
}
h1{
	font-size: .3rem;
	color: #333;
	float: left;
	margin-bottom: .3rem;
	font-weight: bold;
}
h2{
	font-size: .28rem;
	line-height: .32rem;
	float: left;
}
.place,.time{
	clear: both;
	margin-left: .52rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.place{
	margin-top: .2rem;
}
.top-left{
	float: left;
	width: 70%;
}
.progress{
	width: 3.6rem;
    margin-left: .52rem;
    margin-top: .45rem;
    margin-bottom: .48rem;
}
.top-right{
	text-align: center;
	float: right;
	margin-right: .3rem
}
.top-right img{
	width: 1.48rem;
	border-radius: 1.48rem;
}
.top-right .num{
	margin-top: .56rem;
	color: #2cc17b;
	font-size: .26rem;
}

/*------------------- top end  --------------------*/

/*------------------- 星级评分  --------------------*/
.star{
	clear: both;
	margin-left: .52rem;
}
.rate{	
	width: 4rem;
	letter-spacing: .03rem;		
	float: left;
	margin-top: -.45rem
}
.star p{
	width: 1.7rem;
	font-size: .28rem;
	color: #666;
	float: left;
}
.item{
	width: 100%;
	height: .17rem;
	margin-top: .38rem;
}
.star h3{
	font-size: .28rem;
	color: #666;
}
.starContent{
	background-color: #fff;
	padding-top: .3rem;
	padding-bottom: .5rem;
}
.title h1{
	font-size: .3rem;
	color: #333;
	float: left;
	margin-bottom: .3rem;
	font-weight: bold;
}
.title .line{
	width: .06rem;
	height: .32rem;
	margin-left: .3rem;
	background-color: #2cc17b;
	border-radius: 3rem;
	margin-right: .16rem;
	float: left;
}
/*------------------- 教学计划 plan  --------------------*/
.plan{
	margin-top: .3rem;
}
.plandetail{
	clear: both;
	margin-right: .3rem;
	margin-left: .52rem;
	margin-bottom: .2rem;
	line-height: .4rem;
}
.bottom{
	width: 100%;
	height: .88rem;
	color: #fff;
	font-size: .34rem;
	background-color:#2cc17b; 
	text-align: center;
	line-height: .88rem;
	position: fixed;
	bottom: 0;
}
</style>
