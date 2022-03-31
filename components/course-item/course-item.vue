<template>
	<view class="course-item">
		<view class="item-left">
			<image class="course-img" src="../../static/images/banner1.jpg"></image>
			<view class="course-time">{{formatCount(123456)}}</view>
		</view>
		<view class="item-right">
			<view class="title">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
			<view class="info">
				<view class="nickname iconfont icon-laoshi2">老师</view>
				<view class="count">
					<view class="money" v-if="false">免费</view>
					<view class="money iconfont icon-moneybag" v-else>199.9</view>
					<view class="iconfont icon-video">10人在学</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance} from "vue";
import { onShow,onReady } from '@dcloudio/uni-app';
import {formatCount} from '@/utils/format.js'
export default {
	setup(){
		return{
			formatCount	
		}
	}
}
</script>

<style lang="scss">
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
			max-width: 290rpx;
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
