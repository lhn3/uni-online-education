<template>
	<view class="course-item" :class="{'column':isColumn}">
		<view class="item-left">
			<image class="course-img" :src="item.mainImage"></image>
			<view class="course-time">{{item.totalTime}}</view>
		</view>
		<view class="item-right">
			<view class="title">{{item.title}}</view>
			<view class="info">
				<view class="nickname iconfont icon-laoshi2">{{item.nickName}}</view>
				<view class="count">
					<view class="money" v-if="item.isFree">免费</view>
					<view class="money iconfont icon-moneybag" v-else>
						{{item.priceDiscount || item.priceOriginal}}
					</view>
					<view class="iconfont icon-video">{{item.studyTotal}} 人在学</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance} from "vue";
import { onShow,onReady } from '@dcloudio/uni-app';
export default {
	props:{
		isColumn:{
			type:Boolean,
			default:false
		},
		item:{
			type:Object,
			default:()=>({
				id:1,
				title:'默认标题',
				mainImage:'../../static/images/banner1.jpg',
				totalTime:123456,
				nickName:'苍老师',
				isFree:0,
				priceDiscount:99,
				priceOriginal:198,
				studyTotal:100
			})
		}
	},
	setup(){
	}
}
</script>

<style lang="scss">
.column{
	flex-direction: column;
}
.course-item {
	display: flex;
	// 纵向排列
	// flex-direction: column;
	width: 100%;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f1f1f1;
	.item-left {
		position: relative;
		width: 290rpx;
		height: 160rpx;
		margin-right: 20rpx;
		.course-img {
			width: 290rpx;
			height: 160rpx;
			border-radius: 10rpx;
		}
		.course-time {
			position: absolute;
			bottom: 5rpx;
			right: 5rpx;
			font-size: 22rpx;
			color: #fff;
			background: rgba(51, 51, 51, 0.4);
			border-radius: 20rpx;
			padding: 0 8rpx;
		}
	}
	
	.item-right {
		// display: flex;
		// flex-direction: column;
		justify-content: space-between;
		height: 160rpx;
		padding-top: 5rpx;
		padding-left: 5rpx;
		.title {
			max-width: 365rpx;
			height: 70rpx;
			line-height: 35rpx;
			font-size: 28rpx;
			font-weight: bold;
			// 显示两行，超出部分…显示
			overflow: hidden;
			text-overflow: ellipsis; //显示省略号
			-webkit-line-clamp: 2; //最多2行
			display: -webkit-box;
			-webkit-box-orient: vertical;
			white-space: normal;
		}
		.info {
			.nickname {
				font-size: 23rpx;
				color: #999;
			}
				
			.count {
				display: flex;
				align-items: center;
				.iconfont {
					font-size: 23rpx;
					color: #222222;
				}
				.money {
					color: $mxg-color-orange;
					width: 130rpx;
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>
