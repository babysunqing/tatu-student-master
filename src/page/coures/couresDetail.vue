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
				<p>上课时间：{{ item.courseInfo.startTime }}</p>
			</div>
			<div class="place">
				<p>{{ startTime }} ~ {{ endTime }}</p>
			</div>
			<div class="place"><p>上课地点：科技园校区</p></div>
			<div class="progress">
				<el-progress class="progress"
				:percentage="(item.courseInfo.totalPeriod + 1) * 100 / item.courseInfo.payClass" 
				status="success" 
				:show-text="false"
				:stroke-width="4"
				></el-progress>
			</div>
		</div>
		<div class="top-right">
			<img :src="item.teacherHeadUrl">
			<p>{{ (item.courseInfo.totalPeriod + 1) }}/{{ item.courseInfo.payClass }}次课</p>
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
			<p>{{ item.courseInfo.content }}</p>
		</div>
	</div>
</div>
</template>

<script>
import staritem from '../../components/staritem.vue'
export default {
  name: 'couresDetail',
  components: {
    staritem
  },
  data () {
    return {
      classes: []
    }
  },
  created () {
    this.item = this.$route.params.item
    this.checkin = this.$route.params.checkin
    // debugger
    var startTime = this.item.courseInfo.startTime + 604800
    var endTime = this.item.courseInfo.endTime + 604800
    this.item.day = new Date(parseInt(startTime) * 1000).toLocaleDateString()

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
    margin-left: .28rem;
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
}
.top-right p{
	margin-top: .52rem;
	color: #2cc17b;
	font-size: .26rem;
}
/*------------------- 教学计划 plan  --------------------*/
.plan{
	margin-top: .4rem;
}
.plandetail{
	clear: both;
	margin-right: .3rem;
	margin-left: .52rem;
	line-height: .4rem
}
</style>
