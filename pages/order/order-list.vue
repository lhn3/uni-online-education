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
					<button @click="orderPay(item)" v-if="item.status === 1" style="background-color: #A2CD5A;color: #FFFFFF;" size="mini">立即支付</button>
					<button @click="orderDelete(item)" v-if="item.status === 3" type="warn" size="mini">删除订单</button>
				</view>
			</view>
		</view>
		
		<!-- <view v-if="isShow" class="mask" catchtouchmove="true" @touchmove.stop.prevent="()=>{}"></view> -->
<!-- 		<view v-if="isShow" class="bottom-ios" catchtouchmove="true" @touchmove.stop.prevent="()=>{}">
			<view class="title center">
				<text>确定支付</text>
				<text @click="showHidePay">取消</text>
			</view>
			<view class="price space-between">
				<text>支付金额</text>
				<text>{{order.priceDiscount || order.pricePayable}}</text>
			</view>
			<view class="price space-between">
				<text>当前余额</text>
				<text>{{balance}}</text>
			</view>
			<button  class="btn" type="default"
				:loading="loading" :disabled="loading"
				@click="iosPay"
			>
			{{isPay ? '立即支付': '余额不足，立即充值'}}
			</button>
		</view> -->
	</view>
</template>

<script>
import {getCurrentInstance,reactive,ref,onMounted} from "vue";
import {getOrderList,cancelOrder,deleteOrder} from '@/request/order-api.js'
export default {
	setup(){
		let {proxy} = getCurrentInstance()
		let orderList = ref([])//订单列表
		onMounted(async ()=>{
			orderList.value = await getOrderList()
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
		//支付订单
		const orderPay = (item)=>{
			console.log('支付订单')
		}
		return{
			orderList,
			
			orderCancel,
			orderDelete,
			orderPay
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
</style>
