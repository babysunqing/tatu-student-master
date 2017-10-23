<template>
<div class="tabbar">
  <router-link class="tabbar-item"  to="/index">
    <div class="tabbar-item-icon">
    <img :src="indexImg" alt="">
    <p v-bind:class="{ active: isActive1, 'normal': normal }">首页</p>
    </div>   
  </router-link>

  <router-link class="tabbar-item"  to="/coures">
    <div class="tabbar-item-icon">
      <img :src="couresImg" alt="">
      <p v-bind:class="{ active: isActive2, 'normal': normal }">课程</p>
    </div>
  </router-link>

  <router-link class="tabbar-item" to="/message">
    <div class="tabbar-item-icon">
      <img :src="msgImg" alt="">
      <p v-bind:class="{ active: isActive3, 'normal': normal }">消息</p>
    </div>
  </router-link>

  <router-link class="tabbar-item" :to="url">
    <div class="tabbar-item-icon" @click="isLogin()">
      <img :src="myImg" alt="">
      <p v-bind:class="{ active: isActive4, 'normal': normal }">我的</p>
    </div>
  </router-link>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'tabbar',
  data () {
    return {
      url: '',
      isActive1: false,
      isActive2:false,
      isActive3:false,
      isActive4:false,
      normal: true,
      indexBgInfo:{
        normal:'./static/tab_icon_home_n.png',
        hover:'./static/tab_icon_home_s.png' 
      },
      courseBgInfo:{
        normal:'./static/tab_icon_coures_n.png',
        hover:'./static/tab_icon_coures_s.png' 
      },
      msgBgInfo:{
        normal:'./static/tab_icon_message_n.png',
        hover:'./static/tab_icon_message_s.png' 
      },
      myBgInfo:{
        normal:'./static/tab_icon_my_n.png',
        hover:'./static/tab_icon_my_s.png' 
      },
      indexImg: './static/tab_icon_home_n.png',
      couresImg: './static/tab_icon_coures_n.png',
      msgImg:'./static/tab_icon_message_n.png',
      myImg: './static/tab_icon_my_n.png' 
    }
  },
  methods: {
    isLogin: function () {
      let self = this
      this.openid = sessionStorage.getItem('openid')
      axios.get('/tatuweb/studentLogin?openid=' + self.openid)
        .then(function (res) {
          if (res.data.code === 1) {
            self.$router.push({path:'/register'})
          } else {
            self.$router.push({path:'/my'})
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    hoverBgInfo : function(type){
      if( type === 'index' ){
        this.indexImg = this.indexBgInfo.hover
        this.isActive1 = true
      }
      else if( type === 'coures' ){
        this.couresImg = this.courseBgInfo.hover
        this.isActive2 = true
      }
      else if(type === 'msg'){
        this.msgImg = this.msgBgInfo.hover
        this.isActive3 = true
      }
      else if(type === 'my' ){
        this.myImg = this.myBgInfo.hover
        this.isActive4 = true
      }
        this.normal = false
    }
  }
}
</script>

<style scoped>
.tabbar{
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height:.86rem;
  background: #fff;
  border-top: 1px solid #efefef;
 }   
.tabbar-item{
  flex: 1;
  text-align: center;
}
.tabbar-item-icon{
  margin-top: -.26rem
}     
.tabbar p{ 
  font-size: .18rem;
  margin-top:-.1rem;
}
.normal{ 
  color:#999;
}
.active{
  color:#000;
}
img{
  width: .5rem;

}
</style>