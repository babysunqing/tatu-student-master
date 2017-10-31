<template>
<div class="container" v-title="'TaTu课堂'">
	<router-link :to="{name: 'myInfo', params: {info: JSON.stringify(studentInfo)}}">
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
		<div class="more"><img src="../../assets/icon_details_big.png"></div>
	</div>
	</router-link>
	<router-link to="/myTeacher">
		<div class="user-item">
			<img src="../../assets/icon_account.png">
			<p>我的老师</p>
			<div class="user-item-more"><img src="../../assets/icon_details_small.png"></div>
		</div>
	</router-link>
	<router-link to="/myEvaluation">
		<div class="user-item">
			<img src="../../assets/icon_evaluation.png">
			<p>我的评价</p>
			<div class="user-item-more"><img src="../../assets/icon_details_small.png"></div>
		</div>
	</router-link>
	<router-link :to="'/myScore?openid=' + this.openid">
		<div class="user-item">
			<img src="../../assets/icon_comprehensive.png">
			<p>综合得分</p>
			<div class="user-item-more"><img src="../../assets/icon_details_small.png"></div>
		</div>
	</router-link>
	<router-link to="/mySuggestion">
		<div class="user-item">
			<img src="../../assets/icon_suggest.png">
			<p>建议/申诉</p>
			<div class="user-item-more"><img src="../../assets/icon_details_small.png"></div>
		</div>
	</router-link>
	<tabbar ref="tabbar"></tabbar>
	<router-view></router-view>
</div>
</template>

<script>
import tabbar from '../../components/tabbar.vue'
export default {
  name: 'my',
  components: {
    tabbar
  },
  props: {
  },
  data () {
    return {
      data: {},
      studentInfo: {},
      period: 0,
      studentNum: 0,
      goal: 5
    }
  },
  created () {
    let self = this
    this.openid = sessionStorage.getItem('openid')
    this.$http.get('/tatuweb/studentLogin?openid=' + self.openid).then((response) => {
      // debugger
      this.data = response.body.data
      this.studentInfo = response.body.data.studentInfo
      sessionStorage.setItem('studentId', this.studentInfo.studentId)
      sessionStorage.setItem('userId', this.studentInfo.userId)
      sessionStorage.setItem('openid', self.openid)
    })
  },
   mounted (){
  	this.$nextTick(() => {
      let self = this
      self.$refs.tabbar.hoverBgInfo('my')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
	overflow: auto;
	height: 96%;
}
.user{
	width: 100%;
	height: 2.24rem;
	margin-top: .3rem;
	margin-bottom: .2rem;
	background-color: #fff;
}
.user .userImg{
	float: left;
	width: 1.48rem;
	height:1.48rem;
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
	margin-right: .3rem;
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
.pingfen,.keshi,.student{
	float: left;
	text-align: center;
}
 .line{
	margin: .12rem .44rem;
	width: .01rem;
	height: .34rem;
	background-color: #e6e6e6;
	float: left;
}
.user-item{
	width: 100%;
	height: 1rem;
	background-color: #fff;
	border-bottom: .01rem solid #f5f5f5;
}
.user-item img{
	margin: .26rem .2rem .26rem .4rem;
	float: left;
	width: .48rem;
}
.user-item p{
	font-size: .28rem;
	color: #333;
	line-height: 1rem;
	float: left;
}
.user-item-more{
	float: left;
	position: absolute;
	right: .3rem;
}
.user-item-more img{
	width: .2rem;
	height: .2rem;
	margin-top: .4rem
}
</style>
