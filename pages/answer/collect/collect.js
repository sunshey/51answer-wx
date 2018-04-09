var utils = require('../../../utils/util.js')
var app = getApp()
var globalData = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    limit: 20,
    hasMoreData: true,
    collectList: [],//此处名字应和wxml名字一样
    loading: "flex",
    no_data: "none",
    display_tint: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // this.data.page = 1
    if (this.data.hasMoreData)
      this.getFavoriteList()
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
    // this.data.page = 1
    this.getFavoriteList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getFavoriteList()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getFavoriteList: function () {
    var that = this
    console.log(this.data.page, this.data.hasMoreData)
    wx.request({
      url: globalData.bookmyfavoriteUrl,
      data: {
        page: this.data.page,
        limit: this.data.limit
      },
      header: utils.getHeaders(),
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data)
        that.data.loading = "none"
        that.data.display_tint = "none"
        if (res.data.code == 1) {//获取数据
          var result = res.data.data
          var result_list = result.lists

          if (result_list) {

            if (that.data.page == 1) {
              that.data.collectList = []
            }
            console.log(that.data.page, that.data.collectList.concat(result_list))
            if (result_list.length < 20) {
              that.data.no_data = "flex"
              that.data.hasMoreData = false
              that.setData({
                sum: result.count,
                loading: that.data.loading,
                no_data: that.data.no_data,
                display_tint: that.data.display_tint,
                collectList: that.data.collectList.concat(result_list),
              })
            } else {
              that.data.hasMoreData = true
              that.data.page = that.data.page + 1
              that.data.no_data = "none"
              that.setData({
                sum: result.count,
                loading: that.data.loading,
                no_data: that.data.no_data,
                display_tint: that.data.display_tint,
                collectList: that.data.collectList.concat(result_list)
              })
            }

          } else {
            that.data.no_data = "flex"
            that.setData({
              loading: that.data.loading,
              no_data: that.data.no_data,
              display_tint: that.data.display_tint
            })
          }

        } else if (res.data.code == 401) {
          wx.showModal({
            title: '提示',
            content: '查看收藏列表需要先登录',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '',
            confirmText: '确定',
            confirmColor: '',
            success: function (res) {

              if (res.confirm) {
                utils.getUserinfos(function () {
                  that.getFavoriteList()
                })

              }
              else if (res.cancel) {

                that.data.loading = "none"
                that.data.display_tint = "flex"
                that.setData({
                  tint: "需要登录才能查看收藏列表，点击登录",
                  loading: that.data.loading,
                  no_data: that.data.no_data,
                  display_tint: that.data.display_tint
                })
              }
            },
            fail: function (res) { },
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  toAnswerDetail: function (e) {
    console.error(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../answer-detail/answer-detail?book_id=' + e.currentTarget.dataset.item,
      success: function (res) { },
      fail: function (res) { },
    })
  },
  login: function () {
    var that = this
    utils.getUserinfos(function () {
      that.getFavoriteList()
    })
  }
})