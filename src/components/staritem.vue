<template>
  <div class="score"> 
    <div class="score-item" style=" padding-top: 0rem;">
       <p>互动积极性:</p>
       <ul id="one">
          <li id="star1" @click="fnShow(1,'one')"><a href="javascript:;">1</a></li>
          <li id="star2" @click="fnShow(2,'one')"><a href="javascript:;">2</a></li>
          <li id="star3" @click="fnShow(3,'one')"><a href="javascript:;">3</a></li>
          <li id="star4" @click="fnShow(4,'one')"><a href="javascript:;">4</a></li>
          <li id="star5" @click="fnShow(5,'one')"><a href="javascript:;">5</a></li>
          <div class="pingfen" id="score"><p>{{ evaAveOneS }}</p></div>
      </ul>
    </div>
    <div class="score-item">
      <p>课堂领悟力:</p>
      <ul id="two">
        <li id="star1" @click="fnShow(1,'two')"><a href="javascript:;">1</a></li>
        <li id="star2" @click="fnShow(2,'two')"><a href="javascript:;">2</a></li>
        <li id="star3" @click="fnShow(3,'two')"><a href="javascript:;">3</a></li>
        <li id="star4" @click="fnShow(4,'two')"><a href="javascript:;">4</a></li>
        <li id="star5" @click="fnShow(5,'two')"><a href="javascript:;">5</a></li>
        <div class="pingfen" id="score"><p>{{ evaAveTwoS }}</p></div>
      </ul>
    </div>
    <div class="score-item">
      <p>专心程度:</p>
      <ul id="three">
        <li id="star1" @click="fnShow(1,'three')"><a href="javascript:;">1</a></li>
        <li id="star2" @click="fnShow(2,'three')"><a href="javascript:;">2</a></li>
        <li id="star3" @click="fnShow(3,'three')"><a href="javascript:;">3</a></li>
        <li id="star4" @click="fnShow(4,'three')"><a href="javascript:;">4</a></li>
        <li id="star5" @click="fnShow(5,'three')"><a href="javascript:;">5</a></li>
        <div class="pingfen" id="score"><p>{{ evaAveThreeS }}</p></div>
      </ul>
    </div>
    <div class="score-item">
      <p>课堂表现:</p>
      <ul id="four">
        <li id="star1" @click="fnShow(1,'four')"><a href="javascript:;">1</a></li>
        <li id="star2" @click="fnShow(2,'four')"><a href="javascript:;">2</a></li>
        <li id="star3" @click="fnShow(3,'four')"><a href="javascript:;">3</a></li>
        <li id="star4" @click="fnShow(4,'four')"><a href="javascript:;">4</a></li>
        <li id="star5" @click="fnShow(5,'four')"><a href="javascript:;">5</a></li>
        <div class="pingfen" id="score"><p>{{ evaAveFourS }}</p></div>
      </ul>
    </div>    
  </div>
</template>
<script>
export default {
  name: 'staritem',
  methods: {
    fnShow: function (num, type) {
      var lis = document.getElementById(type).getElementsByTagName('li')
      var p = document.getElementById(type).getElementsByTagName('p')[0]
      for (var i = 0; i < lis.length; i++) {
        lis[i].className = ''
      }
      for (i = 0; i < num; i++) {
        lis[i].className = 'light'    // 点亮星星就是加class为light的样式
      }
      p.innerHTML = num + '.0'
    }
  }
}
</script>

<style scoped>
ul {
  padding-left: 0;
  overflow: hidden;
 }
 ul li {
  float: left;
  list-style: none;
  width: .3rem;
  height:.3rem;
  margin-right: .1rem;
  background-image: url(../assets/star.gif);
  background-size: cover;
 }
 ul li a {
  display: block;
  width: 100%;
  padding-top: 27px;
  overflow: hidden;
 }
 ul li.light {
  background-position: 0 -.3rem;
 }
 .score .pingfen{
  font-size: .28rem;
  color: #666;
  position: absolute;
  right: -4em;
}
.score p{
  color: #666;
  font-size: .28rem;
  float: left;
  margin-right: .2rem;
  width: 1.54rem
}
.score h2{
  color: #666;
  font-size: .28rem;
  float: left;
  margin-right: .2rem;
  width: 1.54rem
}
.score-item{
  clear: both;
  margin-left: .52rem;
  padding-top: .3rem;
}
</style>