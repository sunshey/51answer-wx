
var app = getApp()
var globalData = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFirst: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
    var that = this
    if (options.book_id) {
      wx.navigateTo({
        url: '../answer-detail/answer-detail?book_id=' + options.book_id,
      })
    }

    this.getUserInfoData()
    // console.log(this.route) route 可以获取当前页面路径


    wx.request({
      url: globalData.slideUrl,
      data: {
        group: "home"
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res.data)
        var images = []
        res.data.data.map(item => {
          // console.log(item.img)
          images.push(item.img)
        })
        that.setData({
          images: images
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
      , wx.request({
        url: globalData.hotbookUrl,
        data: {
          page: "1",
          limit: "2",
          flag_id: "2"
        },
        header: {},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          var hotbooks = []
          res.data.data.lists.map(item => {
            hotbooks.push(item)
          })
          that.setData({
            hotbooks: hotbooks
          })

        },
        fail: function (res) { }

      }), wx.request({
        url: globalData.hotrecommendUrl,
        data: {},
        header: {},
        method: "POST",
        dataType: "json",
        responseType: "text",

        success: function (res) {
          var hotrecommends = []
          var item_bg = ""
          console.log(res.data.data)
          var successData = res.data.data
          for (var i = 0; i < successData.length; i++) {
            let item = {}
            if (i % 5 == 0) {
              item_bg = "#FFE5E5"
            } else if (i % 5 == 1) {
              item_bg = "#FFF9E5";
            }
            else if (i % 5 == 2) {
              item_bg = "#E5F6FF";
            }
            else if (i % 5 == 3) {
              item_bg = "#E0F7E1";
            }
            else if (i % 5 == 4) {
              item_bg = "#DFF7F5";
            }
            item["item_bg"] = item_bg
            item["text"] = successData[i]
            hotrecommends.push(item)
          }
          // var new_item={
          //   "item_bg":"#f00",
          //   "text":"语文"
          // }
          // hotrecommends.push(new_item)
          that.setData({
            hotrecommends: hotrecommends,

          })


        },
        fail: function (res) { }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var is_First = wx.getStorageSync("isFirst")
    if (is_First) {
      this.data.isFirst = "none"
    } else {
      this.data.isFirst = "flex"
      wx.setStorageSync("isFirst", "true")
    }
    this.setData({
      flag: this.data.name,
      isFirst: this.data.isFirst
    })


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 跳转到搜索页
   */
  searchClick: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  toanswerdetail: function (e) {
    var item = e.currentTarget.dataset.item
    // console.log(item)
    wx.navigateTo({
      url: '../answer-detail/answer-detail?book_id=' + item.id// JSON.stringify(item),
    })

  },
  search: function (e) {
    wx.navigateTo({
      url: '../search-detail/search-detail?flag=' + e.currentTarget.dataset.item,
    })
  },


  getUserInfoData: function () {
    var that = this
    // wx.getSetting({
    //   success: function (res) {

    //   },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })

    wx.checkSession({
      success: function (res) {
        //用户登录信息有效
        // console.log(wx.getStorageSync("token"))
        if (!wx.getStorageSync("token")) {
          that.login()
        }
      },
      fail: function (res) {
        that.login()
      }
    })
  },

  login: function () {
    var that = this
    //微信登录
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.setStorageSync("token", res.code)
        }
      },
      fail: function (res) { },
    })
  },
  filter: function () {
    wx.switchTab({
      url: '../filter/filter',
      success: function (res) { },
      fail: function (res) { },
    })
  },
  openscan: function () {
    if (!wx.getStorageSync("isGuide")) {
      wx.setStorageSync("isGuide", true)
      wx.navigateTo({
        url: '../scan-tint/scan-tint',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.scanCode({
        onlyFromCamera: true,
        scanType: ["qrCode", "barCode"],
        success: function (res) {
          if (res.result) {
            wx.navigateTo({
              url: '../search-detail/search-detail?code=' + res.result,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
          console.log(res)
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
})