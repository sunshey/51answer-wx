// pages/train/train.js
const city = require('../../utils/util.js');
var app = getApp()
var start_placeholder = app.globalData.startPlaceholder
var arrive_placeholder = app.globalData.arrivePlaceholder
var start_time = app.globalData.starttimeholder

Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: "",
    showPickerStatus: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
    if (wx.getStorageSync('key'))
      start_placeholder = wx.getStorageSync('key')
    if (wx.getStorageSync("arrive_place"))
      arrive_placeholder = wx.getStorageSync("arrive_place")
    if (wx.getStorageSync("start_time"))
      start_time = wx.getStorageSync("start_time")

    console.log(start_placeholder)
    this.setData({
      start_placeholder: start_placeholder,
      arrive_placeholder: arrive_placeholder,
      start_timeholder: start_time
    })
    // wx.getStorage({
    //   key: 'key',
    //   success: function(res) {
    //     start_placeholder =res.data
    //     console.log(res.data)
    //   },
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
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

  getPlace: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  getTime: function (e) {
    if (this.data.showPickerStatus) {
      this.hideModal();
    } else {
      this.showModal();
    }
  },

  query: function (e) {

    var startplace = e.detail.value.start_city
    var arrivePlace = e.detail.value.arrive_city
    var startTime = e.detail.value.start_time
    let tip = ""
    let arrive_tip = ""
    let start_time_tip = ""
    if (startplace.trim().length == 0) {
      tip = "出发地不能为空"
    }
    if (arrivePlace.trim().length == 0) {
      arrive_tip = "到达地不能为空"
    }
    if (startTime.trim().length == 0) {
      start_time_tip = "出发时间不能为空"
    }
    this.setData({
      tip: tip,
      arrive_tip: arrive_tip,
      start_time_tip: start_time_tip
    })
    if (tip.length > 0 || arrive_tip.length > 0 || start_time_tip.length > 0) {
      return
    }


    var queryUrl = app.globalData.ticketUrl + "?leftTicketDTO.train_date=" + startTime + "&leftTicketDTO.from_station=" + city.getCityCode(startplace) + "&leftTicketDTO.to_station=" + city.getCityCode(arrivePlace) + "&purpose_codes=0X00"
    wx.setStorageSync("key", startplace)
    wx.setStorageSync("arrive_place", arrivePlace)
    wx.setStorageSync("start_time", startTime)
    var that = this
    wx.request({
      url: queryUrl,
      data: '',
      header: {
        // "Upgrade-Insecure-Requests": "1",
        // "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Mobile Safari/537.36"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var ticketInfos = res.data.data.result
        var tickets = []
        ticketInfos.map(item => {
          var ticketInfo = {}
          var ticket_items = item.split("|")
          ticketInfo["checi"] = ticket_items[3]
          ticketInfo["startPlace"] = city.getCityName(ticket_items[6])
          ticketInfo["arriveplace"] = city.getCityName(ticket_items[7])
          ticketInfo["startTime"] = ticket_items[8]
          ticketInfo["arriveTime"] = ticket_items[9]
          ticketInfo["lishi"] = ticket_items[10]
          ticketInfo["yi"] = ticket_items[30]
          ticketInfo["er"] = ticket_items[31]
          ticketInfo["yingwo"] = ticket_items[26]
          ticketInfo["yingzuo"] = ticket_items[28]
          ticketInfo["ruanwo"] = ticket_items[17]
          tickets.push(ticketInfo)
          console.error(ticket_items)
        })
        that.setData({
          data: tickets
        })
        console.log(res.data.data.result)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })

    // console.error(queryUrl =="https://kyfw.12306.cn/otn/leftTicket/queryO?leftTicketDTO.train_date=2018-03-27&leftTicketDTO.from_station=WHN&leftTicketDTO.to_station=SNN&purpose_codes=0X00")
    console.log(startplace, arrivePlace, startTime, queryUrl)
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  showModal: function () {
    // 显示遮罩层 
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  hideModal: function () {
    // 隐藏遮罩层 
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showPickerStatus: false
      })
    }.bind(this), 200)
  },
  input_content: function (e) {
    console.log(e);
    inputinfo = e.detail.value;
  }


})