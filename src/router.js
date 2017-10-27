import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './page/index.vue'
import coures from './page/coures/coures.vue'
import couresDetail from './page/coures/couresDetail.vue'
import couresDetailDone from './page/coures/couresDetailDone.vue'
import tryClassDetail from './page/coures/tryClassDetail.vue'

import message from './page/message/message.vue'
import msgMatching from './page/message/matching/msgMatching.vue'
import msgPlan from './page/message/plan/msgPlan.vue'
import planDetail from './page/message/plan/planDetail.vue'
import msgPay from './page/message/pay/msgPay.vue'
import couresPay from './page/message/pay/couresPay.vue'
import payCouresDetail from './page/message/pay/payCouresDetail.vue'
import paySuccess from './page/message/pay/paySuccess.vue'

import matchTeacherDetail from './page/message/matching/matchTeacherDetail.vue'
import suggestion from './page/message/suggestion/suggestion.vue'
import msgSuggestionDetail from './page/message/suggestion/msgSuggestionDetail.vue'

import my from './page/my/my.vue'
import myInfo from './page/my/myInfo.vue'
import myTeacher from './page/my/myTeacher/myTeacher.vue'
import teacherDetail from './page/my/myTeacher/teacherDetail.vue'

import myEvaluation from './page/my/myEvaluation/myEvaluation.vue'
import evaluationDetail from './page/my/myEvaluation/evaluationDetail.vue'
import noEvaluationDetail from './page/my/myEvaluation/noEvaluationDetail.vue'

import myScore from './page/my/myScore/myScore.vue'
import mySuggestion from './page/my/mySuggestion/mySuggestion.vue'
import suggestionDetail from './page/my/mySuggestion/suggestionDetail.vue'
import newSuggestion from './page/my/mySuggestion/newSuggestion.vue'

import register from './page/register/register.vue'
import agreements from './page/register/agreements.vue'
import agreement from './page/register/agreement.vue'
import agreementOne from './page/register/agreementOne.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/register',         // 注册页
    component: register
  },
  {
    path: '/agreements',      // 用户协议列表
    component: agreements
  },
  {
    path: '/agreement',      // 用户协议1
    component: agreement
  },
  {
    path: '/agreementOne',      // 用户协议2
    component: agreementOne
  },
  {
    path: '/',                 // 默认打开首页
    component: index
  },
  {
    path: '/index',             // 首页
    component: index
  },
  {
    path: '/coures',             // 课程页
    component: coures
  },
  {
    name:'couresDetail',
    path: '/couresDetail/:item',             // 待上课程详情
    component: couresDetail
  },
  {
    name:'couresDetailDone',
    path: '/couresDetailDone/:item/:checkin',             // 以上课程详情
    component: couresDetailDone
  },
  {
    name:'tryClassDetail',
    path: '/tryClassDetail/:item',             // 已上试课程详情
    component: tryClassDetail
  },
  {
    path: '/message',             // 消息页
    component: message
  },
  {
    path: '/my',                 // 个人中心页面
    component: my
  },
  {
    name:'myInfo',
    path: '/myInfo/:info',                 // 个人信息页面
    component: myInfo
  },
  {
    path: '/msgMatching',       // 匹配消息
    component: msgMatching
  },
  {
    name: 'matchTeacherDetail',
    path: '/matchTeacherDetail/:item',       // 匹配消息  匹配的教师详情
    component: matchTeacherDetail
  },
  {
    path: '/msgPlan',       // 教学计划
    component: msgPlan
  },
  {
    name: 'planDetail',
    path: '/planDetail/:item',       // 教学计划 计划详情
    component: planDetail
  },
  {
    path: '/msgPay',       // 付费消息
    component: msgPay
  },
  {
    name: 'payCouresDetail',
    path: '/payCouresDetail/:item',       // 付费消息 课程详情
    component: payCouresDetail
  },
  {
    name: 'couresPay',
    path: '/couresPay/:item',       // 付费消息 课程续费
    component: couresPay
  },
  {
    path: '/paySuccess',       // 付费消息 课程续费 付费成功
    component: paySuccess
  },
  {
    path: '/suggestion',       // 投诉反馈
    component: suggestion
  },
  {
    name: 'msgSuggestionDetail',
    path: '/msgSuggestionDetail/:item',       // 投诉反馈 投诉的课程详情
    component: msgSuggestionDetail
  },
  {
    path: '/myTeacher',       // 我的老师
    component: myTeacher
  },
  {
    name: 'teacherDetail',
    path: '/teacherDetail/:item',       // 我的老师 教师详情
    component: teacherDetail
  },
  {
    path: '/myEvaluation',       // 我的评价
    component: myEvaluation 
  },
  {
    name:'evaluationDetail',
    path: '/evaluationDetail/:item',       // 我的评价
    component: evaluationDetail
  },
  {
    name:'noEvaluationDetail',
    path: '/noEvaluationDetail/:item',       // 我的评价
    component: noEvaluationDetail
  },
  {
    path: '/myScore',       // 我的评分
    component: myScore
  },
  {
    path: '/mySuggestion',       // 我的建议
    component: mySuggestion
  },
  {
    name:'suggestionDetail',
    path: '/suggestionDetail/:item',       // 建议详情
    component: suggestionDetail
  },
  {
    path: '/newSuggestion',       // 新建建议/申诉
    component: newSuggestion
  }
]

var router = new VueRouter({
  routes
})
export default router
