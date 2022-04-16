<template>
	<view>
		<view class="order-item" v-for="(item, index) in orderList" :key="index">
			<view class="base-info">
				<text>{{item.updateDate}}</text>
				<text>订单号：{{item.orderId}}</text>
			</view>
			<course-item 
				v-for="(course, index2) in item.courseList" 
				:key="index2" :item="course"
			>
			</course-item>
			<view class="shifu">
				<text>实付：</text>
				<text>￥{{item.priceDiscount || item.pricePayable}}</text>
			</view>
			
			<view class="option center space-between">
				<!-- 订单状态：1待支付，2交易成功，3交易关闭 -->
				<text class="red" v-if="item.status === 1">待支付</text>
				<text class="grey" v-if="item.status === 3">交易关闭</text>
				<text class="grey" v-if="item.status === 2">交易成功</text> 
				<view>
					<!-- 
					 1待支付: 取消订单/立即支付
					 2交易成功: 不显任何按钮
					 3交易关闭:显示删除按钮
					 -->
					<button @click="orderCancel(item)" v-if="item.status === 1" type="default" size="mini">取消订单</button>
					<button @click="orderPayBtn(item)" v-if="item.status === 1" style="background-color: #A2CD5A;color: #FFFFFF;" size="mini">立即支付</button>
					<button @click="orderDelete(item)" v-if="item.status === 3" type="warn" size="mini">删除订单</button>
				</view>
			</view>
		</view> 
		
		<!-- 底部弹窗 -->
		<view v-if="isShow" class="mask" :catchtouchmove="true" @touchmove.stop.prevent="()=>{}"></view>
		<view v-if="isShow" class="bottom-ios" :catchtouchmove="true" @touchmove.stop.prevent="()=>{}">
			<view class="title center">
				<text>确定支付</text>
				<text @click="showHidePay">取消</text>
			</view>
			<view class="price space-between">
				<text>支付金额</text>
				<text>￥{{price}}</text>
			</view>
			
			<radio-group @change="radioChange">
				<!-- ISO端显示三种支付方式，h5显示两种支付方式，微信小程序显示一种支付方式 -->
				 <!-- #ifdef APP-PLUS -->
				 <label v-if="isIos" class="pay-item center space-between" >
					<view class="ios">
						<text>余额：</text>
						<text>{{balance}}币{{canPay?'':'(余额不足)'}}</text>
					</view>
				 	<radio value="iospay" :checked="payStyle == 'iospay'" style="transform:scale(0.8)"/>
				 </label>
				 <!-- #endif -->
				 
				 <!-- #ifndef MP-ALIPAY -->
				 <label class="pay-item center space-between" >
				 	<view class="left center">
				 		<image src="/static/pay/wxpay.png"></image>
				 		<text>微信支付</text>
				 	</view>
				 	<radio value="wxpay" :checked="payStyle == 'wxpay'" style="transform:scale(0.8)"/>
				 </label>
				 <!-- #endif -->
				 
				 <!-- #ifndef MP-WEIXIN -->
				 <label class="pay-item center space-between" >
				 	<view class="left center">
				 		<image src="/static/pay/alipay.png"></image>
				 		<text>支付宝</text>
				 	</view>
				 	<radio value="alipay" :checked="payStyle == 'alipay'" style="transform:scale(0.8)"/>
				 </label>
				 <!-- #endif -->
			</radio-group>
			
			<button v-if="payStyle == 'iospay'" class="btn" :loading="loading" :disabled="loading" @click="iosPayHandler">
				{{canPay?'立即支付':'充值并支付'}}
			</button>
			<button v-if="payStyle == 'wxpay' || payStyle == 'alipay'" class="btn" :loading="loading" :disabled="loading" @click="payHandler">立即支付</button>
			<button v-if="payStyle == null" class="btn" style="background-color: #eee;" :disabled="true">立即支付</button>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,reactive,ref,onMounted,computed} from "vue";
import {getOrderList,getBalance,cancelOrder,deleteOrder,orderPay,getWXOrderInfo,getALOrderInfo} from '@/request/order-api.js'
export default {
	setup(){
		let {proxy} = getCurrentInstance()
		let orderList = ref([])		//订单列表
		let isShow = ref(false)
		let balance = ref(0)		//剩余余额
		let clickItem = ref(null)	//点击的这个待付课程
		let price = ref(0)			//点击支付按钮的那个订单价格
		let loading = ref(false)
		let isIos = ref(false) 		//操作系统
		let payStyle = ref(null)	//支付方式

		onMounted(async ()=>{
			// 判断是否是ios系统
			// #ifdef APP-PLUS
			let sys = uni.getSystemInfoSync().platform
			if(sys == 'ios'){
				isIos.value = true
			}
			// #endif
			//初始化默认支付方式
			if(isIos.value){
				payStyle.value = 'iospay'
			}else{
				payStyle.value = 'wxpay'
			}
			
			orderList.value = await getOrderList()
		})
		
		//判断余额是否充足
		let canPay = computed(() => parseFloat(balance.value) >= parseFloat(price.value))
		//所有课程的id
		let courseIds = computed(() => {
			let courseIdList = []
			if(clickItem.value.courseList){
				clickItem.value.courseList.forEach(item=>{
					courseIdList.push(item.id)
				})
			}
			return courseIdList
		})
		
		// 取消订单
		const orderCancel = (item)=>{
			proxy.$message.confirm('确定取消订单').then(async ()=>{
				await cancelOrder(item.id)
				// 取消后应该重新调用请求订单接口
				// orderList.value = await getOrderList()
				
				item.status=3
				proxy.$message.toast('取消成功','success')
			})
		}
		
		// 删除订单
		const orderDelete = (item)=>{
			proxy.$message.confirm('确定删除订单').then(async ()=>{
				await deleteOrder(item.id)
				// 删除后应该重新调用请求订单接口
				// orderList.value = await getOrderList()
				
				orderList.value.splice(orderList.value.indexOf(item),1)
				proxy.$message.toast('删除成功','success')
			})

		}
		
		//点击支付订单按钮
		const orderPayBtn = async (item)=>{
			if(isIos.value){
				loading.value = true
				balance.value = await getBalance()
				loading.value = false
			}
			isShow.value = true
			clickItem.value = item
			price.value = item.priceDiscount || item.pricePayable
		}
		
		//取消支付
		const showHidePay = ()=>{
			isShow.value = false
		}
		
		//选择不同支付方式
		let radioChange = (e) => {
			payStyle.value=e.detail.value
		}
		
		//假装支付
		const XuNiPay= async (data)=>{
			loading.value=true
			uni.showLoading({
				title:"支付中...",
				mask:true
			})
			let res = await orderPay(data)
			setTimeout(()=>{
				uni.hideLoading() 
				loading.value=false
				isShow.value = false
				if(res.code == 200){
					// 数据重新获取
					// orderList.value = await getOrderList()
					
					clickItem.value.status = 2
					proxy.$message.toast('支付成功','success')
				}else{
					proxy.$message.toast('支付失败','error')
				}
			},2000)
		}
		
		//苹果支付
		const iosPayHandler = ()=>{
			if(canPay.value){
				XuNiPay(courseIds.value)
			}else{
				proxy.navTo('/pages/order/my-balance?params='+JSON.stringify({price:price.value}))
			}
		}
		
		// 微信/支付宝支付
		const payHandler = async () => {
			loading.value = true
			//1获取支付信息----------
			let res = null
			if(payStyle.value == 'wxpay'){
				res = await getWXOrderInfo(courseIds.value)
			}else if(payStyle.value == 'alipay'){
				res = await getALOrderInfo(courseIds.value)
			}
			//2发送支付请求----------
			// H5小程序发送虚拟支付
			// #ifndef APP-PLUS
			XuNiPay(courseIds.value)
			// #endif
			
			//app调用相应的供应商接口
			// #ifdef APP-PLUS
			uni.requestPayment({
				provider:payStyle.value,	//支付供应商
				orderInfo:res,				//支付信息
				success: (e) => {
					uni.showModal({
						content:'支付成功', 
						showCancel:false
					})
					// 数据重新获取
					// orderList.value = await getOrderList()
					
					clickItem.value.status = 2
				},
				fail: (err) => {
					uni.showModal({
						content:'支付失败',
						showCancel:false
					})
				},
				complete: () => {
					isShow.value = false
					loading.value = false
				}
			})
			// #endif
		}
		return{
			orderList,
			isShow,
			balance,
			price,
			loading,
			canPay,
			isIos,
			payStyle,
			
			orderCancel,
			orderDelete,
			orderPayBtn,
			showHidePay,
			radioChange,
			iosPayHandler,
			payHandler
		}
	}  
}
</script>

<style lang="scss">
.order-item {
	background-color: #FFFFFF;
	padding: 20rpx 30rpx;
	margin-bottom: 20rpx;
	font-size: 25rpx;
	border-bottom: $mxg-underLine;
	.base-info {
		color: $mxg-text-color-black;
		display: flex;
		justify-content: space-between;
		font-weight: 500;
	}
	.shifu {
		text-align: right;
		line-height: 70rpx;
		text:last-child {
			font-size: 35rpx;
			color: $mxg-text-color-red;
		}
	}
	
	.option {
		button {
			font-size: 20rpx;
			margin-left: 10rpx;
		}
		.red {
			color: $mxg-text-color-red;
		}
		.grey {
			color: $mxg-text-color-grey;
		}
	}
}

.bottom-ios {
	z-index: 100;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #FFFFFF;
	padding: 30rpx 40rpx;
	border-top: $mxg-underLine;
	
	.title {
		font-size: 38rpx;
		margin-bottom: 20rpx;
		text-align: center;
		text:first-child {
			flex: 1;
			margin-left: 70rpx;
		}
		text:last-child {
			color: $mxg-text-color-grey;
			font-size: 35rpx;
		}
	}
	
	.price {
		font-size: 30rpx;
		line-height: 90rpx;
		text:last-child {
			color: $mxg-text-color-red;
		}
	}
	
	.btn {
		background-color: $mxg-color-primary;
		color: #FFFFFF;
		border-radius: 50rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		margin-top: 30rpx;
		&::after {
			// 加载中隐藏边框
			border: none;
		}
	}
}
.ios {
	line-height: 90rpx;
	text:last-child{
		color: $mxg-text-color-red;
	}
}
.pay-item {
	line-height: 90rpx;
	.left {
		image {
			width: 60rpx;
			height: 60rpx;
		}
		text{
			font-size: 33rpx;
			padding-left: 20rpx;
		}
	}
	
}
</style>
