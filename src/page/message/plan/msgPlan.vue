<template>
<div class="container" v-title="'教学计划'">
<div v-for="(item,index) in plan">    
	<!-- <div class="time"><span>11:09</span></div> -->
	
	<router-link :to="{name: 'planDetail', params: {index: index}}">
		<div class="main">
			<div class="top">
				<img src="../../../assets/icon_matching.png" alt="img">
				<h1>教学计划</h1>
				<!-- <div class="main-time">11:09</div> -->
			</div>
			<div class="middle">
				<p>您好，您的老师已为您定制了教学计划，请查看，以便配合老师上课安排。如果不满意，请与老师沟通修改。</p>
				<div class="head"><img :src="item.teacherInfo.headurl"></div>
				<div class="title">
					<span class="name">{{ item.teacherInfo.name }} ·</span> 
					<span>{{  item.teacherInfo.classType }} </span>
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
  name: 'msgPlan',
  props: {
  },
  data () {
    return {
      plan: []
    }
  },
  created () {
    let self = this
    self.index = self.GetQueryString('index')
    this.teacherId = sessionStorage.getItem('teacherId')
    this.$http.get('/tatuweb/studentGetMsg?teacherId=' + self.teacherId).then((response) => {
      // debugger
      this.plan = response.body.data.courseInfos
    })
  }
}
</script> 

<style scoped>
.container{
	overflow: auto;
	height: 100%;
}
.time{
	margin:0 auto;
	text-align: center;
}
.time span{
	padding: .08rem .12rem;
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
.middle{
	padding: .36rem .32rem .5rem .32rem;
}
.middle p{
	font-size: .28rem;
	color: #666;
	line-height: .4rem
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


