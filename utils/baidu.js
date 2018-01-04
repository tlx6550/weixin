//http://lbsyun.baidu.com/index.php?title=wxjsapi/guide/helloworld
'use strict';

var URI = 'https://api.map.baidu.com';
var fetch = require('./fetch');

function fetchApi(type, params) {
  return fetch(URI, type, params);
}

/**
 * http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
 * 逆地理编码
 * http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=39.934,116.329&output=json&pois=1&ak=您的ak //GET请求
 * 根据经纬度获取城市
 * @param  {Number} latitude   经度
 * @param  {Number} longitude  纬度
 * @return {Promise}       包含抓取任务的Promise
 */
function getCityName() {
  var latitude = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 39.90403;
  var longitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 116.407526;

  var params = { location: latitude + ',' + longitude, output: 'json', ak: 'nVuAhvyCb8mf87KvuS8XKCV4epnEPdVT' };
  return fetchApi('geocoder/v2/', params).then(function (res) {
    return res.data.result.addressComponent.city;
  });
}

module.exports = { getCityName: getCityName };
//# sourceMappingURL=baidu.js.map
