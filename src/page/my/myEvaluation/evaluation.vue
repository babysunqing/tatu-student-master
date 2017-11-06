<template>
<div class="container">
	<div class="plan">
		<div class="title">
			<div class="line"></div>
			<h1>详细评价</h1>
		</div>
		<form>
			<div class="plandetail">
			    <input type="hidden" name="courseId" value="courseId">
				<textarea placeholder="请输入对老师的详细评价！" name="content" v-model="studentEvaluate"></textarea>
			</div>
		</form>
	</div>
	<div  class="starContent">
		<div class="title">
			<div class="line"></div>
			<h1>综合得分</h1>
		</div>
		<div class="star">
			<div class="item">
				<p>课堂亲和力:</p>
				<el-rate class="rate" v-model="studentEvaLineOne" 
				show-text :texts="arr" ></el-rate>
			</div>
			<div  class="item">	
				<p>教学态度:</p>
				<el-rate class="rate" v-model="studentEvaLineTwo" 
				show-text :texts="arr" ></el-rate>
			</div>
			<div  class="item">	
				<p>教学质量:</p>
				<el-rate class="rate" v-model="studentEvaLineThree" 
				show-text :texts="arr" ></el-rate>
			</div>
			<div  class="item">	
				<p>语音语速:</p>
				<el-rate class="rate" v-model="studentEvaLineFour" 
				show-text :texts="arr" ></el-rate>
			</div>	
			<div  class="item">	
				<p>准时程度:</p>
				<el-rate class="rate" v-model="studentEvaLineFive" 
				show-text :texts="arr" ></el-rate>
			</div>			
		</div>
	</div>

	<div class="bottom" @click="finish()">
		确定
	</div>
	
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'evaluation',
  data () {
    return {
      url:'',
      arr: ['1.0', '2.0', '3.0', '4.0', '5.0'],
      studentEvaLineOne: 5,
      studentEvaLineTwo: 5,
      studentEvaLineThree: 5,
      studentEvaLineFour: 5,
      studentEvaLineFive: 5,
      studentEvaluate: '',
      courseId: '',
      period: 0,
      isComplain: false
    }
  },
  methods: {
    finish: function () {
      this.period = this.$route.params.noEvaluation.checkins.period
      this.courseId = this.$route.params.noEvaluation.courseInfo.courseId
      if(this.studentEvaluate === ''){
      	alert('请填写详细评价')
      	return
      }
      var params = new URLSearchParams()
      params.append('period', this.period)
      params.append('courseId', this.courseId)
      params.append('studentEvaLineOne', this.studentEvaLineOne)
      params.append('studentEvaLineTwo', this.studentEvaLineTwo)
      params.append('studentEvaLineThree', this.studentEvaLineThree)
      params.append('studentEvaLineFour', this.studentEvaLineFour)
      params.append('studentEvaLineFive', this.studentEvaLineFive)
      params.append('studentEvaluate', this.studentEvaluate)
      params.append('isComplain', this.isComplain)
      axios({
        method: 'post',
        url: '/tatuweb/studentEvaluate',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: params
      }).then(function (response) {
        window.history.go(-2)
      })
    }
  }
}
</script> 

<style scoped>
.container{
	width: 100%;
	height: auto;
	padding-bottom: .1rem;
	min-height: 4rem;
	background-color: #fff;
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
.plan{
	width: 100%;
	height: auto;
	padding-top: .3rem;
}
.plandetail textarea{
	width: 84%;
	min-height: 3.5rem;
	border: 0px;
	margin-right: .3rem;
	margin-left: .52rem;
	line-height: .35rem;
}
.picContent{
	width: 100%;
	height: 2rem;
	padding-top: .2rem;
	margin-bottom: .4rem;
}
.pic{
	width: 1.9rem;
	height: 1.9rem;
	float: left;
	margin-left: .15rem;
}
/*------------------- 星级评分  --------------------*/
.starContent{
	width: 100%;
	height: 3.5rem;
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
.bottom{
	width: 100%;
	height: .88rem;
	color: #fff;
	font-size: .34rem;
	background-color:#2cc17b; 
	text-align: center;
	line-height: .88rem;
	position: fixed;
	bottom: 0;
}
</style>
