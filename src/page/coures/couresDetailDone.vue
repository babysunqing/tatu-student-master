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
				<p>上课时间：{{ checkin.day }}</p>
			</div>
			<div class="place">
				<p>{{ startTime }} ~ {{ endTime }}</p>
			</div>
			<div class="place"><p>上课地点：科技园校区</p></div>			
			<div class="progress">
				<el-progress class="progress"
				:percentage="checkin.period * 100 / item.courseInfo.payClass" 
				status="success" 
				:show-text="false"
				:stroke-width="4"
				></el-progress>
			</div>
		</div>
		<div class="top-right">
			<img :src="item.teacherHeadUrl">
			<p v-if="checkin.period >= 1">
				{{ checkin.period }}/{{ item.courseInfo.payClass }}次课
			</p>			
			<p v-else>试课</p>
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
				<el-rate class="rate" v-model="stuValue1" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>课堂领悟力:</p>
				<el-rate class="rate" v-model="stuValue2" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>专心程度:</p>
				<el-rate class="rate" v-model="stuValue3" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>课堂表现:</p>
				<el-rate class="rate" v-model="stuValue4" disabled show-text text-color="#666"  ></el-rate>
			</div>	
			<div  class="item">	
			<p>详细评价：</p><h3>{{ teacherEvaluate }}</h3>
		</div>
		</div>
	
	<div class="title" style="margin-top:.5rem">
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
			<p>详细评价：</p><h3>{{ studentEvaluate }}</h3>
		</div>
	</div>

	<!--教学计划-->
	 <div class="plan" style="background-color:#fff">
		<div class="title">
			<div class="line"></div>
			<h1>教学计划</h1>
		</div>
		 <div class="plandetail"> 
			<p>{{ item.courseInfo.content }}</p>
		</div>
	</div>
</div>	
</template>

<script>
import staritem from '../../components/staritem.vue'
export default {
  name: 'couresDetailDone',
  components: {
    staritem
  },
  data () {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      value5: 0,
      stuValue1: 0,
      stuValue2: 0,
      stuValue3: 0,
      stuValue4: 0,
      studentEvaluate:'暂无评价！',
      teacherEvaluate:'暂无评价！',
      classes: []
    }
  },
  created () {
    this.item = this.$route.params.item
    this.checkin = this.$route.params.checkin
    
    var startTime = this.checkin.startTime
    var endTime = this.checkin.endTime

    this.startTime = new Date(parseInt(startTime) * 1000).toLocaleTimeString('chinese',{hour12:false})
    this.startTime = this.startTime.substr(0,this.startTime.length-3)

    this.endTime = new Date(parseInt(endTime) * 1000).toLocaleTimeString('chinese',{hour12:false})
    this.endTime = this.endTime.substr(0,this.endTime.length-3)
    
    if(this.item.evaluates.length > 0){
    	for(var i = 0;i < this.item.evaluates.length; i++){
    		if(this.item.evaluates[i].period === this.checkin.period){
    			this.value1 = this.item.evaluates[i].studentEvaOne
			    this.value2 = this.item.evaluates[i].studentEvaTwo
			    this.value3 = this.item.evaluates[i].studentEvaThree
			    this.value4 = this.item.evaluates[i].studentEvaFour
			    this.value5 = this.item.evaluates[i].studentEvaFive
			    this.studentEvaluate = this.item.evaluates[i].studentEvaluate
			    this.teacherEvaluate = this.item.evaluates[i].teacherEvaluate
			    this.stuValue1 = this.item.evaluates[i].teacherEvaOne
			    this.stuValue2 = this.item.evaluates[i].teacherEvaTwo
			    this.stuValue3 = this.item.evaluates[i].teacherEvaThree
			    this.stuValue4 = this.item.evaluates[i].teacherEvaFour
    		}
    	}
    }		
    
    
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
	margin-bottom: .3rem;
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
    margin-left: .3rem;
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
	height: 1.48rem;
	border-radius: 1.48rem;
	margin-bottom: .1rem
}
.top-right p{
	color: #2cc17b;
	font-size: .26rem;
	margin-top: .4rem
}
.plan{
	margin-top: .5rem;
	margin-bottom: 1rem
}
.plandetail{
	clear: both;
	margin-right: .3rem;
	margin-left: .52rem;
	line-height: .35rem
}
</style>
