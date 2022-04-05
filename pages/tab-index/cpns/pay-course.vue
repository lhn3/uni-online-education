<template>
	<!-- 带头部的插槽组件 -->
	<!-- 触底加载更多 -->
	<list-box :title="title" :word="word" :all="all" @clickAll="clickAll">
		<view class="list-view" v-for="item in courseData" :key="item.id">
			<course-item :item="item"></course-item>
		</view>
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
		},
		params:{
			type:Object,
			default:()=>({})
		}
	},
	setup(props){
		let {proxy}=getCurrentInstance()
		let clickAll=()=>{
			let params = JSON.stringify(props.params)
			proxy.navTo('/pages/search/search?data='+params)
		}
		return{
			clickAll
		}
	}
}
</script>

<style lang="scss">
.list-view {
	width: 100%;
	padding: 0 10rpx;
	margin-right: 20rpx;
	border-radius: 20rpx;
	box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
	background-color: #fff;
}
</style>
