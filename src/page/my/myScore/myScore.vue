<template>
<div class="container" v-title="'综合评分'">
	<div class="user">
		<img class="userImg" :src="studentInfo.headurl">
		<div class="user-main">
			<h1>{{ studentInfo.name }}</h1>
			<div class="user-data">
				<div class="pingfen">
					<h2>{{ (studentInfo.evaAveOneS + studentInfo.evaAveTwoS + studentInfo.evaAveThreeS + studentInfo.evaAveFourS) /4}}</h2>
					<h3>评分</h3>
				</div>
				<div class="line"></div>
				<div class="keshi"><h2>{{ data.period }}</h2><h3>课时</h3></div>
				<div class="line"></div>
				<div class="student"><h2>{{ data.teacherNum }}</h2><h3>老师</h3></div>
			</div>
		</div>
	</div>
	
	<div  class="starContent">
		<div class="title">
			<div class="line"></div>
			<h1>综合得分</h1>
		</div>
		<div class="star">
			<div class="item">
				<p>互动积极性:</p>
				<el-rate class="rate" v-model="value1" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>课堂领悟力:</p>
				<el-rate class="rate" v-model="value2" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>专心程度:</p>
				<el-rate class="rate" v-model="value3" disabled show-text text-color="#666"  ></el-rate>
			</div>
			<div  class="item">	
				<p>课堂表现:</p>
				<el-rate class="rate" v-model="value4" disabled show-text text-color="#666"  ></el-rate>
			</div>	
		</div>
	</div>
    
</div>
</template>

<script>
import staritem from '../../../components/staritem.vue'
export default {
  name: 'myScore',
  components: {
    staritem
  },
  props: {
  },
  data () {
    return {
      data: {},
      studentInfo: {},
      goal: 5,
      period: 0,
      studentNum: 0,
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0
    }
  },
  created () {
    let self = this
    self.openid = self.GetQueryString('openid')
    this.$http.get('/tatuweb/studentLogin?openid=' + self.openid).then((response) => {
      this.data = response.body.data
      this.studentInfo = response.body.data.studentInfo
      this.value1 =  this.studentInfo.evaAveOneS
      this.value2 = this.studentInfo.evaAveTwoS
      this.value3 = this.studentInfo.evaAveThreeS
      this.value4 = this.studentInfo.evaAveFourS
      if(this.studentInfo.evaAveOneS === null){
        this.value1 = 0
	  }else{
	    this.value1 = this.studentInfo.evaAveOneS
	  }
	  if(this.studentInfo.evaAveTwoS === null){
	    this.value2 = 0
	  }else{
	    this.value2 = this.studentInfo.evaAveTwoS
	  } 
	  if(this.studentInfo.evaAveThreeS === null){
	    this.value3 = 0
	  }else{
	    this.value3 = this.studentInfo.evaAveThreeS
	  }
	  if(this.studentInfo.evaAveFourS === null){
	    this.value4 = 0
	  }else{
	    this.value4 = this.studentInfo.evaAveFourS
	  } 
    })
  }
}
</script>
<style scoped>
.container{
	width: 100%;
}
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

.user{
	height: 2.24rem;
	margin-top: .3rem;
	margin-bottom: .2rem;
	background-color: #fff;
}
.user img{
	float: left;
	width: 1.48rem;
	margin: .34rem .4rem .42rem .3rem;
	border-radius: 1.48rem;
}
.user-main{
	float: left;
	margin-top: .48rem;
}
.more{
	float: right;
	margin-top: .62rem
}
.more img{
	width: .18rem;
}
.user-main h1{
	font-size: .32rem;
	color: #333;
	font-weight: bold;
}
.user-data{
	margin-top: .42rem;
}
.user-data h2{
	font-size: .24rem;
	color: #333;
}
.user-data h3{
	font-size: .22rem;
	color: #999;
	margin-top: .12rem;
}
.user-data .pingfen{
	float: left;
	text-align: center;
}
 .keshi,.student{
 	float: left;
	text-align: center;
 }
.user-data .line{
	margin: .12rem .44rem;
	width: .01rem;
	height: .34rem;
	background-color: #e6e6e6;
	float: left;
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
</style>