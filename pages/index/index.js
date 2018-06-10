//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    viewHeight:0,
    leibie: '肉类',
    scrollTop: 0,
    fenlei: ["肉类", "素食", "口味"],
    toView: "qianzhang",
    lists: [
      {
        text: "鸭心",
        price: 2,
        num: 0,
        show: "hidden",
        id:"yaxin",
        display:"block"
      }, {
        text: "鸭翅膀",
        price: 2,
        num: 0,
        show: "hidden",
        id: "yacibang",
        display: "block"
      }, {
        text: "鸭爪子",
        price: 2,
        num: 0,
        show: "hidden",
        id: "yazhuazi",
        display: "block"
      }, {
        text: "香肠",
        price: 2,
        num: 0,
        show: "hidden",
        id:"xiangchang",
        display:"block"
      }, {
        text: "鸭架",
        price: 2.5,
        num: 0,
        show: "hidden",
        id:"yajia",
        display: "block"
      }, {
        text: "鸭肝",
        price: 1,
        num: 0,
        show: "hidden",
        id:"yagan",
        display: "block"    
      },
      {
        text: "鸭肠",
        price: 1,
        num: 0,
        show: "hidden",
        id:"yachang",
        display: "block"
      },
      {
        text: "鸭头",
        price: 4,
        num: 0,
        show: "hidden",
        id:"yatou",
        display: "block"
      }, {
        text: "鸭胗",
        price: 3,
        num: 0,
        show: "hidden",
        id:"yazhen",
        display: "block"
      },
      {
        text: "鸭腿",
        price: 5,
        num: 0,
        show: "hidden",
        id:"yatui",
        display: "block"
      },
      {
        text: "鸭脖",
        price: 5,
        num: 0,
        show: "hidden",
        id:"yabo",
        display: "block"
      },
      {
        text: "千张",
        price: 1.5,
        num: 0,
        show: "hidden",
        id:"qianzhang",
        display: "block"
      },
      {
        text: "海带",
        price: 1.5,
        num: 0,
        show: "hidden",
        id:"haidai",
        display: "block"
      },
      {
        text: "土豆",
        price: 1.5,
        num: 0,
        show: "hidden",
        id:"tudou",
        display: "block"
      },
      {
        text: "面筋",
        price: 2,
        num: 0,
        show: "hidden",
        id:"mianjing",
        display: "block"
      },
      {
        text: "藕",
        price: 3,
        num: 0,
        show: "hidden",
        id:"ou",
        display: "block"
      },
      {
        text: "花生米",
        price: 3,
        num: 0,
        show: "hidden",
        id:"huashengmi",
        display: "block"
      },
      {
        text: "醋",
        price: 0,
        num: 0,
        show: "hidden",
        id:"cu",
        display: "block"
      },
      {
        text: "香菜",
        price: 0,
        num: 0,
        show: "hidden",
        id:"xiangcai",
        display: "block"
      },
      {
        text: "微辣",
        price: 0,
        num: 0,
        show: "hidden",
        id:"weila",
        display: "block"
      },
      {
        text: "中辣",
        price: 0,
        num: 0,
        show: "hidden",
        id:"zhongla",
        display: "block"
      },
      {
        text: "特辣",
        price: 0,
        num: 0,
        show: "hidden",
        id:"tela",
        display: "block"
      }
    ],
    order: [],
    total: 0,
    shopcar: "none",
    submit: false
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          viewHeight: res.windowHeight*0.8
        })

      }
    })
    console.log("打印日志");
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  addNum: function (e) {
    console.log(e.target.id);
    let total = this.data.total;
    let temp = e.target.id;
    let list = this.data.lists;
    
    for (let i = 0; i < list.length; i++) {
      if (list[i].text == temp) {       
        if (temp == "微辣") {
          list[20].num = 0;
          list[21].num = 0;
          list[i].num = 1;
        }else if (temp == "中辣") {
          list[19].num = 0;
          list[21].num = 0;
          list[i].num = 1;
        }else if (temp == "特辣") {
          list[19].num = 0;
          list[20].num = 0;
          list[i].num=1;
        }else{
          list[i].num += 1;
          total += list[i].price;  
        } 
        list[i].show = "visible";
      }
      if (list[i].num == 0) {
        list[i].show = "hidden";
      }
    }
    
    let data = [];
    for (let i = 0; i < list.length; i++) {
      // console.log(list[i]);
      if (list[i].num > 0) {
        var obj = {};
        obj.text = list[i].text;
        obj.num = list[i].num;
        obj.price = list[i].price * list[i].num;
        data.push(obj);
      }
    }

    // list[temp].num+=1;
    // console.log(list);
    this.setData({
      lists: list,
      total: total,
      order: data
    });
  },
  minus: function (e) {
    // console.log(e.target.id);
    let temp = e.target.id;
    let total = this.data.total;
    let list = this.data.lists;
    for (let i = 0; i < list.length; i++) {
      if (list[i].text == temp) {
        if (list[i].num > 0) {
          list[i].num -= 1;
          total -= list[i].price;
        }

      }
    }
    let data = [];
    for (let i = 0; i < list.length; i++) {
      // console.log(list[i]);
      if (list[i].num > 0) {
        var obj = {};
        obj.text = list[i].text;
        obj.num = list[i].num;
        obj.price = list[i].price * list[i].num;
        data.push(obj);
      }
    }
    this.setData({
      lists: list,
      total: total,
      order: data
    });
  },
  order: function () {
    let data = [];
    let list = this.data.lists;
    for (let i = 0; i < list.length; i++) {
      // console.log(list[i]);
      list[i].show = "hidden";
      if (list[i].num > 0) {
        var obj = {};
        obj.text = list[i].text;
        obj.num = list[i].num;
        obj.price = list[i].price * list[i].num;
        data.push(obj);
      }
    }
    // console.log(data);
    let shopcar;
    if (data.length === 0) {
      shopcar = "none";
    } else {
      shopcar = this.data.shopcar == "none" ? "block" : "none";
    }
    this.setData({
      lists: list,
      order: data,
      shopcar: shopcar
    })
    console.log(this.data.order);

  },
  cleancar: function () {
    let list = this.data.lists;
    let order = [];
    let total = 0;
    let show = "none";
    for (let i = 0; i < list.length; i++) {
      list[i].num = 0;
    }
    this.setData({
      lists: list,
      order: order,
      total: total,
      shopcar: show
    })
  },
  choseLeibie: function (e) {
    let id = e.target.id;
    console.log(id);
    this.setData({
      leibie: id
    });
    let viewid;
    let list = this.data.lists;
    if (id == "肉类") {
      for (let i = 0; i < list.length; i++) {
        if(i<11){
        list[i].display = "block";
        }else{
          list[i].display="none";
        }
      } 
      viewid = "yaxin";
    } else if(id=="素食") {
      for (let i = 0; i < list.length; i++) {
        if(i<17&&i>10){
          list[i].display = "block";
        }else{
          list[i].display = "none";
        }

      } 
      viewid = "qianzhang";
    }else{
      viewid="cu";
      for(let i=0;i<list.length;i++){
        if(i<17){
        list[i].display="none"; 
        }else{
          list[i].display="block";
        } 
      }  
    }
    this.setData({
      lists:list
    });
    // console.log(id);
    console.log(viewid);
    this.setData({
      toView: viewid
    });
    console.log(this.data.toView);
  },
  submit: function () {
    let submit = this.data.submit;
    if (this.data.order.length != 0) {
      if (submit) {
        wx.showToast({
          title: '请勿重复下单',
        })
      } else {
        wx.showToast({
          title: '下单成功',
        })
        submit = true;
      }
    }
    this.setData({
      submit: submit
    })

  },
  upper: function (e) {
    console.log(e);
  },
  lower: function (e) {
    console.log(e);
  },
  scroll: function (e) {
    console.log(e);
  },



})
