<template>
<div class="couresDetail-container"  v-title="'课程详情'">
	<div class="top">
		<div class="top-left">
			<div class="title">
				<div class="line"></div>
				<h1>{{ tryClasses.teacherName }}·</h1>
				<h2>{{ tryClasses.courseInfo.classType }}· </h2>
				<h2>{{ tryClasses.courseInfo.subject }}</h2>
			</div>			
			<div class="time">
			<p>上课时间：{{ tryClasses.courseInfo.timeOfDay }}</p>
			</div>
			<div class="place"><p>上课地点：科技园校区</p></div>
			<div class="progress">
				<el-progress class="progress"
				:percentage="0" 
				status="success" 
				:show-text="false"
				:stroke-width="4"
				></el-progress>
			</div>
		</div>
		<div class="top-right">
			<img :src="tryClasses.headurl">
			<p>试课</p>
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
			<p>{{ tryClasses.courseInfo.content }}</p>
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
      tryClasses: []
    }
  },
  created () {
    let self = this
    self.index = self.GetQueryString('index')
    this.studentId = sessionStorage.getItem('studentId')
    this.$http.get('/tatuweb/getClassesByStudentId?studentId=' + self.studentId).then((response) => {
      // debugger
      this.tryClasses = response.body.data.tryClasses[self.index]
    })
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
	border-radius: 1.48rem;
	margin-bottom: .1rem
}
.top-right p{
	color: #2cc17b;
	font-size: .26rem;
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
