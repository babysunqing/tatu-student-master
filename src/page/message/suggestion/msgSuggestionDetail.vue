<template>
<div class="couresDetail-container" v-title="'课程详情'">
	<div class="top">
		<div class="top-left">
			<div class="title">
				<div class="line"></div>
				<h1>{{ item.teacherName }}·</h1>
				<h2>{{ item.courseInfo.classType }}· </h2>
				<h2>{{ item.courseInfo.subject }}</h2>
			</div>			
			<div class="time">
				<p>上课时间：{{ item.courseInfo.day }}</p>
			</div>
			<div class="place">
				<p>{{ startTime }} ~ {{ endTime }}</p>
			</div>
			<div class="place"><p>上课地点：科技园校区</p></div>
			<div class="progress">
				<el-progress
				:percentage="item.courseInfo.totalPeriod*100/item.courseInfo.payClass" 
				status="success" 
				:show-text="false"
				:stroke-width="4"
				></el-progress>
			</div>
		</div>
		<div class="top-right">
			<img :src="item.headurl">
			<div class="num">{{ item.courseInfo.totalPeriod }}/{{ item.courseInfo.payClass }}次课</div>
		</div>		
	</div>
	<div class="clear"></div>

	<div class="title">
		<div class="line"></div>
		<h1>学生得分</h1>
	</div>
	<div class="star">
			<div class="item">
				<p>互动积极性:</p>
				<el-rate class="rate" v-model="item.evaluateRecord.teacherEvaLineOne" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>课堂领悟力:</p>
				<el-rate class="rate" v-model="item.evaluateRecord.teacherEvaLineTwo" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>专心程度:</p>
				<el-rate class="rate" v-model="item.evaluateRecord.teacherEvaLineThree" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>课堂表现:</p>
				<el-rate class="rate" v-model="item.evaluateRecord.teacherEvaLineFour" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item evaluate">	
			<p>详细评价：</p>
			<h3>
				{{ item.evaluateRecord.teacherEvaluate }}
			</h3>
		</div>	
		</div>
	
	<div class="title" style="margin-top:.5rem">
		<div class="line"></div>
		<h1>老师得分</h1>
	</div>
	<div class="star">
		<div class="item">
			<p>课堂亲和力：</p>
			<el-rate class="rate" v-model="item.evaluateRecord.studentEvaLineOne" disabled show-text text-color="#666"  ></el-rate>
		</div>
		<div  class="item">	
			<p>教学态度：</p>
			<el-rate class="rate" v-model="item.evaluateRecord.studentEvaLineTwo" disabled show-text text-color="#666"  ></el-rate>
		</div>
		<div  class="item">	
			<p>教学质量：</p>
			<el-rate class="rate" v-model="item.evaluateRecord.studentEvaLineThree" disabled show-text text-color="#666"  ></el-rate>
		</div>
		<div  class="item">	
			<p>语音语速：</p>
			<el-rate class="rate" v-model="item.evaluateRecord.studentEvaLineFour" disabled show-text text-color="#666"  ></el-rate>
		</div>
		<div  class="item">	
			<p>准时程度：</p>
			<el-rate class="rate" v-model="item.evaluateRecord.studentEvaLineFive" disabled show-text text-color="#666"  ></el-rate>
		</div>	
		<div  class="item evaluate">	
			<p>详细评价：</p>
			<h3>{{ item.evaluateRecord.studentEvaluate }}</h3>
		</div>
	</div>

	<!--教学计划-->
	 <div class="plan" style="background-color:#fff">
		<div class="title">
			<div class="line"></div>
			<h1>教学计划</h1>
		</div>
		 <div class="plandetail"> 
			<p>{{ item.courseInfo.content}}</p>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'msgSuggestionDetail',
  data () {
    return {}
  },
  created () {
    this.item = this.$route.params.item 
    var startTime = this.item.courseInfo.startTime
    var endTime = this.item.courseInfo.endTime
    this.item.courseInfo.day = new Date(parseInt(startTime) * 1000).toLocaleDateString()

    this.startTime = new Date(parseInt(startTime) * 1000).toLocaleTimeString('chinese',{hour12:false})
    this.startTime = this.startTime.substr(0,this.startTime.length-3)

    this.endTime = new Date(parseInt(endTime) * 1000).toLocaleTimeString('chinese',{hour12:false})
    this.endTime = this.endTime.substr(0,this.endTime.length-3)
  }
}
</script> 

<style scoped>
.couresDetail-container{
	width: 100%;	
	background-color: #fff;
	padding-bottom: .3rem;
	padding-top: .3rem;
	margin-top: .3rem;
	overflow: auto;
	height: 100%;
}
.clear{
	clear: both;
}
.star{
	clear: both;
	margin-left: .52rem;
}
.rate{	
	width: 4rem;
	letter-spacing: .1rem;		
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
	line-height: .4rem
}
.evaluate{
	height: auto;
}
.evaluate h3{
	height: auto;
}
.star h3{
	font-size: .28rem;
	color: #666;
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
}
h1{
	font-size: .3rem;
	color: #333;
	float: left;
	margin-bottom:.3rem;
	font-weight: bold;
}
h2{
	font-size: .28rem;
	line-height: .32rem;
	float: left;
}
.place,.time{
	width: 90%;
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
    margin-top: .48rem;
    margin-bottom: .48rem
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
	margin-top: .58rem;
	color: #2cc17b;
	font-size: .26rem;
}
/*------------------- 教学计划 plan  --------------------*/
.plan{
	margin-top: .5rem;
	margin-bottom: 1rem
}
.plandetail{
	clear: both;
	margin-right: .3rem;
	margin-left: .52rem;
	line-height: .35rem;
	line-height: .4rem
}
</style>
