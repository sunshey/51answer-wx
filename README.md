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

* 数据偏

技术说明
---
注意事项
---
总结
---
