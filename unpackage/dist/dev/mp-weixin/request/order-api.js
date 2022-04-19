"use strict";
var request_request = require("./request.js");
const getBalance = () => {
  return request_request.request({
    url: "/pay/user/balance"
  });
};
const orderPay = (data) => {
  return request_request.request({
    url: "/pay",
    method: "POST",
    data
  });
};
const getWXOrderInfo = (data) => {
  return request_request.request({
    url: "/pay/orferInfo/wxpay",
    method: "POST",
    data
  });
};
const getALOrderInfo = (data) => {
  return request_request.request({
    url: "/pay/orderInfo/alipy",
    method: "POST",
    data
  });
};
const getOrderList = () => {
  return request_request.request({
    url: "/pay/order/user",
    method: "POST"
  });
};
const cancelOrder = (orderId) => {
  return request_request.request({
    url: "/pay/order/cancel/" + orderId,
    method: "PUT"
  });
};
const deleteOrder = (orderId) => {
  return request_request.request({
    url: "/pay/order/delete/" + orderId,
    method: "DELETE"
  });
};
exports.cancelOrder = cancelOrder;
exports.deleteOrder = deleteOrder;
exports.getALOrderInfo = getALOrderInfo;
exports.getBalance = getBalance;
exports.getOrderList = getOrderList;
exports.getWXOrderInfo = getWXOrderInfo;
exports.orderPay = orderPay;
