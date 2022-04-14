<template>
	<view class="confirm-order">
		<view class="goods">
			<text>商品信息</text>
			<tempalte v-if="detail.list">
				<course-item v-for="item in detail.list"  :item="item" ></course-item>
			</tempalte>
			<course-item v-else  :item="detail"></course-item>
		</view>
		<view class="option-pay card">
			<view class="title">支付方式</view>
			<!-- APP端的IOS设备上显示 -->
			<view v-if="isIos" class="ios">
				<text>余额：</text>
				<text>{{balance}}币{{canPay?'':'(余额不足)'}}</text>
			</view>
			<!-- 非APP端的IOS设备上显示 -->
			<radio-group v-else @change="radioChange">
				<!-- 微信小程序只显示微信支付 -->
				<!-- 支付宝小程序只显示支付宝支付 -->
				
				 <!-- #ifndef MP-WEIXIN -->
				 <label class="pay-item center space-between" >
				 	<view class="left center">
				 		<image src="/static/pay/alipay.png"></image>
				 		<text>支付宝</text>
				 	</view>
				 	<radio value="alipay" style="transform:scale(0.8)"/>
				 </label>
				 <!-- #endif -->
				 
				 <!-- #ifndef MP-ALIPAY -->
				<label class="pay-item center space-between" >
					<view class="left center">
						<image src="/static/pay/wxpay.png"></image>
						<text>微信支付</text>
					</view>
					<radio value="wxpay" style="transform:scale(0.8)"/>
				</label>
				<!-- #endif -->
			</radio-group>
		</view>
		
		<view class="card price">
			<view class="space-between">
				<text>商品金额</text>
				<!-- 原价或套餐总原价 -->
				<text>￥{{detail.priceOriginal || detail.totalPrice}}</text>
			</view>
			<view class="space-between" v-if="detail.priceDiscount || detail.groupPrice">
				<text>优惠价</text>
				<!-- 优惠价或套餐组合价 -->
				<text>￥{{detail.priceDiscount || detail.groupPrice}}</text>
			</view>
		</view>
		<!-- 占位底部 -->
		<view style="height: 130rpx;"></view>
		
		<view class="pay space-between">
			<view>
				<text class="grey">实付金额：</text>
				<text>￥{{price}}</text>
			</view>
			<view>
				<button v-if="isIos" class="btn" :loading="loading" :disabled="loading" @click="iosPayHandler">
					{{canPay?'立即支付':'充值并支付'}}
				</button>
				<view v-else>
					<button v-if="payStyle == 'wxpay'" class="btn" :loading="loading" :disabled="loading" @click="wxPayHandler">微信支付</button>
					<button v-if="payStyle == 'alipay'" class="btn" :loading="loading" :disabled="loading" @click="payHandler">支付宝支付</button>
					<button v-if="payStyle == null" class="btn" style="background-color: #eee;" :disabled="true">立即支付</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script> 
import {getCurrentInstance,ref,reactive,toRefs,onMounted,computed,watch} from "vue";
import coursePackage from '@/pages/course/cpns/course-package.vue'
import {getBalance,orderPay} from '@/request/course-api.js'
export default {
	components:{
		'course-package':coursePackage,
	},
	setup(){
		let {proxy} = getCurrentInstance()
		let detail = ref({})		//课程信息
		let loading = ref(false)
		let isIos = ref(false) 		//操作系统
		let payStyle = ref(null)	//支付方式
		let balance = ref()			//账户余额
		//计算实付金额
		let price = computed(() => detail.value.priceDiscount || detail.value.groupPrice || detail.value.priceOriginal || detail.value.totalPrice)
		//判断余额是否充足
		let canPay = computed(() => parseFloat(balance.value) >= parseFloat(price.value))
		//所有课程的id
		let courseIds = computed(() => {
			let courseIdList = []
			if(detail.value.list){
				detail.value.list.forEach(item=>{
					courseIdList.push(item.id)
				})
			}else{
				courseIdList.push(detail.value.id)
			}
			return courseIdList
		})
		
		//小程序：devtools
		//苹果：ios
		onMounted(()=>{
			// 判断是否是ios系统
			// #ifdef APP-PLUS
			let sys = uni.getSystemInfoSync().platform
			if(sys == 'ios'){
				isIos.value = true
			}
			// #endif
		})
		
		//选择不同支付方式
		let radioChange = (e) => {
			payStyle.value=e.detail.value
		} 
		
		//苹果支付
		const iosPayHandler = async () => {
			console.log('苹果支付')
			//传递后端数据
			let data = {price:price.value,courseIds:courseIds.value}
			if(canPay.value){
				//直接支付
				loading.value=true
				uni.showLoading({
					title:"支付中...",
					mask:true
				})
				let res = await orderPay(data)
				setTimeout(()=>{
					uni.hideLoading() 
					loading.value=false
					if(res.code == 200){
						uni.showModal({
							content:'支付成功，立即学习', 
							showCancel:true,
							success: (e) => {
								//确定就跳转到课程详情页
								if(e.confirm){ 
									uni.redirectTo({url:'/pages/course/course-details?id='+detail.value.id})
								}else{
									// 取消就跳转到订单页
									console.log('订单页')
									// uni.redirectTo({url:''})
								}
							}
						})
					}else{
						proxy.$message.toast('支付失败','error')
					}
				},2000)
			}else{
				//前往充值
				proxy.navTo(`/pages/order/my-balance?params=${JSON.stringify(data)}`)
			}
		} 
		
		const wxPayHandler = () => {
			console.log('微信支付')
		}
		
		const payHandler = () => {
			console.log('支付宝支付')
		}
		return{
			detail,
			loading,
			isIos,
			payStyle,
			price,
			balance,
			canPay,
			
			radioChange,
			iosPayHandler,
			wxPayHandler,
			payHandler
		}
	},
	async onLoad(option) {
		// #ifdef MP-WEIXIN
		// this.detail=JSON.parse(decodeURIComponent(option.detail))
		this.detail=JSON.parse(option.detail)
		// #endif
		//APP端和H5端需要替换%
		// #ifndef MP-WEIXIN
		// this.detail=JSON.parse(decodeURIComponent(option.detail.replace(/%/g,'%25')))
		this.detail=JSON.parse(option.detail)
		// #endif
		
		//查询个人余额
		this.balance = await getBalance()
	},
}
</script>

<style lang="scss">
.confirm-order {
	font-size: 29rpx;
	color: #333;
}
.goods {
	padding: 20rpx 30rpx 0 30rpx;
	background-color: #FFFFFF;
}

.card {
	padding: 0 30rpx;
	background-color: #FFFFFF;
	margin-top: 30rpx;
	box-shadow: 1px 0 5px 0 rgba(0,0,0, 0.08);
	border-radius: 20rpx;
}
.option-pay {
	.title {
		line-height: 90rpx;
		border-bottom: $mxg-underLine;
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
}

.price {
	>view {
		line-height: 90rpx;
		border-bottom: 1px solid #F8F9FB;
	}
}

.pay {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	align-items: center;
	height: 100rpx;
	padding: 0 30rpx;
	background-color: #FFFFFF;
	border-top: $mxg-underLine;
	view:first-child >text:last-child {
		color: $mxg-text-color-red;
		font-size: 35rpx;
	}
	.btn {
		background-color: $mxg-color-primary;
		color: #FFFFFF;
		border-radius: 50rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		&::after {
			// 加载中隐藏边框
			border: none;
		}
	}
}

</style>
