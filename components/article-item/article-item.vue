<template>
	<view class="article-item" @click="navTo(`/pages/article/details?id=${item.id}`)">
		<view class="article-content row">
			<view class="left-text column">
				<text class="title text-ellipsis">{{item.title}}</text>
				<text class="summary text-ellipsis">{{item.summary}}</text>
			</view>
			<view class="right-image" v-if="item.imageUrl">
				<image :src="item.imageUrl" lazy-load></image>
			</view>
		</view>
		<view class="article-info">
			<text>{{item.nickName}}</text>
			<text> · {{ this.$utils.dateFormat(item.updateDate) }}</text>
			<text> · {{formatCount(item.thumhup)}} 赞</text>
		</view>
	</view>
</template>

<script>
import {formatCount} from '@/utils/format.js'
export default {
	props: {
		item: {
			type: Object,
			default: ()=> ({
				id: 10,
				userId: 1,
				nickName: "武艳",
				title: "导效今海住先八程统周住花。",
				summary: "百这老之处度委东平太象程线车提种中儿克又王件造使例直权集许转酸第作人下属机消且适只按员条道酸并强种统由干根即之水权标会计斗所不长口住明真北第除明等斯门权。",
				imageUrl: "https://img.alicdn.com/bao/uploaded/i2/3603079088/O1CN01rGCkfb2H0M1O7Lj45_!!0-item_pic.jpg",
				viewCount: 96320,
				thumhup: 98438,
				updateDate: new Date()
			})
		}
	},
	setup(){
		return{
			formatCount
		}
	}
}	
</script>

<style lang="scss">
.text-ellipsis {
	overflow: hidden;
	text-overflow: ellipsis; //显示省略号
	-webkit-line-clamp: 2; //最多2行
	display: -webkit-box;
	-webkit-box-orient: vertical;
	white-space: normal;
}

.article-item {
	padding: 30rpx;
	border-bottom: 1rpx solid #f1f1f1;
	.article-content {
		.left-text {
			.title {
				font-size: 35rpx;
				font-weight: bold;
			}
			.summary {
				padding-top: 5rpx;
				font-size: 26rpx;
				color: #999;
				-webkit-line-clamp: 1; //最多1行
			}
		}
		.right-image {
			min-width: 220rpx;
			margin-left: 5rpx;
			image {
				width: 220rpx;
				height: 140rpx;
				border-radius: 10rpx;
			}
		}
	}
	.article-info {
		display: flex;
		justify-content: space-around;
		text {
			font-size: 26rpx;
			color: #999;
			padding-right: 10rpx;
			&:first-child {
				color: #222222;
			}
		}
	}
}

</style>
