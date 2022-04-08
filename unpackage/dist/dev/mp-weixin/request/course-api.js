"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var request_request = require("./request.js");
const getBanners = (position = 1) => {
  return request_request.request({
    url: "/article/api/advert/show/" + position
  });
};
const getCategory = () => {
  return request_request.request({
    url: "/article/api/category/label/list"
  });
};
const getCourseList = (query, current = 1, size = 10) => {
  return request_request.request({
    method: "POST",
    url: "/course/api/course/search",
    data: __spreadProps(__spreadValues({}, query), { current, size })
  });
};
const getCourseDetail = (id) => {
  return request_request.request({
    url: "/course/api/course/" + id
  });
};
const getCourseSection = (id) => {
  return request_request.request({
    url: "/course/api/chapter/section/list/" + id
  });
};
const getCourseComment = (id) => {
  return request_request.request({
    url: "/course/api/commont/ist/" + id
  });
};
const getCoursePackage = (id) => {
  return request_request.request({
    url: "/course/api/group/list/" + id
  });
};
exports.getBanners = getBanners;
exports.getCategory = getCategory;
exports.getCourseComment = getCourseComment;
exports.getCourseDetail = getCourseDetail;
exports.getCourseList = getCourseList;
exports.getCoursePackage = getCoursePackage;
exports.getCourseSection = getCourseSection;
