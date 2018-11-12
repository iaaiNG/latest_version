// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import ba from 'vue-ba' //百度统计插件
import wx from 'weixin-js-sdk';
import App from './App'
import router from './router'

import './assets/css/index.css'
import './assets/css/main.css'

Vue.use(VueResource)
Vue.use(ba,'bf1b710a3eb22657d01d834a43e4565f')  //百度统计插件
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods:{
        wxShare(){
          var url = location.href.split('#')[0];
          this.$http.get( "http://affqrcode.carrefourvip.com.cn/api/index/js?url="+ encodeURIComponent(url)).then(function(res){
                // console.log(res.body.obj);
                var appid = res.body.obj.appId
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.body.obj.appId, // 必填，公众号的唯一标识
                    timestamp:  res.body.obj.timestamp, // 必填，生成签名的时间戳
                    nonceStr:  res.body.obj.noncestr, // 必填，生成签名的随机串
                    signature:  res.body.obj.signature, // 必填，签名，见附录1
                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function () {
                    wx.showOptionMenu();
    
                    wx.onMenuShareAppMessage({
                        appid: appid,
                        title: "家乐福X风味人间", // 分享标题
                        desc: "来家乐福，品人间风味", // 分享描述
                        link: url, // 分享链接
                        imgUrl:"http://project.wan888888.com/edm-img/shaoma/share.jpg", // 分享图标
                        success: function () {},
                        cancel: function () { },
                        trigger: function () {}
                    });

                    wx.onMenuShareTimeline({
                        appid: appid,
                        title: "家乐福X风味人间", // 分享标题
                        desc: "来家乐福，品人间风味", // 分享描述
                        link: url, // 分享链接
                        imgUrl:"http://project.wan888888.com/edm-img/shaoma/share.jpg", // 分享图标
                        success: function () {},
                        cancel: function () { },
                        trigger: function () {}
                    });
                  
              })
      })
    }
  },
  mounted(){
    this.wxShare()
  }
})
