<template>
<div class="container" v-title="'建议/申诉'">
  <div class="plan" style="background-color:#fff">
    <form method="post">
      <div class="title">
        <div class="line"></div>      
        <input name="type" type="radio" class="regular-radio" value="suggestion" id="suggestion" v-model="type" />
        <label for="suggestion"></label> 建议
       <input name="type" type="radio" class="regular-radio" value="complaint" id="complaint" v-model="type" />
        <label for="complaint"></label> 申诉
      </div>
      <div class="plandetail"> 
        <textarea placeholder="请留下对平台的建议或申诉" name="suggestionContent" v-model="suggestionContent"></textarea>
      </div>
    </form>
  </div>
  <div class="finish" @click="finish()">完成</div>
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
      stuJson.suggestionContent = this.suggestionContent
      // debugger
      stuJson.type = this.type
      stuJson.userId = this.userId
      stuJson.studentId = this.studentId
      stuJson.createTime = (new Date().getTime() / 1000).toFixed(0)
      params.append('studentSuggestion', JSON.stringify(stuJson))
      if(stuJson.type === undefined ){ 
        alert('请选择建议申诉类型')
      }
      if( stuJson.suggestionContent === '' ){
        alert('请先填写申诉或建议')
      }
      axios({
        method: 'post',
        url: '/tatuweb/studentCommitSuggestion',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: params
      }).then(function (response) {
        window.history.go(-1)
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
  margin-top: .3rem;
  line-height: .35rem;
  min-height: 4.1rem;
}
.finish{
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
button{
  font-size: .3rem;
  color: #2cc17b;
  background-color: #fff;
  border: 0px;
}
form{
  font-size: .3rem
}
.regular-radio {
  display: none;
}
.regular-radio + label {
  -webkit-appearance: none;
  border: 1px solid #eee;
  padding: .14rem;
  border-radius: .14rem;
  display: inline-block;
  position: relative;
  top: .05rem;
}
.regular-radio:checked + label:after {
  content: ' ';
  width: .2rem;
  height: .2rem; 
  border-radius: .2rem;
  position: absolute;
  top: -.01rem;
  left: -.05em;
  background: #2cc17b;
  border: 3px #eee solid;
  -webkit-transition:background ease-in .1s;
}
</style>


