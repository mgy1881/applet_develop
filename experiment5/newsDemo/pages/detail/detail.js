// pages/detail/detail.js
var common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  addFavorites: function (options) {
    let article = this.data.article;
    wx.setStorageSync(article.id, article);
    this.setData({
      isAdd: true
    })
  },
  cancelFavorites: function () {
    let article = this.data.article;
    wx.removeStorageSync(article.id);
    this.setData({
      isAdd: false
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id
    var article = wx.getStorageSync(id)
    if (article != '') {
      this.setData({
        article,
        isAdd: true
      })
    } else {
      let result = common.getNewsDetail(id)
      if (result.code == '200') {
        this.setData({
          article: result.news,
          isAdd: false
        })
      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})