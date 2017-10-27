<template>
<!-- 我的→我的学生→学生详情 -->
<div class="container" v-title="'学生详情'">
	<div class="top">
		<div class="top-left">
			<div class="title">
				<div class="line"></div>
				<h1>{{ evaluation.teacherName}}·</h1>
				<h2>{{ evaluation.courseInfo.classType }}·</h2>
				<h2>{{ evaluation.courseInfo.subject }}</h2>
			</div>			
			<div class="time">
				<p>上课时间：{{ evaluation.checkins.day }}</p>				
			</div>
			<div class="place">
				<p>{{ startTime }} ~ {{ endTime }}</p>
			</div>
			<div class="place">
				<p>上课地点：{{ evaluation.courseInfo.userId }}</p>
			</div>			
			<div class="progress">
			<el-progress
			:percentage="evaluation.evaluates.period * 100 / evaluation.courseInfo.payClass" 
			status="success" 
			:show-text="false"
			:stroke-width="4"
			></el-progress>
			</div>
		</div>
		<div class="top-right">
			<img :src="evaluation.teacherHeadUrl">
			<div v-if="evaluation.evaluates.period >= 1" class="num">
				{{ evaluation.evaluates.period }}/{{ evaluation.courseInfo.payClass }}次课
			</div>										
			<div class="num" v-else>试课</div>
		</div>		
	</div>
	<div class="clear"></div>

	<div  class="starContent">
		<div class="title">
			<div class="line"></div>
			<h1>老师得分</h1>
		</div>
		<div class="star">
			<div class="item">
				<p>课堂亲和力：</p>
				<el-rate class="rate" v-model="value1" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>教学态度：</p>
				<el-rate class="rate" v-model="value2" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>教学质量：</p>
				<el-rate class="rate" v-model="value3" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>语音语速：</p>
				<el-rate class="rate" v-model="value4" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>准时程度：</p>
				<el-rate class="rate" v-model="value5" disabled show-text text-color="#666"  ></el-rate>
			</div>	
			<div  class="item">	
				<p>详细评价: </p>
				<h3>{{evaluation.evaluates.studentEvaluate}}</h3>				
			</div>
		</div>
	</div>
	<!--教学计划-->
	 <div class="plan" style="background-color:#fff">
		<div class="title">
			<div class="line"></div>
			<h1>教学计划</h1>						
		</div>
		 <div class="plandetail" style="margin-bottom:1rem"> 
			<p>{{ evaluation.courseInfo.content }}</p>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'evaluationDetail',
  data () {
    return {
      evaluation: {},
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      startTime:'',
      endTime:''
    }
  },
  created () {
    this.evaluation = JSON.parse(this.$route.params.item)			
    this.value1 = this.evaluation.evaluates.studentEvaOne
    this.value2 = this.evaluation.evaluates.studentEvaTwo
    this.value3 = this.evaluation.evaluates.studentEvaThree
    this.value4 = this.evaluation.evaluates.studentEvaFour
    this.value5 = this.evaluation.evaluates.studentEvaFive

    var startTime = this.evaluation.checkins.startTime
    var endTime = this.evaluation.checkins.endTime
    this.evaluation.checkins.day = startTime

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
	height: 1.48rem;
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
	margin-top: .5rem;
}
.plan .bianji{
	font-size: .28rem;
	color: #999;
	line-height: .3rem;
	float: right;
	margin-right: .3rem
}
.plandetail{
	clear: both;
	margin-right: .3rem;
	margin-left: .52rem;
	line-height: .35rem;
}
</style>
