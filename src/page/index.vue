<template>
<div class="container">
	<div class="banner">
		<el-carousel height="3.66rem" style="overflow:hidden;" >
		    <el-carousel-item v-for="item in banner" :key="item">
		    	<img :src="item">
		    </el-carousel-item>
	    </el-carousel>
	</div>
	<div>
		<div class="title"><div class="line"></div><h1>综合评分</h1></div>
	    <div class="item" v-for="item in indexData" >
			<img :src="item.headurl">
			<div style="float:left width：100%">
				<div class="top" style="text-align:left">
					<h1>{{ item.name }} · </h1>
					<h2>{{ item.collegeName }} ·</h2>				
				</div>
				<div class="middle">
					<h3>{{ item.classType }} · {{ item.subject }}</h3>
				</div>	
				<div class="bottom">
					<p>评分：</p>						
				</div>
				<el-rate  id="rate"
					style="margin-top:-.45rem" 
					v-model="item.evaluate"
					disabled 
					show-text 
					text-color="#ff9900" 
					text-template="{value}">
				</el-rate>
			</div>			
		</div>
	</div>
	<router-view></router-view>	
	<tabbar ref="tabbar"></tabbar>
</div>
</template>

<script>
import tabbar from '../components/tabbar.vue'
export default {
  name: 'index',
  components: {
    tabbar
  },
  data () {
    return {
      evaluate: '',
      indexData: [],
      banner: [],
      openid: ''
    }
  },
  created () {
  	if((navigator.userAgent.match(/iPhone/i))) {
	    var ver = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
	    ver = parseInt(ver[1], 10) 
	    if(ver < 9)  
	    {  
	       alert('您的IOS版本过低，请升级后体验!')
	       return false
	    }
    }
    let self = this
    if(self.GetQueryString('openid') != null){
      this.openid = self.GetQueryString('openid')
      this.openid = this.openid.split('#')  // 把openid用从# 分割成一个数组
      this.openid = this.openid[0]   // 获取openid数组的第一个字符，赋值给openid
      sessionStorage.setItem('openid', this.openid)
    }else{
      this.openid = sessionStorage.getItem('openid')
    }
    this.$http.get('/tatuweb/studentHomePage?openid=' + self.openid).then((response) => {
      // debugger
      this.indexData = response.body.data.teachers
      this.banner = response.body.data.banner
      if(this.indexData != null){
      	for(var i=0; i < this.indexData.length; i++){
      		if(this.indexData[i].classType === '1'){
      			this.indexData[i].classType = '辅导课'
      		}else if(this.indexData[i].classType === '2'){
      			this.indexData[i].classType = '教学课'
      		}else{
      			this.indexData[i].classType = '辅导课/教学课'
      		}
      	}
      }
    })
    this.$http.get('/tatuweb/studentLogin?openid=' + self.openid).then((response) => {
      // debugger
      this.studentId = response.body.data.studentInfo.studentId
      sessionStorage.setItem('studentId', this.studentId)
    })
  },
  mounted (){
  	this.$nextTick(() => {
      let self = this
      self.$refs.tabbar.hoverBgInfo('index')
    })
  }
}
</script> 

<style scoped>
.container{
	width: 100%;
	height: 100%;
}
.banner{
	height: 3.66rem;
	border-radius: .1rem;
	margin: .3rem .3rem .44rem .3rem; 
	box-shadow: 0px 3px 3px #b2b2b2;
}
.banner img{
	width: 105%;
	height: 4rem;
	margin-top: -.3rem;
	margin-left: -.3rem;
	border-radius: .1rem;
}
.title{padding-bottom: .5rem;}
.line{
  width: .06rem;
  height: .32rem;
  margin-left: .3rem;
  background-color: #2cc17b;
  border-radius: 3rem;
  margin-right: .16rem;
  float: left;
}
.title h1{
  font-size: .3rem;
  color: #333;
  float: left;
  font-weight: bold;
}
.item{
	background-color: #fff;
	height: 1.96rem;
	margin-bottom: .2rem;
	clear: both;
}
img{
	margin: .24rem .26rem .24rem .30rem;
	width: 1.48rem; 
	height:1.48rem;
	float: left;
	border-radius:1.48rem;
}
.item .top{
	height: .3rem;
	line-height: .3rem;
	padding-top: .36rem;
}
.top h1{
	color: #333;
	font-size: .3rem;
	float: left;
}
.top h2{
	color: #333;
	font-size: .28rem;
	float: left;
}
.top p{
	font-size: .22rem;
	color: #ccc;
	float: right;
	margin-right: .3rem;
}
.middle{
	margin-top: .24rem;
	height: .24rem;
}
.middle h3{
	color: #666;
	font-size: .24rem;
	float: left;
}
.bottom p{
	color: #666;
	font-size: .24rem;
	float: left;
	display: block;
}

.bottom{
 margin-top: .24rem;
}

.el-rate__icon {
    font-size: 12px;
    margin-right: 6px;
    color: #bfcbd9;
    transition: .3s;
}
#rate .el-rate__icon {
	font-size: 12px;
    margin-right: 6px;
    color: #bfcbd9;
    transition: .3s;
}
</style>
