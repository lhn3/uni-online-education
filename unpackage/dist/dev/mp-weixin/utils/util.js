"use strict";
var common_vendor = require("../common/vendor.js");
const msg = (title = "", param = {}) => {
  if (!title)
    return;
  common_vendor.index.showToast({
    title,
    duration: param.duration || 1500,
    mask: param.mask || false,
    icon: param.icon || "none"
  });
};
const isLogin = (options = {}) => {
  const token = common_vendor.index.getStorageSync("mxgEducationToken");
  if (token) {
    return true;
  }
  if (options.nav !== false) {
    common_vendor.index.navigateTo({
      url: "/pages/auth/login"
    });
  }
  return false;
};
let _throttleRunning = false;
const throttle = (fn, delay = 500) => {
  if (_throttleRunning) {
    return;
  }
  _throttleRunning = true;
  setTimeout(() => {
    fn();
    _throttleRunning = false;
  }, delay);
};
const routePath = () => {
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  const query = page.options || page.$route.query;
  let queryStr = "";
  query && Object.keys(query).forEach((key) => {
    queryStr += `${key}=${query[key]}`;
  });
  return queryStr ? `${page.route}?${queryStr}` : page.route;
};
const checkStr = (str, type) => {
  switch (type) {
    case "mobile":
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
    case "tel":
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case "card":
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case "mobileCode":
      return /^[0-9]{6}$/.test(str);
    case "pwd":
      return /^([a-zA-Z0-9_]){6,18}$/.test(str);
    case "payPwd":
      return /^[0-9]{6}$/.test(str);
    case "postal":
      return /[1-9]\d{5}(?!\d)/.test(str);
    case "QQ":
      return /^[1-9][0-9]{4,9}$/.test(str);
    case "weixin":
      return /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(str);
    case "email":
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case "money":
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    case "URL":
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
    case "IP":
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
    case "date":
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
    case "number":
      return /^[0-9]$/.test(str);
    case "english":
      return /^[a-zA-Z]+$/.test(str);
    case "chinese":
      return /^[\\u4E00-\\u9FA5]+$/.test(str);
    case "lower":
      return /^[a-z]+$/.test(str);
    case "upper":
      return /^[A-Z]+$/.test(str);
    case "HTML":
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    default:
      return true;
  }
};
const dateFormat = (date) => {
  if (!date)
    return "";
  let $this = new Date(date) == "Invalid Date" ? new Date(date.replace(/-/g, "/")) : new Date(date);
  var timestamp = parseInt(Date.parse($this)) / 1e3;
  function zeroize(num) {
    return (String(num).length == 1 ? "0" : "") + num;
  }
  var curTimestamp = parseInt(new Date().getTime() / 1e3);
  var timestampDiff = curTimestamp - timestamp;
  var curDate = new Date(curTimestamp * 1e3);
  var tmDate = new Date(timestamp * 1e3);
  var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
  var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();
  if (timestampDiff < 60) {
    return "\u521A\u521A";
  } else if (timestampDiff < 3600) {
    return Math.floor(timestampDiff / 60) + "\u5206\u949F\u524D";
  } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
    return "\u4ECA\u5929 " + zeroize(H) + ":" + zeroize(i) + ":" + zeroize(s);
  } else {
    var newDate = new Date((curTimestamp - 86400) * 1e3);
    if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
      return "\u6628\u5929 " + zeroize(H) + ":" + zeroize(i) + ":" + zeroize(s);
    } else if (curDate.getFullYear() == Y) {
      return zeroize(m) + "\u6708" + zeroize(d) + "\u65E5";
    } else {
      return Y + "\u5E74" + zeroize(m) + "\u6708" + zeroize(d) + "\u65E5";
    }
  }
};
function format(date, format2 = "yyyy-MM-dd hh:mm:ss") {
  if (!date)
    return "";
  let $this = new Date(date) == "Invalid Date" ? new Date(date.substr(0, 19)) : new Date(date);
  let o = {
    "M+": $this.getMonth() + 1,
    "d+": $this.getDate(),
    "h+": $this.getHours(),
    "m+": $this.getMinutes(),
    "s+": $this.getSeconds(),
    "q+": Math.floor(($this.getMonth() + 3) / 3),
    "S": $this.getMilliseconds()
  };
  if (/(y+)/.test(format2)) {
    format2 = format2.replace(RegExp.$1, ($this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format2)) {
      format2 = format2.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format2;
}
var utils = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  msg,
  isLogin,
  throttle,
  routePath,
  checkStr,
  dateFormat,
  format
});
exports.utils = utils;
