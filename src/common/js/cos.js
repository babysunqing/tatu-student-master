import CosCloud from 'cos-js-sdk-v4'
import axios from 'axios'
// 初始化逻辑
/* global appid bucket axios:true */
/* eslint no-undef: "error" */
var cos = new CosCloud({
  appid: 1254104185,                    // APPID 必填参数
  bucket: 'tatubuket',                  // bucketName 必填参数
  region: 'gz',                         // 地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
  getAppSign: function (callback) {     // 获取签名 必填参数
    axios.get('/tatuweb/sign/sign').then(function (response) {
      console.log('sign is:' + response.data)
      callback(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  },
  getAppSignOnce: function (callback) {
    axios.get('/tatuweb/sign/sign').then(function (response) {
      console.log('sign is:' + response.data)
      callback(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  }
})
export default cos
