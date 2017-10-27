<template>
<div class="container" v-title="'建议/申诉'">
  <div class="plan" style="background-color:#fff">
    <form method="post">
      <div class="title">
        <div class="line"></div>      
        <label><input name="type" type="radio"  value="" v-model="suggestion" />建议 </label>
        <label><input name="type" type="radio"  value=""  v-model="complaint" />申诉 </label>
      </div>
      <div class="plandetail"> 
        <textarea placeholder="请留下对平台的建议或申诉" name="suggestionContent" v-model="suggestionContent"></textarea>
      </div>
      
    </form>
     <div class="finish"><button  @click="finish()">完成</button></div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'newSuggestion',
  data () {
    return {
      suggestionContent: '',
      userId: '',
      studentId: ''
    }
  },
  methods: {
    finish: function () {
      this.studentId = sessionStorage.getItem('studentId')
      this.userId = sessionStorage.getItem('userId')
      var params = new URLSearchParams()
      var stuJson = {}
      // debugger
      stuJson.suggestionContent = this.suggestionContent
      stuJson.type = this.type
      stuJson.userId = this.userId
      stuJson.studentId = this.studentId
      stuJson.createTime = new Date().getTime()
      params.append('studentSuggestion', JSON.stringify(stuJson))
      axios({
        method: 'post',
        url: '/tatuweb/studentCommitSuggestion',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: params
      }).then(function (response) {
        window.location.href = '/tatuweb/paySuccess'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  width: 100%;  
  background-color: #fff;
  padding-bottom: .3rem;
  padding-top: .3rem;
  min-height: 5rem;
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
h1{
  font-size: .3rem;
  color: #333;
  float: left;
  margin-bottom: .3rem;
  font-weight: bold;
}
.plandetail{
  clear: both;
  padding-bottom: .3rem;
}
.plandetail textarea{
  width: 84%;
  border: 0px;
  margin-right: .3rem;
  margin-left: .52rem;
  line-height: .35rem;
  min-height: 4.1rem;
}
.finish{
  float: right;
  margin-right: .3rem;
  margin-top:-.8rem;
}
button{
  font-size: .3rem;
  color: #2cc17b;
  background-color: #fff;
  border: 0px;
}
form{
  font-size: .3rem
}
</style>


