var util = require('../../../utils/util.js')
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData: app.globalData,
    booklist: [],
    hasMoreData: true,

    page: 1,
    name: "",
    code: "",
    grade: "",
    part: "",
    version: "",
    subject: "",
    loading: "flex",
    no_data: "none",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.name = options.flag;
    this.data.subject = options.subject;
    this.data.grade = options.grade;
    this.data.version = options.version;
    this.data.part = options.part
    this.data.code = options.code
    this.getSearchList()


    // console.log(options.flag)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getSearchList: function () {
    var that = this
    wx.request({
      url: that.data.globalData.hotbookUrl,
      data: {
        page: that.data.page,
        limit: 20,
        name: that.data.name,
        code: that.data.code,
        grade: that.data.grade,
        part: that.data.part,
        version: that.data.version,
        subject: that.data.subject
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data, res.data.data)
        if (res.data.code == 1) {
          var result = res.data.data
          // console.error(result.lists.length)

          var results = []
          that.data.loading = "none";
          if (result.lists) {
            result.lists.map(item => {
              if (item.flag.length == 0) {
                item.flag.push(item.version)
              }
              // console.log(item.flag)
              results.push(item)
            })
            // console.log(results)
            if (that.data.page == 1) {
              that.data.booklist = []
            }

            console.log(that.data.page, that.data.booklist.concat(results))
            if (results.length < 20) {
              that.data.hasMoreData = false;
              that.data.no_data = "flex";
              that.setData({
                loading: that.data.loading,
                no_data: that.data.no_data,
                sum: result.count,
                booklist: that.data.booklist.concat(results)

              })
            } else {
              that.data.hasMoreData = true;
              that.data.no_data = "none";
              that.data.page = that.data.page + 1;
              that.setData({
                loading: that.data.loading,
                no_data: that.data.no_data,
                sum: result.count,
                booklist: that.data.booklist.concat(results)
              })
            }
          } else {
            that.data.no_data = "flex";
            that.setData({
              loading: that.data.loading,
              no_data: that.data.no_data,
            })
          }

        }

      },
      fail: function (res) { }
    })
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getSearchList()
    }

    console.log("上拉了")
  },
  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    this.data.page = 1
    this.getSearchList()
  },
  toAnswerDetail: function (e) {
    console.error(JSON.stringify(e.currentTarget.dataset.item))
    // item = e.currentTarget.dataset.item
    // console.log(JSON.stringify(e.currentTarget.dataset.item))
    console.log(e.currentTarget.dataset.item.id)
    wx.navigateTo({
      url: '../answer-detail/answer-detail?book_id=' + e.currentTarget.dataset.item.id,
    })


  },
  scan: function () {
    if (!wx.getStorageSync("isGuide")) {
      wx.setStorageSync("isFirst", true)
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
  },
  filter:function(){
    wx.switchTab({
      url: '../filter/filter',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})