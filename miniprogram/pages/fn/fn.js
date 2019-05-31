// pages/fn/fn.js
// 必须先进行数据库初始化
const db = wx.cloud.database()
// 获取数据库集合
const list = db.collection('cheng')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  toAdd() {
    list.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: 'list_shangpinxinxi', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        description: "learn cloud database",
        due: new Date("2018-09-01"),
        tags: [
          { name: "火龙果", price: "20", world:"这是红心的，云南生产的"},
          { name: "火龙果", price: "10", world: "这是白心的，云南生产的" },
        ]
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
    list.doc('oLAq55UNFlqNH_zdc0KqeLKjl_Is').update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        // done: true
        tags: [
          { name: "火龙果", price: "20", world: "这是红心的，云南生产的" },
          { name: "火龙果", price: "10", world: "这是白心的，云南生产的" },
        ]
      },
      success: function (res) {
        console.log(res)
      }
    })
    list.where({
      _openid: 'oLAq55UNFlqNH_zdc0KqeLKjl_Is',
    }).get({
      success: function (res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data[0].tags)
        this.setData({
          list: res.data[0].tags
        })
      }
    })
    // list.get().then(res => {
    //   console.log(res)
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      // 对应的云函数名称
      name: "good",
      // 我们传给云函数的参数
      data: {
        number: 123456
      },
      // 调用云函数成功的回调
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      }
    })
    
    db.collection('cheng').get({
      success: function (res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
      }
    })
    
    list.doc('oLAq55UNFlqNH_zdc0KqeLKjl_Is').remove({
      _openid: "oLAq55UNFlqNH_zdc0KqeLKjl_Is",
      success: function (res) {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
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

  }
})