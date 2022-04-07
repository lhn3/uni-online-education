<template>
	<view>
		<no-data v-if="!groupList || groupList.length<=0" desc="暂无套餐"></no-data>
		<view v-else class="group-list">
			<!-- elevation 主要解决 nvue 文件中的android设备的阴影问题 -->
			<view class="group-item" elevation="12px" v-for="(item, index) in groupList" :key="index">
				<text class="title">{{item.title}}</text>
				<course-item v-for="(info, i) in item.list" :key="i" :item="info"></course-item>
				<view class="price-box space-between center">
					<view class="price">
						<text class="group-price">￥{{item.groupPrice}}</text>
						<text class="total-price">￥{{item.totalPrice}}</text>
					</view>
					<text class="buy" @click="buyGroupHandler(item)">购买套餐</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import groupData from '@/mock/courseGroupData.js'
export default {
	props: {
		groupList: {
			type: Array,
			// default: () => groupData
			default: () => []
		}
	},
	setup(){
		let buyGroupHandler=(item)=>{
			console.log(item)
		}
		return{
			buyGroupHandler
		}
		
	}
}
</script>

<style lang="scss">
.group-item {
	margin: 30rpx;
	background-color: #fff;
	border-radius: 20rpx;
	box-shadow: 2px 0 10px 0 rgba(0,0,0, 0.1);
	padding: 0 20rpx;
	
	.title {
		font-size: 35rpx;
		font-weight: 500;
		line-height: 70rpx;
		font-weight: 700;
	}
	
	.price-box {
		color: $mxg-text-color-red;
		font-size: 30rpx;
		line-height: 80rpx;
		font-weight: bold;
		.group-price {
			font-size: 37rpx;
			margin-right: 10rpx;
		}
		.total-price {
			color: #999;
			font-weight: normal;
			text-decoration: line-through;
		}
	}
}
</style>
