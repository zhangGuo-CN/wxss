/**
 * 最终上传到cos的URL
 * 把以下字段配置成自己的cos相关信息，详情可看API文档 https://www.qcloud.com/document/product/436/6066
 * REGION: cos上传的地区
 * APPID: 账号的appid
 * BUCKET_NAME: cos bucket的名字
 * DIR_NAME: 上传的文件目录
 * 
 */
var COS = require('cos-wx-sdk-v5');
var config = require('../config.js');
// var cosUrl = "http://" + config.cosRegion + ".file.myqcloud.com/files/v2/" + config.cosAPPID + "/" + config.cosBucketName +'/' + config.cosDirName;
var cosUrl = 'https://wxss-1300917475.cos.ap-chongqing.myqcloud.com';

//填写自己的鉴权服务器地址
var cosSignatureUrl = config.cosSignatureUrl;
// var cosSignatureUrl = config.cosUrl;
// 签名回调
var getAuthorization = function(options, callback) {

    // 格式一、（推荐）后端通过获取临时密钥给到前端，前端计算签名
    // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
    // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
    // wx.request({
    //     method: 'GET',
    //     url: config.stsUrl, // 服务端签名，参考 server 目录下的两个签名例子
    //     dataType: 'json',
    //     success: function(result) {
    //         var data = result.data;
    //         var credentials = data.credentials;
    //         callback({
    //             TmpSecretId: credentials.tmpSecretId,
    //             TmpSecretKey: credentials.tmpSecretKey,
    //             XCosSecurityToken: credentials.sessionToken,
    //             ExpiredTime: data.expiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
    //         });
    //     }
    // });


    // // 格式二、（推荐）【细粒度控制权限】后端通过获取临时密钥给到前端，前端只有相同请求才重复使用临时密钥，后端可以通过 Scope 细粒度控制权限
    // // 服务端例子：https://github.com/tencentyun/qcloud-cos-sts-sdk/edit/master/scope.md
    // wx.request({
    //     method: 'POST',
    //     url: 'http://127.0.0.1:3000/sts-scope',
    //     data: options.Scope,
    //     dataType: 'json',
    //     success: function(result) {
    //         var data = result.data;
    //         var credentials = data.credentials;
    //         callback({
    //             TmpSecretId: credentials.tmpSecretId,
    //             TmpSecretKey: credentials.tmpSecretKey,
    //             XCosSecurityToken: credentials.sessionToken,
    //             ExpiredTime: data.expiredTime,
    //             ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
    //         });
    //     }
    // });


    // // 格式三、（不推荐，分片上传权限不好控制）前端每次请求前都需要通过 getAuthorization 获取签名，后端使用固定密钥或临时密钥计算签名返回给前端
    // // 服务端获取签名，请参考对应语言的 COS SDK：https://cloud.tencent.com/document/product/436/6474
    // // 注意：这种有安全风险，后端需要通过 method、pathname 严格控制好权限，比如不允许 put / 等
    // wx.request({
    //     method: 'POST',
    //     url: 'https://example.com/sts-auth.php, // 服务端签名，参考 server 目录下的两个签名例子
    //     data: {
    //         method: options.Method,
    //         pathname: options.Pathname,
    //         query: options.Query,
    //         headers: options.Headers,
    //     },
    //     dataType: 'json',
    //     success: function(result) {
    //         callback({
    //             Authorization: result.data,
    //             // XCosSecurityToken: sessionToken, // 如果使用临时密钥，需要传 sessionToken
    //         });
    //     }
    // });


    // // 格式四、（不推荐，适用于前端调试，避免泄露密钥）前端使用固定密钥计算签名
    var authorization = COS.getAuthorization({
        SecretId: 'AKIDOYSbWAVdaGfnwsFu4ybxazSgcomUm76q',
        SecretKey: 'pOq65nERO3VEm33pumSrHSMzLfpiS5TN',
        Method: options.Method,
        Pathname: options.Pathname,
        Query: options.Query,
        Headers: options.Headers,
        Expires: 60,
    });
    callback({
        Authorization: authorization,
        // XCosSecurityToken: credentials.sessionToken, // 如果使用临时密钥，需要传 XCosSecurityToken
    });

};
var cos = new COS({
    // path style 指正式请求时，Bucket 是在 path 里，这样用途相同园区多个 bucket 只需要配置一个园区域名
    // ForcePathStyle: true,
    getAuthorization: getAuthorization,
});
// 回调统一处理函数
// var requestCallback = function(err, data) {
//     console.log(err || data);
//     // var upload_res = JSON.parse(uploadRes.data)
//     // var upload_res = data
//     // me.setData({
//     //     avator_path:data.location
//     // })
//     callback(data.location)
//     if (err && err.error) {
//         wx.showModal({
//             title: '返回错误',
//             content: '请求失败：' + (err.error.Message || err.error) + '；状态码：' + err.statusCode,
//             showCancel: false
//         });
//     } else if (err) {
//         wx.showModal({
//             title: '请求出错',
//             content: '请求出错：' + err + '；状态码：' + err.statusCode,
//             showCancel: false
//         });
//     } else {
//         wx.showToast({
//             title: '请求成功',
//             icon: 'success',
//             duration: 3000
//         });
//     }
// };
/**
 * 上传方法
 * filePath: 上传的文件路径
 * fileName： 上传到cos后的文件名
 */
function download(fileUrl, me, callback) {
    console.log('fileUrl', fileUrl)
     cos.getObject({
        Bucket: 'wxss-1300917475',
        Region: 'ap-chongqing',
        Key: '1580971650000.jpg',
      
    }, function(err, data) {
        console.log(err || data);
        // var upload_res = JSON.parse(data)
        // var upload_res = data
        // me.setData({
        //     avator_path:data.location
        // })
        // console.log('upload_res', upload_res)
        if (err && err.error) {
            wx.showModal({
                title: '返回错误',
                content: '请求失败：' + (err.error.Message || err.error) + '；状态码：' + err.statusCode,
                showCancel: false
            });
        } else if (err) {
            wx.showModal({
                title: '请求出错',
                content: '请求出错：' + err + '；状态码：' + err.statusCode,
                showCancel: false
            });
        } else {
            wx.showToast({
                title: '请求成功',
                icon: 'success',
                duration: 3000
            });
        }
    });
};
module.exports = download