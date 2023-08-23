Page({
  data: {
    region: ["山东省", "青岛市", "黄岛区"],
    now:{
      temp:"0",
      text:"未知",
      icon:"999",
      humidity:"0",
      pressure:"0",
      vis:"0",
      windDir:"0",
      windSpeed:"0",
      windScale:"0"
    }
  },
  regionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
    this.getWeather()
  },
  getId: function () {
    let that = this;
    return new Promise((resolve) => {
      wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup',
        data: {
          location: that.data.region[2],
          adm: that.data.region[1],
          key: 'f77beb587a27415ba616840b208f0e33'
        },
        success: function (res) {
          resolve(res.data.location[0].id);
          console.log(res.data)
        }
      }) 
      
    });
  },

  getWeather: function () {
    let that = this;
    that.getId().then((city_id) => {
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/now',
        data: {
          location: city_id,
          // location:101010100,
          key: 'f77beb587a27415ba616840b208f0e33'
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            now: res.data.now
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
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
})