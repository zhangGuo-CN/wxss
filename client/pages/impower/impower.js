// pages/impower/impower.js
const app = getApp();
var config = require('../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  bindGetUserInfo: function (res) {
    console.log("req userInfo", res)
    console.log("getApp()", app)
    // 可以将 res 发送给后台解码出 unionId
    var that = app;
    that.globalData.userInfo = res.detail.userInfo;
    that.globalData.avator_url = res.detail.userInfo.avatarUrl;
    console.log("app.globalData", that.globalData);

    wx.request({
      url: config.url + '/person/',
      data: {
        'username': res.detail.userInfo.nickName
      },
      method: 'POST',
      success: function (user_res) {
        that.globalData.user_id = user_res.data.userId
        // that.globalData.avator_url = user_res.data.avatorUrl
        console.log("访问后台后的 app.globalData", that.globalData);
      }
    })

    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    if (this.userInfoReadyCallback) {
      this.userInfoReadyCallback(res)
    }
    wx.switchTab({
      url: '../user/user'
    })
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
    console.log("onHide")
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
    console.log("onPullDownRefresh")
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