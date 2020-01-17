//服务器地址
var url = 'http://172.16.17.171:3000' 
//腾讯云对象存储鉴权地址
var cosSignatureUrl = 
'https://wxss-1300917475.cos.ap-chongqing.myqcloud.com';
//腾讯云对象存储的区域：华东地区为sh
var cosRegion = 'ap-chongqing';
//腾讯云对象存储cos的APPID
var cosAPPID = '1300917475';
//腾讯云COSSecretId
var cosSecretId = '';
//腾讯云COSSecretKey
var cosSecretKey = '';
//bucket
var cosBucketName = 'wxss-1300917475';
//dir路径
var cosDirName = '';

module.exports = {
    url: url,
    cosSignatureUrl: cosSignatureUrl,
    cosRegion: cosRegion,
    cosAPPID: cosAPPID,
    cosBucketName: cosBucketName,
    cosDirName: cosDirName
}
