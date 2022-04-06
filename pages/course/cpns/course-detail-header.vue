<template>
	<view class="course-header">
		<image class="img" :src="course.mainImage" lazy-load></image>
		<view class="header-info">
			<view class="price-info" >
				<text v-if="course.isFree">免费</text>
				<block v-else>
					<!-- 优惠价 -->
					<text v-if="course.priceDiscount">￥{{course.priceDiscount}}</text>
					<!--原价一直显示（有优惠价时显示price类名）-->
					<text :class="{price: course.priceDiscount}">￥{{course.priceOriginal}}</text>
					<text v-if="course.priceDiscount" class="youhui">优惠价</text>
				</block>
			</view>
			<view class="title">
				{{course.title}}
			</view>
			<view class="count">
				<text class="iconfont icon-haoping2">{{course.goodRate}}好评</text>
				<text class="iconfont icon-touxiang2">{{formatCount(course.studyTotal)}}人在学</text>
			</view>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick} from "vue";
import { onNavigationBarButtonTap } from '@dcloudio/uni-app';
import {formatCount} from '@/utils/format.js'
export default {
	props: {
		course: {
			type: Object, 
			default: ()=>({
				"id": 10,
				"title": "uni-app兼容多端在线教育视频教程",
				"studyTotal": 580,
				"goodRate": '100%', 
				"mainImage": '/static/images/banner5.jpg',
				"isFree": 0, // 0 付费，1免费
				"priceOriginal": 699.99, //原价
				"priceDiscount": 599.99, //优惠价
			})
		}
	},
	setup(){
		let {proxy} = getCurrentInstance()
		return{
			formatCount
		}
	}
}
</script>

<style lang="scss">
.course-header {
	.img {
		width: 750rpx;
		height: 420rpx;
	}
	.header-info {
		padding: 25rpx;
		background-color: #fff;
		border: 25rpx solid $mxg-color-grey;
		border-left: 0;
		border-right: 0;
	}
	.price-info {
		text {
			margin-right: 15rpx;
			&:first-child {
				color: $mxg-text-color-red;
				font-size: 46rpx;
				font-weight: bold;
			}
		}
		.price {
			color: #b6bbbf;
			font-size: 30rpx;
			text-decoration: line-through; // 删除线
		}
		.youhui {
			font-size: 20rpx;
			color: $mxg-text-color-red;
			border: 1px solid $mxg-text-color-red;
			border-radius: 10rpx;
			padding: 0 3rpx;
		}
	}
	
	.title {
		font-size: 35rpx;
		font-weight: bold;
		color: #1d1d1f;
		padding-left: 8rpx;
	}
	
	.count {
		padding: 15rpx 0;
		text {
			margin-right: 15rpx;
			font-size: 20rpx;
			color: #7d828f;
			background-color: $mxg-color-grey;
			padding: 15rpx;
			border-radius: 30rpx;
		}
	}
}
</style>



