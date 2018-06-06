51答案小程序
---

* [项目介绍](#项目介绍)
* [开发流程](#开发流程)
* [技术说明](#技术说明)
* [注意事项](#注意事项)
* [总结](#总结)

项目介绍
---
一款在线搜索书籍、查找答案，辅助学生提高学习成绩的小程序 
1. 数据源来自于线下采集，购买书籍拍照上传，用户自发上传
2. 界面使用小程序原生组件设计，暂无扩展组件，界面样式使用了部分伪类选择器，比如.xx::after{...}
###### 说明：这款小程序是我用来入门的项目，暂无上线小程序商店

开发流程
---
这里开发流程主要是小程序的使用指南，我把它分为五部分：
* 开发工具篇<br/>
俗话说"工欲善其事，必先利其器"，小程序的开发同样离不开好的开发工具，因此微信团队已为我们准备了一款好用的开发工具：[微信web开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html),功能比较强大，能满足大部分的开发需求，使用简单，对于新手来说用几次应该就比较熟悉了
* 账号篇<br/>
使用任何第三方开发平台进行开发前，都必须在其官网申请账号才能开发，小程序也不例外。小程序申请账号的平台是[微信公众平台](https://mp.weixin.qq.com/),注册流程如下：<br/>
1. 在微信公众平台首页点击立即注册，跳转到选择注册类型页，选择小程序
2. 进入小程序注册页，按照提示依次输入必填信息，需要注意的是每个邮箱只能注册一个小程序，所以在填入之前要确保输入的邮箱是未注册过的，然后点击注册,平台会发一封激活公众平台的邮件，进入邮箱，点击激活。
3. 在小程序激活页，同样按照提示输入姓名、身份证等信息，输入完毕，需要用绑定银行卡的微信扫描二维码，在手机上确认后，点击继续，确认信息无误后，点击确定，小程序账号就注册成功了
* 开发篇  
这里进入令人激动的开发篇了，你激不激动，反正我是激动了,哈哈:heart_eyes::heart_eyes:！开玩笑的了，咱们继续：  
账号注册成功后，就进入了小程序的后台，在这里可以填写小程序信息，配置服务器域名，设置开发者等操作，接下来整理一下具体流程：  
1. 完善补充小程序的基本信息，如名称、图标、描述、服务类目等，填写完这些信息，点击提交，由小程序官方进行审核，通过后就可以使用  
2. 添加开发者，小程序允许多人协作开发，但首先要通过管理员在后台添加开发者，并给这些开发者分配相应的开发权限，具体权限参考[官方文档](http://kf.qq.com/faq/170302zeQryI170302beuEVn.html)
3. 查看AppID和AppSecret，并配置服务器域名。AppID在小程序中非常重要，它相当于小程序的身份证，在使用开发工具创建项目时填写了AppID才能享有在线预览、远程调试、上传代码、编译发布的功能，因此在进行正式的开发前，需要在管理者后台开发设置中查看APPID并将其填入开发者工具。另外在开发前还有一处需要完善，那就是服务器域名配置，小程序接口采用https加密协议，在网络请求时小程序会校验请求的域名是否已配置在管理后台，因此我们在开发小程序时需要先配好请求域名。路径是：管理后台-设置-开发设置-服务器配置  
4. 以上几步完成以后，就可以在开发工具中进行代码编写和调试，具体使用参考[小程序组件](https://developers.weixin.qq.com/miniprogram/dev/component/)和[小程序api](https://developers.weixin.qq.com/miniprogram/dev/api/)

* 发布篇  
小程序经过开发并测试完成后，就可以在开发工具中将代码打包上传，然后在管理后台提交审核，审核通过就可以在小程序商店搜到我们的小程序

* 数据篇  
小程序发布上线后，即可在后台查看小程序各项数据，包括概况、实时统计、访问分析、来源分析等等，然后根据这些数据对小程序做出相应的调整

技术说明
---
小程序使用wxml、wxss、json、js这四种类型的文件来编写，wxml相当于html，wxss相当于css,json是配置文件，js负责函数调用和逻辑处理，语法和使用参考文档。

注意事项
---
1. 使用下拉刷新动画，需在app.json文件中配置"backgroundColor":"#F5F5F5"，因为小程序背景为白色，动画样式也为白色，因此动画样式无法看见<br/> 
2. 在app.wxss中配置默认全局css样式，可以在page的wxss中选择覆盖，或者将/* padding: 200rpx 0; */属性注释，否则会出现意想不到的结果<br/> 
3. 在tabBar里配置的页面必须在pages里注册且只能通过 wx.switchTab()进行切换<br/> 
4. navigateTo是跳到某个非tab页，比如详情页；在app.json中注册后，不能在tabBar里注册，不然同样也是不能跳转的哦。<br/> 
5. json中不能写注释，不然会报错的。<br/> 
6. 页面之间传递参数，参数写在跳转的url之中，然后另一个页面在onload方法中的传参option接收到。如下传递和获取id<br/> 
 ```
 onLoad: function (options) {
    		// var info = JSON.parse(options.item)
   		 // this.data.book_id = info.id
    	this.data.book_id = options.book_id}
 ```
7. data-开头的自定义属性的使用<br/> 
比如wxml中我们写 data-item='{{item}}' 点击的事件对象可以这么取，
```
toanswerdetail: function (e) {
    var item = e.currentTarget.dataset.item
    // console.log(item)
    wx.navigateTo({
      url: '../answer-detail/answer-detail?book_id=' + item.id// JSON.stringify(item),
    })
}
```
注意： 大写会转换成小写，带_符号会转成驼峰形式<br/> 
8. 事件对象event，event.target和event.currentTarget的区别：<br/> 
target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件。<br/> 
比如，轮播图组件，点击事件应该要绑定到swiper上，这样才能监控任意一张图片是否被点击，<br/> 
这时target这里指的是image（因为点击的是图片），而currentTarget指的是swiper（因为绑定点击事件在swiper上）<br/> 
9. 网络请求的域名需在小程序后台配置，且以https开头

10. app.js为全局的js文件，globalData字段定义了全局的常量，可以将网络请求的URL地址定义在这里，建议这样做，<br/> 
```
 globalData: {
    userInfo: null,
    ticketUrl: "https://kyfw.12306.cn/otn/leftTicket/queryO",
    startPlaceholder: "请输入出发的城市",
    arrivePlaceholder: "请输入到达的城市",
    starttimeholder: "请选择出发时间",
    slideUrl: "https://answer.bshu.com/v1/slide/index",
    hotbookUrl: "https://answer.bshu.com/v1/book/index",
    hotrecommendUrl: "https://answer.bshu.com/v1/book/tag",
    searchtintUrl: "https://answer.bshu.com/v1/book/tip",
    answerdetailUrl: "https://answer.bshu.com/v1/book/answer",
    favoriteUrl: "https://answer.bshu.com/v1/book/favorite",
    wxappUrl: "https://answer.bshu.com/v1/user/wxapp",
    bookversionUrl: "https://answer.bshu.com/v1/book/version",
    bookmyfavoriteUrl: "https://answer.bshu.com/v1/book/myfavorite"
}
```
各个页面的js文件中通过var app= getApp()获取这个全局js文件，从而获取这里定义的常量<br/> 
```
var app = getApp()
var globalData = app.globalData
wx.request({
     url: globalData.hotrecommendUrl,
.....
}
```
11. 使用通用方法——可以单独定义一个utils目录，在里面定义utils.js,将经常使用的方法定义在这里，如图：
```
function getUserinfos(callback) {//获取用户信息
  var that = this
  wx.getUserInfo({
    withCredentials: true,
    lang: '',
    success: function (res) {
      console.log(res)
      that.loginserver(wx.getStorageSync("token"), res.userInfo.nickName, res.userInfo.avatarUrl, callback)
    },
    fail: function (res) {
      wx.showModal({
        title: '提示',
        content: '授权拒绝将无法使用收藏功能，请谨慎选择',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '确认',
        confirmColor: '',
        success: function (res) {
          wx.openSetting({
            success: function (res) {
              if (res.authSetting["scope.userInfo"]) {
                that.getUserinfos()
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })


    },
    complete: function (res) {
      console.debug(res)
    },
  })

}
```
通过
```
module.exports = {
  getCityCode: getCityCode,
  getCityName: getCityName,
  stringToJson: stringToJson,
  saveList: saveList,
  getHeaders: getHeaders,
  loginserver: loginserver,
  getUserinfos: getUserinfos,
}
```
将方法注册，在需要使用该方法的js文件中通过 var utils = require('../../../utils/util.js') ，来使用utils.js中注册的方法<br/> 
12. 使用通用模板——单独定义template目录，在目录中添加通用模板文件，如图：<br/> 
```
<template name="common">
  <view class='common_test'>
    这是一个通用模板
  </view>
</template>
```
 在需要使用该模板的wxml文件中通过import关键字导入该模板，
 ```
 <import src="../../template/common.wxml" />
 ```
 并在合适的位置加入该模板  
 ```
<template is="common" data='{{...item}}'/>
```
is后填写模板文件中name所对应的值,item为模板中填入的值<br/>
13. 如果模板文件中import其他模板，如果想使用模板的引入的模板文件，可以通过include关键字<br/>
14. 使用通用样式——直接在需要样式的wxss文件中通过@import "../../../template/search.wxss";导入即可<br/>
15. 各个页面js文件Page实例中，可以通过this.route获取当前打开的路径  
16. css伪类元素用法，使用如下：  
```
.dish-item-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 15rpx;
  padding-top: 15rpx;
  position: relative;
}

.dish-item-container:after {
  content: " ";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  border-bottom: 1rpx solid #f5f5f5;
  color: #f5f5f5;
}
```
特别注意：after样式使用了`position：absolute`，使用伪类的元素样式中也必须使用`position`属性，否则添加伪元素样式不起作用。  
17. css样式使用flex盒子布局，有几个重要的属性：    
* flex-direction ; 布局方向 row-横向（默认），column-纵向  
* flex-wrap; 定义盒子元素如果一条轴线排不下，如何换行，wrap-换行 ， nowrap-不换行（默认）
* justify-content；定义盒子元素在主轴上对齐方式。   
  * flex-start（默认值）：左对齐  
  * flex-end：右对齐  
  * center： 居中  
  * space-between：两端对齐，项目之间的间隔都相等。  
  * space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。  
* align-items; 定义项目在交叉轴上如何对齐   
  * flex-start：交叉轴的起点对齐。  
  * flex-end：交叉轴的终点对齐。  
  * center：交叉轴的中点对齐。  
  * baseline: 项目的第一行文字的基线对齐。  
  * stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。  
* flex-grow; 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。这个属性主要设置控件占用的空间大小  
18. 小程序共同的属性有：
```
id	          String	     组件的唯一标识	       整个页面唯一
class	         String	     组件的样式类	         在对应的 WXSS 中定义的样式类
style	         String	     组件的内联样式	       可以动态设置的内联样式
hidden	         Boolean	    组件是否显示	         所有组件默认显示
data-*	         Any	        自定义属性	           组件上触发的事件时，会发送给事件处理函数
bind*/catch*	 EventHandler	组件的事件
```

总结
---
随着微信开放小程序，以及在这段时间推出的小游戏，让越来越多的开发者加入了小程序的阵营，同时许多公司、企业也把小程序作为一个重要的营销入口，可以说当前最风光无限的语言就是小程序，因此学习和开发小程序已成为迫在眉睫的事。  废话不多说，加油:muscle::muscle::muscle:!
