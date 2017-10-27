<template>
<div class="couresDetail-container" v-title="'详情'">
	<div class="top">
		<div class="top-left">
			<div class="title">
				<div class="line"></div>
				<h1>{{ item.type }}·</h1>
				<h2>{{ item.status }}</h2>
			</div>		
			<p>申诉人：{{ studentInfo.name }}</p>
			<p style="margin-top:.2rem">申诉时间：{{ item.day }} {{ item.time }}</p>	
		</div>
		<div class="top-right">
			<img :src="studentInfo.headurl">
		</div>		
	</div>
	<div class="clear"></div>

	 <div class="content">
		<div class="title">
			<div class="line"></div>
			<h1>具体内容</h1>
		</div>
		 <div class="contentDetail"> 
			<p>{{ item.suggestionContent }}</p>
		</div>
	</div>
</div>
</template>

<script>
import staritem from '../../../components/staritem.vue'

export default {
  name: 'matchTeacherDetail',
  components: {
    staritem
  },
  data () {
    return {
      suggestions: [],
      studentInfo: {}
    }
  },
  created () {
    this.item = this.$route.params.item
    var createTime = this.item.createTime
    this.item.day = new Date(parseInt(createTime) * 1000).toLocaleDateString()
    this.item.time = new Date(parseInt(createTime) * 1000).toLocaleTimeString('chinese',{hour12:false})
    this.item.time = this.item.time.substr(0,this.item.time.length-3)
   	let self = this
    self.openid = sessionStorage.getItem('openid')
    this.$http.get('/tatuweb/studentLogin?openid=' + self.openid).then((response) => {
      this.studentInfo = response.body.data.studentInfo
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
	height: auto;
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
.top-left p{
	color: #666;
	font-size: .28rem;
	width: 90%;
	clear: both;
	margin-left: .52rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.top-left{
	float: left;
	width: 70%;
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

.content{
	margin-top: .5rem;
}
.contentDetail{
	clear: both;
	margin-right: .3rem;
	margin-left: .52rem;
	line-height: .35rem
}
.contentDetail p{
	color: #666;
	font-size: .28rem;
	width: 90%;
	clear: both;
}
</style>

