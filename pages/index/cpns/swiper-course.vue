<template>
	<view>
		<!-- 带头部的插槽组件 -->
		<list-box :title="title" :word="word" :all="all">
			<swiper class="list-scroll" next-margin="20rpx" :style="{'height': `${200*row}rpx`}">
				<swiper-item class="list-scroll-view" v-for="(col,index) in column" :key="col">
					<course-item :isColumn="isColumn" v-for="item in courseData.slice(index*row,(index+1)*row)" :item="item" :key="item.id"></course-item>
				</swiper-item>
			</swiper>
		</list-box>
	</view>
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
		column:{
			type:Number,
			default:2 
		},
		row:{
			type:Number,
			default:4
		},
		isColumn:{
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
	// 不换行，一行显示
	white-space: nowrap;
	.list-scroll-view {
		display: inline-block;
		width: 310rpx;
		padding: 0 10rpx;
		margin-right: 20rpx;
		border-radius: 20rpx;
		box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
		background-color: #fff;
	}
}

</style>
