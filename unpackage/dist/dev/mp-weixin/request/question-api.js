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
const getQuestionList = (query, current = 1, size = 10) => {
  return request_request.request({
    method: "POST",
    url: "/question/api/question/search",
    data: __spreadProps(__spreadValues({}, query), { current, size })
  });
};
const getHotQuestionList = (current = 1, size = 10) => {
  return request_request.request({
    method: "POST",
    url: "/question/api/question/hot",
    data: { current, size }
  });
};
const getNewQuestionList = (current = 1, size = 10) => {
  return request_request.request({
    method: "POST",
    url: "/question/api/question/new",
    data: { current, size }
  });
};
const getWaitQuestionList = (current = 1, size = 10) => {
  return request_request.request({
    method: "POST",
    url: "/question/api/question/wait",
    data: { current, size }
  });
};
const getQuestionDetail = (id) => {
  return request_request.request({
    url: "/question/api/question/" + id
  });
};
const getQuestionAnswerList = (id) => {
  return request_request.request({
    url: "/question/api/reply/list/" + id
  });
};
const addQuestionAnswer = (data) => {
  return request_request.request({
    method: "POST",
    url: "/question/reply",
    data
  });
};
const focusQuestion = (id) => {
  return request_request.request({
    method: "PUT",
    url: "/question/question/star/" + id
  });
};
exports.addQuestionAnswer = addQuestionAnswer;
exports.focusQuestion = focusQuestion;
exports.getHotQuestionList = getHotQuestionList;
exports.getNewQuestionList = getNewQuestionList;
exports.getQuestionAnswerList = getQuestionAnswerList;
exports.getQuestionDetail = getQuestionDetail;
exports.getQuestionList = getQuestionList;
exports.getWaitQuestionList = getWaitQuestionList;
