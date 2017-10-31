<template>
<div class="container" v-title="'我的老师'">
  <div id="bgImg" v-bind:class="{ display: isDisplay, 'normal': normal }">
    <img src="../../../assets/noTeachers.png">
    <p>暂无老师</p>
  </div>
  <div class="item"  v-for="(item,index) in classes"> 
    <router-link  :to="{name: 'teacherDetail', params: {item: item}}">
      <img :src="item.teacherInfo.headurl">
      <div style="float:left width：100%">
        <div class="top" style="text-align:left">
          <h1>{{ item.teacherInfo.name }}·</h1>
          <h2>{{ item.courseInfo.classType }}·{{ item.courseInfo.subject }} </h2>
          <p>查看详情 >></p>          
        </div>
        <div class="middle">
          <h3>{{ item.teacherInfo.collegeName }} · {{ item.teacherInfo.eduBackground }}</h3>
        </div>  
        <div class="bottom">
          <el-progress class="progress"
          :percentage="item.courseInfo.totalPeriod * 100 / item.courseInfo.payClass" 
          status="success" 
          :show-text="false"
          :stroke-width="4"
          ></el-progress>
          <p>{{ item.courseInfo.totalPeriod }}/{{ item.courseInfo.payClass }}次课</p>
        </div>  
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'myStudents',
  data () {
    return {
      isDisplay:false,
      normal: true,
      classes: []
    }
  },
  created () {
    let self = this
    this.studentId = sessionStorage.getItem('studentId')
    this.$http.get('/tatuweb/studentClassesInfo?studentId=' + self.studentId).then((response) => {
      this.classes = response.body.data
      if (this.classes.length > 0) {
        this.isDisplay = true
        this.normal = false // 判断是否隐藏背景图片
        for(var i = 0; i < this.classes.length; i++){
          if(this.classes[i].courseInfo.classType === '1'){
            this.classes[i].courseInfo.classType = '辅导课'
          }else{
            this.classes[i].courseInfo.classType = '教学课'
          }
        }
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
	padding-top: .3rem;
  overflow: auto;
  height: 100%;
}
.display{
  display: none;
}
.normal img{
  width: 2.54rem;
  height: 1.97rem;
  margin-top: 3rem;
  margin-left: 1.9rem
}
.normal p{
  font-size: .28rem;
  color: #999;
  margin-top: .3rem;
  text-align: center;
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
  margin-top: .18rem
}
.bottom p{
  color: #2cc178;
  font-size: .24rem;
  float: right;
  margin-right: .3rem;
  margin-top: .09rem
}
</style>

