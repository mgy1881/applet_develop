
// pages/game/game.js
var num = [
  ['00', '01', '02'],
  ['10', '11', '12'],
  ['20', '21', '22']
];
var w = 100;
var url = '/images/pic01.jpg';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWin:false
  },

  shuffle: function () {
    num = [
      ['00', '01', '02'],
      ['10', '11', '12'],
      ['20', '21', '22']
    ];
    var row = 2;
    var col = 2;
    for (var i = 0; i < 100; i++) {
      var direction = Math.round(Math.random() * 3)
      if (direction == 0) {
        if (row != 0) {
          num[row][col] = num[row - 1][col]
          num[row - 1][col] = '22'
          row -= 1
        }
      } else if (direction == 1) {
        if (row != 2) {
          num[row][col] = num[row + 1][col]
          num[row + 1][col] = '22'
          row += 1
        }
      } else if (direction == 2) {
        if (col != 0) {
          num[row][col] = num[row][col - 1]
          num[row][col - 1] = '22'
          col -= 1
        }
      }else if(direction==3){
        if(col!=2){
          num[row][col] = num[row][col+1]
          num[row][col+1] = '22'
          col+=1
        }
      }
    }
  },

  drawCanvas: function () {
    let ctx = this.ctx

    ctx.clearRect(0, 0, 300, 300)
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (num[i][j] != '22') {
          var row = parseInt(num[i][j] / 10)
          var col = num[i][j] % 10
          ctx.drawImage(url, col * w, row * w, w, w, j * w, i * w, w, w)
        }
      }
    }
    ctx.draw()
  },

  touchBox:function(e){
    if(this.data.isWin){
      return
    }

    var x = e.changedTouches[0].x
    var y = e.changedTouches[0].y

    var row = parseInt(y/w)
    var col = parseInt(x/w)

    if(num[row][col]!='22'){
      this.moveBox(row,col)
      this.drawCanvas()
      if(this.isWin()){
        let ctx = this.ctx
        ctx.drawImage(url,0,0)

        ctx.setFillStyle('#e64340')
        ctx.setTextAlign('center')
        ctx.setFontSize(60)
        ctx.fillText('游戏成功',150,150)
        ctx.draw()
      }
    }

  },

  moveBox:function(i,j){
    if(i>0){
      if(num[i-1][j]=='22'){
        num[i-1][j] = num[i][j]
        num[i][j] = '22'
        return
      }
    }

    if(i<2){
      if(num[i+1][j]=='22'){
        num[i+1][j]=num[i][j]
        num[i][j] = '22'
        return
      }
    }
    if(j>0){
      if(num[i][j-1] == '22'){
        num[i][j-1]=num[i][j]
        num[i][j] = '22'
        return
      }
    }

    if(j<2){
      if(num[i][j+1]=='22'){
        num[i][j+1]=num[i][j]
        num[i][j]='22'
        return
      }
    }
  },

  isWin:function(){
    for(var i = 0;i<3;++i){
      for(var j = 0;j<3;++j){
        if(num[i][j]!= i*10+j){
          return false
        }
      }
    }
    this.setData({isWin:true})
    return true
  },

  restartGame:function(){
    this.setData({isWin:false})
    this.shuffle()
    this.drawCanvas()
  },

  onLoad(options) {
    url = '/images/' + options.level
    this.setData({
      url: url
    })
    this.ctx = wx.createCanvasContext('myCanvas')
    this.shuffle()
    this.drawCanvas()
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