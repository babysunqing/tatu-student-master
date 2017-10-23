<template>
<div class="container" v-title="'TaTu课堂'">
<div class="navbar">
	<div class="z"></div> 
	<div class="top1"></div>
	<input id="navbar1" type="radio" name="tabs" checked>
	<label for="navbar1" class="label1"><p>待上的课</p></label>
	<input id="navbar2" type="radio" name="tabs">
	<label for="navbar2" class="label2"><p>已上的课</p></label>
	<div id="bgImg" v-bind:class="{ display: isDisplay, 'normal': normal }">
		<img src="../../assets/nocourse.png">
		<p>暂无课程</p>
	</div>
	<section id="content1" ><!--- 待上的课 -->	
		<div class="item"  v-for="(item,index) in classesAndPeriod">
			<router-link :to="'/couresDetail?index=' + index">
				<img :src="item.teacherHeadUrl">
				<div style="float:left width：100%">
					<div class="top" style="text-align:left">
						<h1>{{ item.teacherName }}·</h1>
						<h2>{{ item.courseInfo.classType }}·</h2>
						<h2>{{ item.courseInfo.subject }}</h2>
						<p>查看详情 >></p>					
					</div>
					<div class="middle">
						<h3>{{ item.courseInfo.userId }} · {{ item.courseInfo.timeOfDay }}</h3>
					</div>	
					<div class="bottom">
						<el-progress class="progress"
						:percentage="item.courseInfo.totalPeriod * 100 / item.courseInfo.payClass" 
						status="success" 
						:show-text="false"
						:stroke-width="4"
						></el-progress>
						<p>{{item.courseInfo.totalPeriod}}/{{ item.courseInfo.payClass }}次课</p>
					</div>	
				</div>	
			</router-link>	
		</div>	
		<div class="item" v-for="(item,index) in tryClasses"><!--- 已经上的试课 -->	
			<router-link :to="'/tryClassDetailDone?index=' + index">
				<img :src="item.headurl">
				<div style="float:left width：100%">
					<div class="top" style="text-align:left">
						<h1>{{ item.teacherName}}·</h1>
						<h2>{{ item.courseInfo.classType }}·</h2>
						<h2>{{ item.courseInfo.subject }}</h2>
						<p>查看详情 >></p>					
					</div>
					<div class="middle">
						<h3>{{ item.courseInfo.userId }} · {{ item.courseInfo.timeOfDay }}</h3>
					</div>	
					<div class="bottom">
						<el-progress class="progress"
						:percentage="0" 
						status="success" 
						:show-text="false"
						:stroke-width="4"
						></el-progress>
						<p>试课</p>
					</div>	
				</div>	
			</router-link>		
		</div>
	</section>
	<section id="content2"><!--- 已经上的课程 -->	
		<div class="item"  v-for="(item,index) in classesAndPeriod">
			<router-link :to="'/couresDetail?index=' + index">
				<img :src="item.teacherHeadUrl">
				<div style="float:left width：100%">
					<div class="top" style="text-align:left">
						<h1>{{ item.teacherName }}·</h1>
						<h2>{{ item.courseInfo.classType }}·</h2>
						<h2>{{ item.courseInfo.subject }}</h2>
						<p>查看详情 >></p>					
					</div>
					<div class="middle">
						<h3>{{ item.courseInfo.userId }} · {{ item.courseInfo.timeOfDay }}</h3>
					</div>	
					<div class="bottom">
						<el-progress class="progress"
						:percentage="item.courseInfo.totalPeriod * 100 / item.courseInfo.payClass" 
						status="success" 
						:show-text="false"
						:stroke-width="4"
						></el-progress>
						<p>{{item.courseInfo.totalPeriod}}/{{ item.courseInfo.payClass }}次课</p>
					</div>	
				</div>	
			</router-link>	
		</div>
		<router-view></router-view>	
	</section>
</div>
<tabbar ref="tabbar"></tabbar>

</div>
</template>

<script>
import axios from 'axios'
import tabbar from '../../components/tabbar.vue'
export default {
  name: 'coures',
  components: {
    tabbar
  },
  data () {
    return {
      isDisplay:false,
      normal: true,
      classesAndPeriod: [],
      tryClasses: [],
    }
  },
  created () {
    let self = this
    this.studentId = sessionStorage.getItem('studentId')
    this.$http.get('/tatuweb/getClassesByStudentId?studentId=' + self.studentId).then((response) => {
      // debugger
      this.classesAndPeriod = response.body.data.classesAndPeriod
      this.tryClasses = response.body.data.tryClasses
      axios.get('/tatuweb/getBackgroundInfo').then(function (res) {
      	self.position = res.data.data
      	for(var i=0;i < self.position.length;i++){ // 把返回的数组里的userID转换成相应的地址
      		    for(var j=0;j < self.classesAndPeriod.length;j++){
      			    if(self.classesAndPeriod[j].courseInfo.userId === self.position[i].userId){
      				  self.classesAndPeriod[j].courseInfo.userId = self.position[i].name
      			    }
      		    }
      	}
      	for(var i=0;i < self.position.length;i++){	      		
      		for(var j=0;j < self.tryClasses.length;j++){
      			if(self.tryClasses[j].courseInfo.userId === self.position[i].userId){
      				self.tryClasses[j].courseInfo.userId = self.position[i].name
      			}
      		}
      	}       	
      })
      if (this.tryClasses != "" || this.classesAndPeriod != "") {
        	this.isDisplay = true
        	this.normal=false // 判断是否隐藏背景图片
      }
      if(this.classesAndPeriod.length > 0){
      	for(var i=0;i < this.classesAndPeriod.length;i++){
          if(this.classesAndPeriod[i].courseInfo.classType = 1){
      	    this.classesAndPeriod[i].courseInfo.classType = '辅导课'
          }else if(this.classesAndPeriod[i].courseInfo.classType = 2){
      	    this.classesAndPeriod[i].courseInfo.classType = '教学课'
          } // 
        }
      }
      if(this.tryClasses.length > 0){
      	for(var i=0;i < this.tryClasses.length;i++){
          if(this.tryClasses[i].courseInfo.classType = 1){
      	    this.tryClasses[i].courseInfo.classType = '辅导课'
          }else if(this.tryClasses[i].courseInfo.classType = 2){
      	    this.tryClasses[i].courseInfo.classType = '教学课'
          }
        }
      }
    })
  },
  mounted (){
  	let self = this
  	self.$refs.tabbar.hoverBgInfo('coures')
  }
}
</script> 

<style scoped>
.container{
	overflow: auto;
	height: 91%;
}
.display{
	display: none;
}
.normal img{
	width: 2.98rem;
	height: 2rem;
	margin-top: 3rem
}
.normal p{
	font-size: .28rem;
	color: #999;
	margin-top: .3rem
}
.z{
	width: 3.42rem;
	height: .6rem;
	background-color: #efefef;
	border-radius: 8px;
	z-index: 1;
	margin: 0 auto;
	top: .3rem;
	left: 1.47rem;
	position: fixed;
}
.top1{
	width: 100%;
	height: 1.2rem;
	position: fixed;
	top: -.2rem;
	background-color: #f7f7f7;

}
.navbar{
	text-align: center;
}
.navbar p{
	font-size:0.28rem; 
}
input{
	clear: both;
	display: none;
	width: 100%;
	height: 1.2rem;
}
label {
	width: 1.67rem;
	height:.56rem;
	line-height: .56rem;
	float: left;
	background-color: #efefef;
	z-index:2; 
	top: .32rem;
	left:2.97rem;
}
.label1{
	margin-left: -1.44rem;
	position: fixed;
}
.label2{
	margin-left: .2rem;
	position: fixed;
}
section{
	clear:both;
    display: none;
    margin-top: 1.1rem;
    z-index: -3
}
label:hover {
	cursor: pointer;
}
#navbar1:checked ~ #content1, #navbar2:checked ~ #content2 {
	display: block; 
}
input:checked + label {
	background-color: #fff;
	color: #333;
	border-radius: 10px;
}

.item{
	background-color: #fff;
	height: 1.96rem;
	margin-top: .2rem
}
.item img{
	margin: .24rem .26rem .24rem .30rem;
	width: 1.48rem; 
	height:1.48rem;
	float: left;
	border-radius: 1.48rem;
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
.bottom{
 margin-top: .2rem;
}
.progress{
	width: 2.7rem;
	float: left;
	margin-top: .2rem
}
.bottom p{
	color: #2cc178;
	font-size: .24rem;
	float: right;
	margin-right: .3rem;
	margin-top: .09rem
}
</style>
