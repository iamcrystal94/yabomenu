//index1.js

var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    scrollTop: 0,
    height:0
  },
  onLoad:function(e){
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight);
        that.setData({
          height:res.windowHeight/2.6
        })
        console.log(that.data.height);
        
      },
    })
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})
