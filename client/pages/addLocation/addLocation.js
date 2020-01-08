var des_lat = -1;
var des_lng = -1;
var des_title = "";
var callout_obj={};
Page({
    data: {
        markers: [{
            iconPath: "../../image/marker.png",
            id: 0,
            latitude: -1,
            longitude: -1,
            callout:{}
        }],
        controls: [{
            id: 1,
            iconPath: '../../image/location.png',
            position: {
                left: 20,
                top: 450 - 50,
                width: 30,
                height: 30
            },
            clickable: true
        }],
        inputShowed: false,
        inputVal: "",
        central_longitude: -1,
        central_latitude: 20,
    },
    regionchange(e) {
      console.log("e.type", e.type)
    },
    /**
     * 点击marker的时候触发，显示callout
     */
    markertap(e) {
        var that = this;
        callout_obj = {
            content:des_title,
            color:"#000",
            fontSize:12,
            borderRadius:5,
            padding:3,
            display:'ALWAYS',
            textAlign:'center'
        };
        that.setData({
            markers:[{
                iconPath: "../../image/marker.png",
                id: 0,
                latitude: des_lat,
                longitude: des_lng,
                callout: callout_obj
            }]
        });
      console.log("markertap setData", that.data)
    },
    controltap(e) {
        var that = this;
        that.mapCtx.moveToLocation();
    },

    searchDetail: function () {
        wx.redirectTo({
            url: '../searchDetail/searchDetail',
        })
    },

    /**
     * 页面载入的时候获取用户地址
     */
    onLoad: function (options) {
        var that = this;
      console.log("onLoad options", options)
        if (!getApp().data.haveLocation) {
            wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                  console.log("getlocation调用成功,res：",res)
                    that.setData({
                        central_latitude: res.latitude,
                        central_longitude: res.longitude
                    });
                }
            });
            getApp().data.haveLocation = true;
          console.log("页面载入获得用户地址", getApp().data)
            //页面退出的时候也要更新haveLocation！！！！！
            // !!!!!!!
        }


        des_lat = options.lat;
        des_lng = options.lng;
        des_title = options.title;
        that.setData({
            markers: [{
                iconPath: "../../image/marker.png",
                id: 0,
                latitude: des_lat,
                longitude: des_lng,
              // latitude: 23.099994,
              // longitude: 113.324520,
            }],
            central_latitude: des_lat,
            central_longitude: des_lng,
        })
      console.log("onLoad setData", that.data)
    },

    onReady: function (e) {
        var that = this;
        that.mapCtx = wx.createMapContext('myMap');
    },

    /**
     * 确定地点并返回
     */
    submit_location: function() {
        getApp().data.activity_lat = des_lat;
        getApp().data.activity_lng = des_lng;
        getApp().data.activity_location = des_title;
      console.log("getApp().data", getApp().data);
        wx.navigateBack({
            delta:1
        });
        console.log(getApp().data.activity_location);
    }
})