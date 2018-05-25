var app = getApp()
var globalData = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects: [],
    grades: [],
    versions: [],
    parts: [],
    current_subject: "全部",
    current_grade: "全部",
    current_version: "全部",
    current_part: "全部"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFilterTags()
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

  getFilterTags: function () {
    var that = this
    wx.request({
      url: globalData.bookversionUrl,
      data: '',
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.code == 1) {
          var result = res.data.data
          that.data.subjects = that.createNewData(result.subject)
          that.data.grades = that.createNewData(result.grade)
          that.data.versions = that.createNewData(result.version)
          that.data.parts = that.createNewData(result.part_type)
          that.setData({
            subjects: that.data.subjects,
            grades: that.data.grades,
            versions: that.data.versions,
            parts: that.data.parts
          })

          console.log(res.data)
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  ,
  createNewData: function (list) {
    var new_data = []
    var first_item = { "name": "全部", "color": "f14343" }
    new_data.push(first_item)
    list.map(item => {
      var new_item = {}
      new_item["name"] = item["name"]
      new_item["color"] = ""
      new_data.push(new_item)
    })
    return new_data
  },
  subjectclick: function (e) {
    this.data.current_subject = e.currentTarget.dataset.item
    var subjects = this.data.subjects
    this.setData({
      subjects: this.changeTagState(subjects, this.data.current_subject)
    })

    // console.log(e.currentTarget.dataset.item)
  },
  gradeclick: function (e) {
    this.data.current_grade = e.currentTarget.dataset.item
    this.setData({
      grades: this.changeTagState(this.data.grades, e.currentTarget.dataset.item)
    })

    // console.log(e.currentTarget.dataset.item)
  },
  versionclick: function (e) {
    this.data.current_version = e.currentTarget.dataset.item
    this.setData({
      versions: this.changeTagState(this.data.versions, this.data.current_version)
    })
    // console.log(e.currentTarget.dataset.item)
  },
  partclick: function (e) {
    this.data.current_part = e.currentTarget.dataset.item
    this.setData({
      parts: this.changeTagState(this.data.parts, this.data.current_part)
    })
    // console.log(e.currentTarget.dataset.item)
  },
  changeTagState: function (list, current_item) {
    var new_subjects = []
    list.map(item => {
      if (current_item == item.name) {
        item["color"] = "f14343"
      } else {
        item["color"] = ""
      }
      new_subjects.push(item)
    })
    return new_subjects
  },
  confirm: function () {
    wx.navigateTo({
      url: '../search-detail/search-detail?subject=' + this.data.current_subject + '&grade=' + this.data.current_grade + '&version=' + this.data.current_version + '&part=' + this.data.current_part,
      success: function (res) { },
      fail: function (res) { },
    })
  },
  cancel: function () {
    wx.switchTab({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})