<template>
	<view> 
		<no-data v-if="!commentList || commentList.length <=0" desc="暂无评论"></no-data>
		<view v-else class="comment">
			<view class="comment-item" v-for="(item, index) in commentList" :key="index">
				<view class="info">
					<image mode="aspectFill" :src="item.userImage || '/static/tab/my.png'" ></image>
					<view class="user">
						<view>{{item.nickName}}</view>
						<view>{{ $utils.dateFormat(item.createDate) }}</view>
					</view>
					<text :class="{grey: !item.isGood}" class="iconfont icon-haoping2"></text>
				</view>
				<view class="content">
					{{item.content}}
				</view>
				<view class="replay" v-if="item.children && item.children.content">
					<text>讲师回复：</text>
					<text>{{item.children.content}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		commentList: {
			type: Array,
			default: ()=> [
				// {
				// 	"id": 1,
				// 	"nickName": "梦小员",
				// 	"userImage": null,
				// 	"isGood": 1, // 1好评，0差评
				// 	"content": "梦老师的课程内容好详细，值得学习！",
				// 	"createDate": Date.now(), // 为了兼容小程序，不能使用 new Date()
				// 	"children": null // 回复
				// },
				// {
				// 	"id": 2,
				// 	"nickName": "小黄",
				// 	"userImage": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F29%2F20210629134249_42bc8.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002",
				// 	"isGood": 0, // 1好评，0差评
				// 	"content": "加油梦老师！",
				// 	"createDate": '2008-12-12 09:09:09',
				// 	"children": {// 回复
				// 		"id": 3,
				// 		"nickName": "苍老师",
				// 		"userImage": null,
				// 		"content": "谢谢支持，梦学谷-陪你学习，伴你梦想。",
				// 		"createDate": '2008-12-13 08:09:09',
				// 	} 
				// }
			]
		}
	}
}
</script>

<style lang="scss">
.comment {
	font-size: 30rpx;
	padding: 0 36rpx;
	background-color: #fff;
	.comment-item {
		margin-top: 36rpx;
		border-bottom: $mxg-underLine;
		.info {
			display: flex;
			align-items: center;
			image {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50rpx;
				margin-right: 20rpx;
			}
			.user {
				font-weight: bold;
				line-height: 33rpx;
				:last-child {
					color: #999;
					font-size: 25rpx;
					font-weight: normal;
				}
			}
			:last-child {
				margin-left: auto;
				font-size: 35rpx;
				color: #ff001b;
			}
			.grey {
				color: $mxg-text-color-grey;
			}
		}
		
		.content {
			margin: 25rpx 0;
		}
		
		.replay {
			background-color: #F8F9FB;
			padding: 15rpx;
			border-radius: 10rpx;
			margin-bottom: 30rpx;
			color: #7d828f;
		}
	}
}
</style>
