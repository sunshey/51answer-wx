Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.itemlist = this.getData()
    this.setData({
      itemlist: this.itemlist
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
  getData: function () {
    var list = []
    for (var i = 1; i < 31; i++) {
      var item = {}
      item["text"] = i
      if (i == 1) {
        item["display"] = "flex"
      } else {
        item["display"] = "none"
      }
      list.push(item)
    }
    return list
  },
  getViewWidth: function (e) {
    console.error(e.detail.width)
  }
  ,
  changeswiper: function (e) {
    console.log(e)
  },
  markertap: function (options) {
    console.log(options)
  },
  scroll: function (e) {
    let itemlist = this.itemlist
    for (let i = 0; i < itemlist.length; i++) {

    }

    this.setData({

    })
    console.log(Math.round(e.detail.scrollLeft / 30))
  }
})