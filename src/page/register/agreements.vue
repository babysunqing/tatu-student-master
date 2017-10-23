<template>
<div class="container" v-title="'用户协议'">
	<router-link to="/agreement">
		<h1>一、“TaTu课堂”学生用户注册协议</h1>
	</router-link>
	<router-link to="/agreementOne">
		<h1>二、学员合作协议</h1>
	</router-link>
</div>
</template>

<script>
export default {
  name: 'agreement',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
	overflow: auto;
	height: 100%;
	font-family: "微软雅黑";
	-webkit-overflow-scrolling : touch; 
	padding-top: .3rem;
	background-color: #fff
}
h1{
	font-size: .28rem;
	margin:0 .3rem 0 .52rem;
	line-height: .7rem;
	color: #888;
	border-bottom: .01rem solid #eee;	
}
.line{
	width: 100%;
	background-color: #eee;
	height: .01rem
}
</style>