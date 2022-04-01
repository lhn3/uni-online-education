<template>
	<!-- 带头部的插槽组件 -->
	<list-box :title="title" :word="word" :all="all">
		<swiper class="list-swiper" next-margin="20rpx" :style="{'height': `${200*row}rpx`}">
			<swiper-item class="list-swiper-view" v-for="(col,index) in column" :key="col">
				<course-item v-for="item in courseData.slice(index*row,(index+1)*row)" :item="item" :key="item.id"></course-item>
			</swiper-item>
		</swiper>
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
		column:{
			type:Number,
			default:2 
		},
		row:{
			type:Number,
			default:4
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
</style>
