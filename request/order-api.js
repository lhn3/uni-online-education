import request from "./request.js"

//查询个人余额
const getBalance=()=>{
	return request({
		url:'/pay/user/balance',
	})
}

//支付
const orderPay=(data)=>{
	return request({
		url:'/pay',
		method:'POST',
		data
	})
}

//微信支付获取订单信息
const getWXOrderInfo=(data)=>{
	return request({
		url:'/pay/orferInfo/wxpay',
		method:'POST',
		data
	})
}

//微信支付获取订单信息
const getALOrderInfo=(data)=>{
	return request({
		url:'/pay/orderInfo/alipy',
		method:'POST',
		data
	})
}

//订单列表
const getOrderList=()=>{
	return request({
		url:'/pay/order/user',
		method:'POST'
	})
}

//取消订单
const cancelOrder=(orderId)=>{
	return request({
		url:'/pay/order/cancel/'+orderId,
		method:'PUT'
	})
}
//删除订单
const deleteOrder=(orderId)=>{
	return request({
		url:'/pay/order/delete/'+orderId,
		method:'DELETE'
	})
}


export {
	getBalance,
	orderPay,
	getWXOrderInfo,
	getALOrderInfo,
	getOrderList,
	cancelOrder,
	deleteOrder
	
}