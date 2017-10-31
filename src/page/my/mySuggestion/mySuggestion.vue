<template>
<div class="container" v-title="'建议/申诉'">
  <router-link  to="/newSuggestion">
    <div class="new">+新建建议/申诉</div>
  </router-link>
  <div class="item"  v-for="item in suggestions">
    <router-link :to="{name: 'suggestionDetail', params: {item: item}}">
      <img :src="studentInfo.headurl">
        <div class="top" style="text-align:left">
          <h1>{{ item.type }}·</h1>
          <h2>{{ item.status }}</h2>   
          <p>{{ item.suggestionContent }}</p>  
        </div> 
        <!-- <div class="time">{{ item.time }}</div>    -->      
    </router-link>      
  </div>  
</div>
</template>

<script>
export default {
  name: 'mySuggestion',
  data () {
    return {
      suggestions: [],
      studentInfo: {},
      time: ''
    }
  },
  created () {
    let self = this
    this.studentId = sessionStorage.getItem('studentId')
    this.$http.get('/tatuweb/studentSuggestions?studentId=' + self.studentId).then((response) => {
      // debugger
      this.suggestions = response.body.data.suggestions
      for (var i = 0; i < this.suggestions.length; i++) {
        if (this.suggestions[i].status === 'init') {
          // debugger
          this.suggestions[i].status = '未处理'
        } else if (this.suggestions[i].status === 'dealing') {
          this.suggestions[i].status = '待处理'
        } else {
          this.suggestions[i].status = '已处理'
        }
      }
    })
    self.openid = self.GetQueryString('openid')
    this.$http.get('/tatuweb/studentLogin?openid=' + self.openid).then((response) => {
      // debugger
      this.studentInfo = response.body.data.studentInfo
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
  font-family: "PingFang SC"
}
.new{
  height: .6rem;
  margin-left: .3rem;
  margin-right: .3rem;
  background-color: #fff;
  border-radius: .1rem;
  font-size: .28rem;
  color: #ccc;
  line-height: .6rem;
  text-align: center;
}
.item{
  background-color: #fff;
  height: 1.96rem;
  margin-top: .2rem;
  position: relative;
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
  font-weight:bold;
}
.top h2{
  color: #333;
  font-size: .28rem;
  
}
.top p{
  width: 65%;
  height: .8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #666;
  font-size: .26rem;
  margin-top: .2rem;
  line-height: .4rem
}
.time{
  position: absolute;
  right: .3rem;
  top: .3rem;
  font-size: .22rem;
  color: #999;
}
</style>


