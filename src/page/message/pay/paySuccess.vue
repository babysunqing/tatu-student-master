<template>
<div class="container" v-title="'续费成功'">
  <img src="../../../assets/paySuccess.png">
  <h1>续费成功</h1>
	<div class="content">	
		<div class="top">			
			<h3>付款金额：</h3><h2>￥200</h2>
		</div>
    <div class="top">        
      <h3>续费课程：</h3><h2>教学课·语文·10节</h2>
    </div>
  </div>
  <router-link to="/msgPay">
    <input class="submit" type="submit" value="完成"/>
  </router-link>
  <router-view></router-view> 
</div>
</template>

<script>
export default {
  name: 'paySuccess',
  data () {
    return {
      create: 'create',
      payPrice: '',
      couresNum: 10,
      pay: [],
      courseId: '',
      studentId: ''
    }
  },
  created () {
    let self = this
    self.index = self.GetQueryString('index')
    this.studentId = sessionStorage.getItem('studentId')
    this.$http.get('/tatuweb/studentGetMsg?studentId=' + self.studentId).then((response) => {
      this.pay = response.body.data.needPayments[self.index]
      this.courseId = response.body.data.needPayments[self.index].courseInfo.courseId
      this.studentId = response.body.data.needPayments[self.index].courseInfo.studentId
    })
  },
  methods: {
  }
}
</script> 

<style scoped>
.container{
	overflow: auto;
	height: 96%;
}
img{
  width: 1.48rem;
  margin-left: 39%;
  margin-top: 1rem;
}
h1{
  font-size: .28rem;
  color: #333;
  text-align: center;
  margin-top: .4rem;
}
.content{
  margin-top: .8rem;
  background-color: #fff;
  padding-top: .2rem;
  padding-bottom: .1rem;
}
.top{
  height: .4rem;
  padding-right: .3rem;
}
.top h3{
	font-size: .26rem;
	color: #999;
  float: left;
  margin-left: .3rem;
}
h2{
  font-size: .28rem;
  color: #333;
  float: right;
}
.form span{
	font-size: .5rem;
	float: left;
	line-height: .9rem;
}
input{
	font-size: .96rem;
	outline:medium;
}
.submit{
  margin-left: 4%;
	width: 92%;
	height: .92rem;
	background:url(../../../assets/btn_extract_n.png) no-repeat;
	background-size: 100% 100%;
	font-size: .36rem;
	color: #fff;
	border:none;
	margin-top: .4rem;
	margin-bottom: .54rem；
}
</style>
