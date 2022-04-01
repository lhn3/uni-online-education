<template>
	<view class="category-box">
		<view v-for="item in categoryList.slice(0,7)" :key="item.id">
			{{item.name}}
		</view>
		<view>全部分类</view>
	</view>
</template>

<script>
import {getCurrentInstance} from "vue";
import { onShow,onReady } from '@dcloudio/uni-app';
export default {	
	props:{
		categoryList:{
			type:Array,
			default:()=>[
				// {id:1,name:'java'},
				// {id:2,name:'运维'},
				// {id:3,name:'Python'},
				// {id:4,name:'UI设计'},
				// {id:5,name:'大数据'},
				// {id:6,name:'前端'},
				// {id:7,name:'PHP'},
				// {id:8,name:'Vue'}
			]
		}
	},
	setup(){
		
	}
}
</script>
<style lang="scss">
.category-box {
	display: flex;
	justify-content: space-around;
	// 不行显示不下，自动换行
	flex-wrap: wrap;
	// 上 右 下 左
	padding: 20rpx 30rpx 0 30rpx;
	>view {
		width: 160rpx;
		height: 70rpx;
		background-color: $mxg-color-grey;
		text-align: center;
		line-height: 70rpx;
		font-size: 26rpx;
		border-radius: 20rpx;
		overflow: hidden;
		margin-top: 15rpx;
	}
}
</style>
