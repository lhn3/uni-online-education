<template>
	<!-- 带头部的插槽组件 -->
	<list-box :title="title" :word="word" :all="all">
		<scroll-view scroll-x class="list-scroll noScorll">
			<view class="list-scroll-view" v-for="item in courseData.slice(0,6)" :key="item.id">
				<course-item :isColumn="true" :item="item"></course-item>
			</view>
		</scroll-view>
	</list-box>
</template>

<script>
import {getCurrentInstance} from "vue";
import { onShow,onReady } from '@dcloudio/uni-app';
export default {
	props:{
		title:{
			type:String,
			default:'默认标题',
			},
		word:{
			type:String,
			default:''
		},
		all:{
			type:Boolean,
			default:false
		},
		courseData:{
			type:Array,
			default:()=>[]
		}
	},
	setup(){
		return{}
	}
}
</script>

<style lang="scss">
.list-scroll {
	white-space: nowrap;
	height: 362rpx;
	.list-scroll-view {
		width: 310rpx;
		overflow: hidden;
		display: inline-block;
		padding: 0 10rpx;
		margin-right: 20rpx;
		border-radius: 20rpx;
		box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
		background-color: #fff;
	}
}

</style>
