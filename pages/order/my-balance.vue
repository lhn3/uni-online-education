<template>
<view>
		<view class="money column center">
			<text>余额：</text>
			<text>{{ parseFloat(balance).toFixed(2) }}币</text>
		</view>
		
		<view class="recharge">
			<view>充值：</view>
			<view class="list">
				<view :class="{active: index === activeIndex}" 
				v-for="(item, index) in moneyList" :key="index"
				@click="clickItem(index, item)"
				>
					<view>{{parseFloat(item).toFixed(2)}}币</view>
					<view>￥{{parseFloat(item).toFixed(2)}}</view>
				</view>
			</view>
		</view>
		
		<view class="desc">
			<view>充值说明：</view>
			<view>
				1.在IOS设备的APP要进行充值后，使用虚拟币消费。<br>
				2.充值后不能在非IOS设备使用，与安卓版和网站余额不通用。<br>
				3.充值后没有使用期限，但不可提现、退换、转让和申请发票。<br>
				4.如遇无法充值、充值失败等问题，可关注[梦学谷]公众号，联系我们解决。<br>
			</view>
		</view>
		
		<view class="bottom center">
			<button class="btn" :loading="loading" :disabled="loading"
				@click="iosPayHandler"
			>立即充值</button>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,toRefs,onMounted,computed,watch} from "vue";
import {getBalance,orderPay} from '@/request/course-api.js'
export default {
	setup(){
		let {proxy} = getCurrentInstance()
		let params = ref({})
		let balance = ref(0)		//我的余额
		let loading = ref(false)
		let activeIndex = ref(0)
		let selectBalance = ref(0) 
		let moneyList = ref([30,50,100,200,500])	//可充值的金额列表
		
		// 点击每一个充值金额
		const clickItem=(index,item)=>{
			activeIndex.value = index
			selectBalance.value = item
		}
		
		// 立即充值
		const iosPayHandler=()=>{
			loading.value = true 
			uni.showLoading({
				title:'充值中...',
				mask:true
			})
			setTimeout(()=>{
				proxy.$message.toast('充值成功','success')
				console.log(selectBalance.value)
				loading.value = false
				uni.hideLoading()
			},3000)
			
		}
		return{
			params,
			balance,
			loading,
			activeIndex,
			selectBalance,
			moneyList,
			
			clickItem,
			iosPayHandler
		}
		
	},
	async onLoad(option) {
		// 获取传递的参数
		this.params = JSON.parse(option.params)
		
		//
		this.init()
	},
	methods:{
		async init(){
			//获取自己剩余的金额
			this.balance = await getBalance()
			//计算需要充值的金额
			this.selectBalance = this.params.price - this.balance
			this.moneyList.unshift(this.selectBalance)
		}
	}
}
</script>

<style lang="scss">
.money{
	height: 288rpx;
	background-color: $mxg-color-primary;
	color: #FFFFFF;
	font-size: 88rpx;
	text:first-child{
		color: #e7e4e9;
		font-size: 30rpx;
	}
}
.recharge{
	margin: 20rpx 0 0 20rpx;
	font-size: 30rpx;
	color: #999999;
	.list {
		margin-top: 20rpx;
		text-align: center;
		>view {
			float: left;
			width: 225rpx;
			border: 1px solid $mxg-color-grey;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			margin-right: 10rpx;
			margin-bottom: 15rpx;
			padding: 20rpx 0;
			flex-wrap: wrap;
			view:first-child {
				color: $mxg-text-color-red;
				font-size: 36rpx;
			}
		}
	}
}

.active {
	box-shadow: 0 0 0 0.5px $mxg-text-color-red;
}

.desc {
	// 清除浮动
	clear: both;
	margin: 0 20rpx;
	font-size: 30rpx;
	line-height: 45rpx;
	color: #6e6d70;
	view:first-child {
		font-weight: bold;
		padding-top: 50rpx;
		padding-bottom: 30rpx;
	}
	view:last-child {
		padding-bottom: 120rpx;
	}
}

.bottom {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0; 
	height: 100rpx;
	background-color: #FFFFFF;
	border-top: $mxg-underLine;
	.btn {
		width: 700rpx;
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
