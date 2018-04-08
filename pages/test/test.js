
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  }
  ,

  navigationClick: function () {
    wx.navigateTo({
      url: '../train/train',
    })
  },
  preview: function () {
    wx.previewImage({
      urls: ["https://anspic.bshu.com/answers/E0F907A9B54569D773E1424F62C6EFA6.jpg",    
        "https://anspic.bshu.com/answers/87533258CDD498826532E3B5C64CE800.jpg",
        "https://anspic.bshu.com/answers/693DB0C1C97FD2A94B6BA47B6AAD8F3C.jpg",
        "https://anspic.bshu.com/answers/8CC6E30FC4C6B0D6A59E1DCD832B06DF.jpg",
        "https://anspic.bshu.com/answers/11A55BA50E49118F5A7D2BBE283709A6.jpg",
        "https://anspic.bshu.com/answers/100512AB08CADE203C983790CAA6FD30.jpg",
        "https://anspic.bshu.com/answers/17A7786D2E691E468BD7237E6113E45B.jpg",
        "https://anspic.bshu.com/answers/2011_8.jpg",
        "https://anspic.bshu.com/answers/2011_9.jpg",
        "https://anspic.bshu.com/answers/2011_10.jpg",
        "https://anspic.bshu.com/answers/2011_11.jpg"],
    })
  }
})
