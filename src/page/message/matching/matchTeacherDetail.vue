<template>
<div class="couresDetail-container" v-title="'课程详情'">
	<div class="top">
		<div class="top-left">
			<div class="title">
				<div class="line"></div>
				<h1>{{ match.teacherInfo.name }} ·</h1>
				<h2>{{  match.teacherInfo.classType }} · </h2>
				<h2>{{ match.teacherInfo.subject }}</h2>
			</div>			
			<div class="time">
			<p>就读院校：{{ match.teacherInfo.collegeName }}</p>
			</div>
			<div class="place"><p>擅长科目：{{ match.teacherInfo.subject }}</p></div>
			<div class="progress">
				<el-progress
				:percentage="percentage" 
				status="success" 
				:show-text="false"
				:stroke-width="4"
				></el-progress>
			</div>
		</div>
		<div class="top-right">
			<img :src="match.teacherInfo.headurl">
			<div class="num">试课</div>
		</div>		
	</div>
	<div class="clear"></div>
	
	<div class="title">
		<div class="line"></div>
		<h1>综合得分</h1>
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
	</div>

	<!--教学计划-->
	 <div class="plan">
		<div class="title">
			<div class="line"></div>
			<h1>教学计划</h1>
		</div>
		 <div class="plandetail"> 
			<p>{{ content }}</p>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'matchTeacherDetail',
  data () {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      percentage: 0,
      content: '暂无教学计划',
      match: []
    }
  },
  created () {
    let self = this
    this.index = this.$route.params.index
    this.teacherId = sessionStorage.getItem('teacherId')
    this.$http.get('/tatuweb/studentGetMsg?teacherId=' + self.teacherId).then((response) => {
      // debugger
      this.match = response.body.data.courseInfos[self.index]
      this.value1 = response.body.data.courseInfos[self.index].teacherInfo.evaAveOne
      this.value2 = response.body.data.courseInfos[self.index].teacherInfo.evaAveTwo
      this.value3 = response.body.data.courseInfos[self.index].teacherInfo.evaAveThree
      this.value4 = response.body.data.courseInfos[self.index].teacherInfo.evaAveFour
      this.value5 = response.body.data.courseInfos[self.index].teacherInfo.evaAveFive
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
	margin-top: .1rem;
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
	line-height: .35rem
}
</style>
