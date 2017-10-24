<template>
<div class="couresDetail-container" v-title="'课程详情'">
	<div class="top">
		<div class="top-left">
			<div class="title">
				<div class="line"></div>
				<h1>{{ item.teacherInfo.name }} ·</h1>
				<h2>{{  item.teacherInfo.classType }} · </h2>
				<h2>{{ item.teacherInfo.subject }}</h2>
			</div>			
			<div class="time">
			<p>就读院校：{{ item.teacherInfo.collegeName }}</p>
			</div>
			<div class="place"><p>擅长科目：{{ item.teacherInfo.subject }}</p></div>
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
			<img :src="item.teacherInfo.headurl">
			<div class="num">{{ item.courseInfo.totalPeriod }}/{{ item.courseInfo.payClass }}次课</div>
		</div>		
	</div>
	<div class="clear"></div>
	<!--教学计划-->
	 <div class="plan">
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
  name: 'matchTeacherDetail',
  data () {
    return {}
  },
  created () {
    this.item = this.$route.params.item
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
	margin-top: .11rem;
	color: #2cc17b;
	font-size: .26rem;
}
/*------------------- 教学计划 plan  --------------------*/
.plan{
	margin-top: .3rem;
	margin-bottom: 1rem
}
.plandetail{
	clear: both;
	margin-right: .3rem;
	margin-left: .52rem;
	line-height: .35rem
}
</style>

