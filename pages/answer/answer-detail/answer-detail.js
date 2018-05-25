var utils = require("../../../utils/util.js")
var app = getApp()
var globaldata = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer_detail_url: globaldata.answerdetailUrl,
    book_id: "",
    current_page: 0,
    sum_pages: [],
    collect: "",
    download: "下载",
    share: "分享",
    answer_title: "",
    collect_icon: "",
    answer_info: {},
    favorite: 0,//保存收藏状态
    collect_color: "",
    isCollectClick: false,
    // isshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var info = JSON.parse(options.item)
    // this.data.book_id = info.id
    this.data.book_id = options.book_id
    // this.setData({
    //   answer_title: info.name
    // })
    // console.error(JSON.parse(options.item).id)
    this.getAnswerDetail()

    wx.getSystemInfo({
      success: function (res) { 
        console.log(res.screenWidth)
      },
      fail: function (res) { },
      complete: function (res) { },
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
  onShareAppMessage: function (res) {
    var that = this
    return {
      title: this.data.answer_info.name,
      path: '/pages/answer/index/index?book_id' + this.data.book_id,
      imageUrl: this.data.answer_info.cover_img,
      success: function (res) {
        // 转发成功
        console.log(res.shareTickets)
        that.getAnswerDetail()
        wx.showShareMenu({
          withShareTicket: true
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getUserInfo: function (res) {
    var that = this
    console.log(res.detail)
    if (res.detail.userInfo) {
      utils.loginserver(wx.getStorageSync("token"), res.detail.userInfo.nickName, res.detail.userInfo.avatarUrl, function () {
        that.collect()
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '拒绝后将不能使用收藏功能',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '确定',
        confirmColor: '',
        success: function (res) { },
      })
    }
  },

  getAnswerDetail: function () {
    var that = this
    wx.request({
      url: that.data.answer_detail_url,
      data: {
        book_id: that.data.book_id
      },
      header: utils.getHeaders(),
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.code == 1) {
          that.data.answer_info = res.data.data
          var answer_list = that.data.answer_info.answer_list
          that.data.sum_pages = []
          var sum_page = answer_list.length
          console.log(that.data.answer_info, answer_list)
          that.data.favorite = that.data.answer_info.favorite
          that.changeCollectState(that.data.favorite)
          for (var i = 0; i < sum_page; i++) {
            var sum_page_item = {}
            if (i == 0) {
              sum_page_item["color"] = "f14343"
              sum_page_item["display"] = "flex"
              // that.data.isshow=true
            } else {
              sum_page_item["color"] = "000"
              sum_page_item["display"] = "none"
              // that.data.isshow = false
            }
            sum_page_item["text"] = i + 1
            that.data.sum_pages.push(sum_page_item)
          }

          that.setData({
            answer_title: that.data.answer_info.name,
            sum_page: sum_page,
            current_page: that.data.current_page + 1,
            sum_pages: that.data.sum_pages,
            images: answer_list,
            collect_icon: that.data.collect_icon,
            // isshow:that.data.isshow
          })
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  changeswiper: function (e) {
    this.data.current_page = e.detail.current
    if (this.data.current_page > 2 && this.data.answer_info.access == 0) {
      this.data.current_page = 2
      wx.showModal({
        title: '提示',
        content: '亲，分享给微信群或朋友圈后，即可查看本书答案',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '确认',
        confirmColor: '#000',
        success: function (res) {
        },
      })

    }

    // console.error(e.detail.current, this.data.sum_pages)
    for (var i = 0; i < this.data.sum_pages.length; i++) {
      var info = this.data.sum_pages[i]
      if (i == this.data.current_page) {
        info['color'] = "f14343"
        info['display'] = 'flex'
      } else {
        info['color'] = "000"
        info['display'] = 'none'
      }
    }
    this.setData({
      sum_pages: this.data.sum_pages,
      current_page: this.data.current_page + 1,
      current: this.data.current_page
    })

  },
  previewimag: function (e) {
    var currentUrl = e.currentTarget.dataset.url
    var answer_list = this.data.answer_info.answer_list
    var index = answer_list.indexOf(currentUrl)
    var imageUrls = []
    var image_lenth = 0;
    if (this.data.answer_info.access == 1) {
      image_lenth = answer_list.length;
    } else {
      image_lenth = 3;
    }
    for (index; index < image_lenth; index++) {
      imageUrls.push(answer_list[index])
    }
    console.error(currentUrl, index)
    this.data.sum_pages
    wx.previewImage({
      urls: imageUrls,
    })
  }
  ,
  collect: function () {

    var that = this
    var favorite = this.data.favorite
    this.data.isCollectClick = true
    wx.request({
      url: globaldata.favoriteUrl,
      data: {
        book_id: this.data.book_id
      },
      header: utils.getHeaders(),
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 1) {
          favorite = favorite == 1 ? 0 : 1
          that.data.favorite = favorite
          wx.showToast({
            title: (favorite == 1 ? "收藏" : "取消收藏") + "成功",
            icon: 'successs',
            image: '',
            duration: 1000,
            mask: true,
            success: function (res) { },
          })
          that.changeCollectState(favorite)
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  changeCollectState: function (favorite) {
    if (favorite == 1) {
      this.data.collect_icon = "../../../images/foot-collection-hovericon.png"
      this.data.collect = "已收藏"
      this.data.collect_color = "f14343"
    } else {
      this.data.collect_icon = "../../../images/foot-collection-icon.png"
      if (this.data.isCollectClick) {
        this.data.collect = "取消收藏"
      } else {
        this.data.collect = "收藏"
      }
      this.data.collect_color = "000"
    }
    this.setData({
      collect: this.data.collect,
      collect_icon: this.data.collect_icon,
      collect_color: this.data.collect_color
    })
  },
  download: function () {
    var answer_list = this.data.answer_info.answer_list
    var current_url = answer_list[this.data.current_page]
    // console.error(current_url)
    wx.showLoading({
      title: '正在下载图片',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    const downloadTask = wx.downloadFile({
      url: current_url + "@!ys800",
      header: {},
      success: function (res) {
        wx.hideLoading()
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '图片已成功保存到相册',
              icon: 'success',
              image: '',
              duration: 1000,
              mask: true,
              success: function (res) { },
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },

    })

    downloadTask.onProgressUpdate(res => {
      console.log('下载进度', res.progress)
      console.log('已经下载的数据长度', res.totalBytesWritten)
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })
  },
  share: function () {
    this.onShareAppMessage()

  }
})