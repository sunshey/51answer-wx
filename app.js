//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function (options) {
    console.log("app,onShow",options)
    // wx.switchTab({
    //   url: 'pages/answer/index/index',
    //   success: function(res) {
    //     console.log("success",res)
    //   },
    //   fail: function (res) { console.log(res)},
    //   complete: function(res) {},
    // })
  },
  globalData: {
    userInfo: null,
    ticketUrl: "https://kyfw.12306.cn/otn/leftTicket/queryO",
    startPlaceholder: "请输入出发的城市",
    arrivePlaceholder: "请输入到达的城市",
    starttimeholder: "请选择出发时间",
    // baseUrl:"https://answer.bshu.com/v1/",
    // slide: baseUrl+"slide/index",
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
})