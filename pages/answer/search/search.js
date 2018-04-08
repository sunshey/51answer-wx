var utils = require('../../../utils/util.js')
var app = getApp()
var globalData = app.globalData
var show = "none"
var input = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delete_display: show

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var histroylist = []
    if (wx.getStorageSync("history").length > 0) {
      histroylist = wx.getStorageSync("history").split("-")
    }
    wx.request({
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
          hotflags: hotrecommends,
          historylist: histroylist
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
  tintsearch: function (e) {
    var that = this
    wx.request({
      url: globalData.searchtintUrl,
      data: {
        word: e
      },
      header: {},
      method: "POST",
      dataType: "json",
      responseType: "text",
      success: function (res) {
        var result = res.data.data
        var container_display = "flex"
        if (result.length > 0) {
          container_display = "none"
        }
        that.setData({
          searchlist: result,
          container_display: container_display

        })
        // console.log(res.data.data)
      },
      fail: function (res) { }
    })
  },
  getInputValue: function (e) {

    var that = this
    input = e.detail.value.trim()
    if (input.length > 0) {
      show = 'flex'
    }
    this.setData({
      delete_display: show
    })
    if (show == "none") {
      return
    }
    console.log(input, input.length)
    setTimeout(function () {
      that.tintsearch(input)
    }, 1000)

  },
  delete: function () {
    show = 'none'
    input = ""
    this.setData({
      inputtext: input,
      delete_display: show,
      searchlist: []
    })

  },
  search: function (e) {
    if (e.currentTarget.dataset["text"]) {
      input = e.currentTarget.dataset.text
    }

    console.log(input)
    if (input.length == 0) {
      return
    }

    var history = wx.getStorageSync("history")
    console.log(history)

    var historylist = []
    if (history.length > 0) {
      historylist = history.split('-')
    }

    if (historylist.indexOf(input) < 0) {
      historylist.push(input)
      utils.saveList(historylist)
    }

    wx.navigateTo({//跳转到搜索页
      url: '../search-detail/search-detail?flag=' + input,
    })

   

  },
  deletehistroy: function () {
    wx.removeStorageSync("history")
    this.setData({
      historylist: []
    })
  }

})